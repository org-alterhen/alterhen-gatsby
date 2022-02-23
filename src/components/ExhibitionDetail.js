import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import ExhibitionSlider from '../components/ExhibitionSlider'
import { TezosToolkit } from '@taquito/taquito'

import fullscreen from '../img/fullscreen-icon.svg'

import ObjktEmbed from '../components/ObjktEmbed'
import ConnectButton from '../components/ConnectWallet'
import DisconnectButton from '../components/DisconnectWallet'
import CollectButton from '../components/CollectButton'

import { HEN_V2_SWAP_CONTRACT } from '../constants'
import { objktInfo } from '../utils/hicDex'

import { useScrollPosition } from '../utils/useScrollPosition'
import { checkVisible, isDesktop, isBrowser } from '../utils/misc'

const TezosInstance = new TezosToolkit('https://api.tez.ie/rpc/mainnet')

const ExhibitionDetail = ({
  title,
  description,
  objkts,
  artistName = false,
  artistSlug = false,
}) => {
  const [Tezos, setTezos] = useState(TezosInstance)
  const [contract, setContract] = useState(undefined)
  const [wallet, setWallet] = useState(null)
  const [userAddress, setUserAddress] = useState('')
  const [sliderVisible, setSliderVisible] = useState(false)
  const [sliderSlide, setSliderSlide] = useState(0)

  // Running objktInfo() on build for all pages leads to errors. Looks like they start failing
  // after ~30 requests in quick succession. For now, only fetch this data on the client.
  if (isBrowser) {
    objkts.forEach((objkt) => {
      if (!objkt.hicdex) {
        objktInfo(objkt.objkt).then((objktInfo) => {
          objkt.hicdex = objktInfo
        })
      }
    })
  }

  const [_, setScroll] = useState(0)

  useScrollPosition(function setScrollPosition({ currentPosition }) {
    setScroll(currentPosition.y)
    let videos = document.getElementsByTagName('video')
    if (!sliderVisible) {
      for (let i = 0; i < videos.length; i++) {
        if (checkVisible(videos[i])) {
          const res = videos[i].play()
          if (res !== undefined) {
            res.then().catch((error) => {
              console.log(error)
            })
          }
        } else {
          videos[i].pause()
        }
      }
    }
  })

  return (
    <div className="content">
      <section className="exhibition-page">
        <h1 className="has-text-centered">{title}</h1>
        {objkts &&
          objkts.map((objkt, index) => (
            <div className="exhibition-page-objkt" key={index}>
              <div className="exhibition-page-objkt-left">
                <ObjktEmbed
                  objkt={objkt}
                  userAddress={userAddress}
                  artistName={artistName}
                >
                  <button
                    className="icon-btn"
                    onClick={() => {
                      setSliderVisible(!sliderVisible)
                      setSliderSlide(index)
                    }}
                  >
                    <img src={fullscreen} alt="View fullscreen" />
                  </button>
                </ObjktEmbed>
              </div>
              <div className="exhibition-page-objkt-right">
                <h2>{objkt.title}</h2>
                <p style={{ whiteSpace: 'pre-wrap' }}>{objkt.desc}</p>
                {objkt.hicdex ? (
                  <CollectButton
                    objkt={objkt}
                    contract={contract}
                    userAddress={userAddress}
                  />
                ) : (
                  <span>Loading OBJKT data...</span>
                )}
                <div className="buttons wallet-buttons">
                  {!userAddress ? (
                    <ConnectButton
                      Tezos={Tezos}
                      setContract={setContract}
                      setWallet={setWallet}
                      setUserAddress={setUserAddress}
                      contractAddress={HEN_V2_SWAP_CONTRACT}
                      wallet={wallet}
                    />
                  ) : (
                    <DisconnectButton
                      wallet={wallet}
                      setUserAddress={setUserAddress}
                      setWallet={setWallet}
                      setTezos={setTezos}
                    />
                  )}
                  {objkt.objkt && (
                    <a
                      className="small-link"
                      href={`https://teia.art/objkt/${objkt.objkt}`}
                    >
                      View on Teia
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        {objkts && sliderVisible && (
          <ExhibitionSlider
            objkts={objkts}
            sliderSlide={sliderSlide}
            setSliderVisible={setSliderVisible}
            userAddress={userAddress}
            artistName={artistName}
            extraClasses={sliderVisible ? '' : 'is-hidden'}
          />
        )}
        {artistName && artistSlug && (
          <div className="exhibition-page-bio">
            <div className="container">
              <div className="columns">
                <div className="column is-one-third">
                  <h2>{artistName}</h2>
                  <Link to={artistSlug}>← Back to Profile</Link>
                </div>
                <div className="column is-two-thirds">
                  <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

ExhibitionDetail.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  artistSlug: PropTypes.string,
  artistName: PropTypes.string,
  objkts: PropTypes.array,
}

export default ExhibitionDetail
