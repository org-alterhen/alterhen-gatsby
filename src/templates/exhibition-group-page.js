import { graphql } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'
import { ExhibitionGroupPageTemplate } from './ExhibitionGroupPageTemplate'

const ExhibitionGroupPage = ({ data }) => {
  // This isnt ideal, but NetlifyCMS relation widgets can't return the full data of the relation -JS
  const exhibitions = data.page.frontmatter.exhibitions.map((exhibition) => {
    const fullExhib = data.exhibitions.edges.find(
      (e) => e.node.frontmatter.title === exhibition.exhibition
    ).node

    const artist = data.artists.edges.find(
      (a) => a.node.frontmatter.name === fullExhib.frontmatter.artist
    )

    try {
      // We want the user to pass via the Artists page to see the exhibition.
      // So replace the slug here to achieve that, whilst keeping <ExhibitionsList> reusable. -JS
      fullExhib.fields.slug = artist.node.fields.slug
    } catch (e) {
      // Unfortunately we rely on the name on the Artist Page and Exhibtition page matching exactly
      // if there is a content error, the above will fail. We don't want that to break the build so
      // wrap it in a try...catch. We could use a relational field, but it would slow the build times
      // down significantly. TODO: Resolve this with CMS change. -JS
      console.log(e)
      console.log(artist)
      console.log(fullExhib.fields.slug)
    }

    return fullExhib
  })

  return (
    <Layout>
      <BasicHeader themeLight={true} onTop={true} />
      <ExhibitionGroupPageTemplate
        exhibitions={exhibitions}
        title={data.page.frontmatter.title}
        description={data.page.frontmatter.description}
        start_date={data.page.frontmatter.start_date}
        end_date={data.page.frontmatter.end_date}
        credit={data.page.frontmatter.credit}
        summary={data.page.frontmatter.summary}
        logo={data.page.frontmatter.logo}
        featuredimage={data.page.frontmatter.featuredimage}
      />
    </Layout>
  )
}

ExhibitionGroupPage.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  summary: PropTypes.string,
  logo: PropTypes.string,
  featuredimage: PropTypes.string,
}

export default ExhibitionGroupPage

export const exhibitionGroupPageQuery = graphql`
  query ExhibitionGroupPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        featuredimage
        description
        summary
        logo
        start_date
        end_date
        credit
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
