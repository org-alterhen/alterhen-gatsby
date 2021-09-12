import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'

import Exhibition from '../components/Exhibition'

const test_objkts = [{
  title: 'Demo 1',
  description: 'Filler Image\n\nDemo 1 is a demo artwork to test the exhibitions\n\nIt will be replaced with the artists works',
  url: 'https://hicetnunc.xyz/objkt/12345',
  image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
},{
  title: 'Demo 2',
  description: 'Filler Image\n\nDemo 2 is another demo artwork to test the exhibitions\n\nIt will be replaced with the artists works',
  url: 'https://hicetnunc.xyz/objkt/23456',
  image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60'
},{
  title: 'Demo 3',
  description: 'Filler Image\n\nDemo 3 is yet another demo artwork to test the exhibitions\n\nIt will also be replaced with the artists works',
  url: 'https://hicetnunc.xyz/objkt/34568',
  image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
}]

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
      { test_objkts.map((objkt, index) => (
        <div className="exhibition-page-objkt" key={index}>
          <div className="exhibition-page-objkt-left">
            <button className="exhibition-page-button" onClick={() => {
              document.getElementsByTagName('html')[0].style.overflow = "hidden"; 
              document.body.classList.add("exhibition")
            }}><img src={objkt.image} alt={objkt.title} /></button>
          </div>
          <div className="exhibition-page-objkt-right">
            <h2>{objkt.title}</h2>
            <p>{objkt.description}</p>
            <a target="_blank" rel="noreferrer" href={objkt.url} className="button is-primary">VIEW / COLLECT</a>
          </div>
        </div>
      ))}
      <Exhibition
        objkts={test_objkts}
      />
      {/* <Exhibition
        objkts={objkts}
      /> */}
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
        objkts
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
