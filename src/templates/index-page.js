import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'
import { IndexPageTemplate } from './IndexPageTemplate'

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.page
  const exhibitionGroups = data.exhibitiongroups.edges.map((eg) => eg.node)
  return (
    <Layout>
      <BasicHeader themeLight={true} onTop={true} />
      <IndexPageTemplate
        title={frontmatter.title}
        exhibitionGroups={exhibitionGroups}
        content={html}
        shopContent={data.shop.edges[0].node}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
      html: PropTypes.node,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    page: markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
      }
    }
    exhibitiongroups: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "exhibition-group-page" }
          published: { ne: false }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            featuredimage
            summary
            logo
          }
        }
      }
    }
    shop: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "shop-page" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            objkts {
              image
              title
            }
          }
        }
      }
    }
  }
`
