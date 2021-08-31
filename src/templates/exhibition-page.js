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
    <section className="section section--gradient">
      <Exhibition
        objkts={objkts}
      />
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
