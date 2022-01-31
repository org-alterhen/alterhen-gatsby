import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'

import ExhibitionDetail from '../components/ExhibitionDetail'

const ExhibitionPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout>
      <BasicHeader />
      <ExhibitionDetail
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
