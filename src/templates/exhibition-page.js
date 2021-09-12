import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'

import Exhibition from '../components/Exhibition'

export const ExhibitionPageTemplate = ({
  title,
  image,
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
            }}><img src={objkt.image} alt={objkt.title} /></button>
          </div>
          <div className="exhibition-page-objkt-right">
            <h2>{objkt.title}</h2>
            <p>{objkt.desc}</p>
            <a target="_blank" rel="noreferrer" href={"https://hicetnunc.xyz/objkt/" + objkt.objkt} className="button is-primary">VIEW / COLLECT</a>
          </div>
        </div>
      ))}
      { objkts && <Exhibition
        objkts={objkts}
      /> }
    </section>
  </div>
)

ExhibitionPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  description: PropTypes.string,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  artist: PropTypes.string,
  objkts: PropTypes.object,
}

const ExhibitionPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <BasicHeader/>
      <ExhibitionPageTemplate
        image={frontmatter.image}
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
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
