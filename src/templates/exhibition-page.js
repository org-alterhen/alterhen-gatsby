import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'

import Exhibition from '../components/Exhibition'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { TezosToolkit } from '@taquito/taquito'

import ConnectButton from '../components/ConnectWallet'
import DisconnectButton from '../components/DisconnectWallet'
import CollectButton from '../components/CollectButton'

import { HEN_V2_SWAP_CONTRACT } from '../constants'
import { objktInfo } from '../utils/hicDex'

import { useScrollPosition } from '../utils/useScrollPosition'
import { checkVisible, slugify } from '../utils/misc'

import Zoomer from '../components/Zoomer'

const transformImg = (img) => {
  return img // no optimization for now, just return the img
}

export const ExhibitionPageTemplate = ({
  title,
  artist,
  description,
  objkts,
  longbio,
}) => {
  const [Tezos, setTezos] = useState(
    new TezosToolkit('https://api.tez.ie/rpc/mainnet')
  )
  const [contract, setContract] = useState(undefined)
  const [publicToken, setPublicToken] = useState('')
  const [wallet, setWallet] = useState(null)
  const [userAddress, setUserAddress] = useState('')
  const [userBalance, setUserBalance] = useState(0)
  const [beaconConnection, setBeaconConnection] = useState(false)

  objkts.forEach((objkt) => {
    if (!objkt.hicdex) {
      objktInfo(objkt.objkt).then((objktInfo) => {
        objkt.hicdex = objktInfo
      })
    }
  })

  const [scroll, setScroll] = useState(0)

  useScrollPosition(function setScrollPosition({ currentPosition }) {
    setScroll(currentPosition.y)
    let videos = document.getElementsByTagName('video')
    for (let i = 0; i < videos.length; i++) {
      if (checkVisible(videos[i])) {
        videos[i].play()
      } else {
        videos[i].pause()
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
                <Zoomer>
                  {objkt.image ? (
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: transformImg(objkt.image),
                        alt: `${objkt.title} by ${artist}`,
                      }}
                      className=""
                    />
                  ) : (
                    objkt.video && (
                      <video
                        className="exhibition-page-video"
                        src={objkt.video}
                        autoPlay
                        loop
                        playsInline
                      />
                    )
                  )}
                </Zoomer>
              </div>
              <div className="exhibition-page-objkt-right">
                <h2>{objkt.title}</h2>
                <p style={{ whiteSpace: 'pre-wrap' }}>{objkt.desc}</p>

                {objkt.hicdex && (
                  <CollectButton
                    objkt={objkt}
                    contract={contract}
                    userAddress={userAddress}
                  />
                )}

                {!userAddress ? (
                  <ConnectButton
                    Tezos={Tezos}
                    setContract={setContract}
                    setPublicToken={setPublicToken}
                    setWallet={setWallet}
                    setUserAddress={setUserAddress}
                    setUserBalance={setUserBalance}
                    contractAddress={HEN_V2_SWAP_CONTRACT}
                    setBeaconConnection={setBeaconConnection}
                    wallet={wallet}
                  />
                ) : (
                  <DisconnectButton
                    wallet={wallet}
                    setPublicToken={setPublicToken}
                    setUserAddress={setUserAddress}
                    setUserBalance={setUserBalance}
                    setWallet={setWallet}
                    setTezos={setTezos}
                    setBeaconConnection={setBeaconConnection}
                  />
                )}
              </div>
            </div>
          ))}
        {objkts && <Exhibition objkts={objkts} />}
        <div className="exhibition-page-bio">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <h2>{artist}</h2>
                <Link to={`/artist/${slugify(artist)}`}>← Back to Profile</Link>
              </div>
              <div className="column is-two-thirds">
                <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

ExhibitionPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  artist: PropTypes.string,
  objkts: PropTypes.array,
  longbio: PropTypes.node,
}

const ExhibitionPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout>
      <BasicHeader />
      <ExhibitionPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        artist={frontmatter.artist}
        objkts={frontmatter.objkts}
        longbio={html}
      />
    </Layout>
  )
}
ExhibitionPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
      html: PropTypes.node,
    }),
  }),
}

export default ExhibitionPage

export const exhibitionPageQuery = graphql`
  query ExhibitionPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        objkts {
          title
          desc
          image
          video
          objkt
        }
        artist
      }
    }
  }
`
