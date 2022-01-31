import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'

import ExhibitionDetail from '../components/ExhibitionDetail'

const ShopPage = ({ data }) => {
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
ShopPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
      html: PropTypes.node,
    }),
  }),
}

export default ShopPage

export const ShopPageQuery = graphql`
  query ShopPage($id: String!) {
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
