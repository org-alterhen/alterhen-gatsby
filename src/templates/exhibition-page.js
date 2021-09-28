import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'

import Exhibition from '../components/Exhibition'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
// import SocialLinks from '../components/SocialLinks'
import { TezosToolkit } from "@taquito/taquito";

import ConnectButton from '../components/ConnectWallet'
import DisconnectButton from "../components/DisconnectWallet";

import { objktInfo } from '../utils/hicDex';

// BeaconConnection = {
//   NONE = "",
//   LISTENING = "Listening to P2P channel",
//   CONNECTED = "Channel connected",
//   PERMISSION_REQUEST_SENT = "Permission request sent, waiting for response",
//   PERMISSION_REQUEST_SUCCESS = "Wallet is connected"
// }

const transformImg = (img) => {
  return img // no optimization for now, just return the img

  // gifs aren't being saved to CMS with file extension so below check doesn't work
  // if (img.includes('.gif')) return img
  // return (
  //   img.substr(0,58) + '-/preview/1920x1080' + img.substr(57,999)
  // )
}

export const ExhibitionPageTemplate = ({
  title,
  artist,
  description,
  objkts,
  longbio
}) => {
  
  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://api.tez.ie/rpc/mainnet")
  );
  const [contract, setContract] = useState(undefined);
  const [publicToken, setPublicToken] = useState("");
  const [wallet, setWallet] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [beaconConnection, setBeaconConnection] = useState(false);

  // v2 swap contract
  const contractAddress = "KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn";

  objkts.forEach(objkt => {
    if (!objkt.hicdex) {
      objktInfo(objkt.objkt).then(objktInfo => {
        objkt.hicdex = objktInfo
      })
    }
  });

  return (
    <div className="content">

      <section className="exhibition-page">
        <h1 className="has-text-centered">{title}</h1>
        { objkts && objkts.map((objkt, index) => (
          <div className="exhibition-page-objkt" key={index}>
            <div className="exhibition-page-objkt-left">
              <button className="exhibition-page-button" onClick={() => {
                document.getElementsByTagName('html')[0].style.overflow = "hidden"; 
                document.body.classList.add("exhibition")
              }}>
              { objkt.image ? (
                <PreviewCompatibleImage
                  imageInfo={{
                    image: transformImg(objkt.image),
                    alt: `${objkt.title} by ${artist}`,
                  }}
                  className=""
                />
              ) : (
                objkt.video && (
                  <video className="exhibition-page-video" src={objkt.video} autoPlay loop muted playsInline />
                ) 
              )}
              </button>
            </div>
            <div className="exhibition-page-objkt-right">
              <h2>{objkt.title}</h2>
              <p style={{whiteSpace: 'pre-wrap'}}>{objkt.desc}</p>
              
              { objkt.hicdex && (                
                <p className="availability">{objkt.hicdex.swaps_aggregate.aggregate.sum.amount_left}&thinsp;/&thinsp;{objkt.hicdex.supply} editions available</p>,
                objkt.hicdex.swaps && objkt.hicdex.swaps.length > 0 ? (
                    <button className="block-btn collect" onClick={async () => {
                      // setLoadingIncrement(true);
                      try {
                        const op = await contract.methods.collect(objkt.hicdex.swaps[0].id).send({
                          amount: objkt.hicdex.swaps[0].price, // parseFloat(objkt.price)
                          mutez: true,
                          storageLimit: 310
                        });
                        await op.confirmation();
                      } catch (error) {
                        console.log(error);
                      } finally {
                        // setLoadingIncrement(false);
                      }
                    }}>COLLECT ({objkt.hicdex.swaps[0].price / 1000000}ꜩ)</button>
                ) : (
                  <a href={`https://hicetnunc.xyz/objkt/${objkt.objkt}`} disabled className="block-btn collect inactive">NOT AVAILABLE</a>
                )
              )}
              {/* <a target="_blank" rel="noreferrer" href={"https://hicetnunc.xyz/objkt/" + objkt.objkt} className="block-btn">VIEW</a> */}
              {!userAddress ? (
                <ConnectButton
                  Tezos={Tezos}
                  setContract={setContract}
                  setPublicToken={setPublicToken}
                  setWallet={setWallet}
                  setUserAddress={setUserAddress}
                  setUserBalance={setUserBalance}
                  contractAddress={contractAddress}
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
        { objkts && <Exhibition
          objkts={objkts}
        /> }
        <div className="exhibition-page-bio">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <h2>{artist}</h2>
                <Link to={`/artist/${artist.toLowerCase().replace(/[ ]/g,'-').replace(/["|'|,|_]/g,'')}`}>← Back to Profile</Link>
                {/* <h4>{country}</h4>
                <SocialLinks links={{
                  website: website,
                  instagram: instagram,
                  twitter: twitter,
                  facebook: facebook,
                  linktree: linktree,
                  henlink: henlink,
                  tumblr: tumblr                  
                }} /> */}
              </div>
              <div className="column is-two-thirds">
                <p style={{whiteSpace: 'pre-wrap'}}>{description}</p>
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
  longbio: PropTypes.node
}

const ExhibitionPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout>
      <BasicHeader/>
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
      html: PropTypes.node      
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
