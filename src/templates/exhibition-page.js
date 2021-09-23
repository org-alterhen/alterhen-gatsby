import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'

import Exhibition from '../components/Exhibition'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
// import SocialLinks from '../components/SocialLinks'


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
  objkts
}) => (
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
            { objkt.image && (
              <PreviewCompatibleImage
                imageInfo={{
                  image: transformImg(objkt.image),
                  alt: `${objkt.title} by ${artist}`,
                }}
                className=""
              />
            ) }
            </button>
          </div>
          <div className="exhibition-page-objkt-right">
            <h2>{objkt.title}</h2>
            <p style={{whiteSpace: 'pre-wrap'}}>{objkt.desc}</p>
            <a target="_blank" rel="noreferrer" href={"https://hicetnunc.xyz/objkt/" + objkt.objkt} className="button">VIEW / COLLECT</a>
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

ExhibitionPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  artist: PropTypes.string,
  objkts: PropTypes.array,
}

const ExhibitionPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <BasicHeader/>
      <ExhibitionPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        artist={frontmatter.artist}
        objkts={frontmatter.objkts}
      />
    </Layout>
  )
}
ExhibitionPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
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
          objkt
        }
        artist
      }
    }
  }
`
