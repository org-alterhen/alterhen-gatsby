import { graphql } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'
import { ExhibitionGroupPageTemplate } from './ExhibitionGroupPageTemplate'

const ExhibitionGroupPage = ({ data }) => {
  const exhibitions = data.page.frontmatter.exhibitions.map((exhibition) => {
    const fullExhib = data.exhibitions.edges.find(
      (e) => e.node.frontmatter.title === exhibition.exhibition
    ).node

    const artist = data.artists.edges.find(
      (a) => a.node.frontmatter.name === fullExhib.frontmatter.artist
    )

    // We want the user to pass via the Artists page to see the exhibition.
    // So replace the slug here to achieve that, whilst keeping <ExhibitionsList> reusable. -JS
    fullExhib.fields.slug = artist.node.fields.slug

    return fullExhib
  })

  return (
    <Layout>
      <BasicHeader />
      <ExhibitionGroupPageTemplate
        exhibitions={exhibitions}
        title={data.page.frontmatter.title}
      />
    </Layout>
  )
}

ExhibitionGroupPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ExhibitionGroupPage

export const exhibitionGroupPageQuery = graphql`
  query ExhibitionGroupPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        exhibitions {
          exhibition
        }
      }
    }
    artists: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "artist-post" }
          published: { ne: false }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            name
          }
        }
      }
    }
    exhibitions: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "exhibition-page" }
          published: { ne: false }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            featuredimage
            date
            artist
            title
          }
        }
      }
    }
  }
`
