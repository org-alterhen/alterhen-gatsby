import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'

import ExhibitionDetail from '../components/ExhibitionDetail'
import ExhibitionGroupLink from '../components/ExhibitionGroupLink'
import FeaturedCards from '../components/FeaturedCards'

const ExhibitionPage = ({ data }) => {
  const { frontmatter } = data.page
  let exhibitionGroup = data.exhibitiongroup.edges[0]
  exhibitionGroup = exhibitionGroup ? exhibitionGroup.node : false

  const pastexhibitions = data.pastexhibitions.edges.map((e) => e.node)

  return (
    <Layout>
      <BasicHeader />
      <ExhibitionDetail
        title={frontmatter.title}
        description={frontmatter.description}
        artistName={frontmatter.artist}
        artistSlug={data.artist ? data.artist.fields.slug : false}
        objkts={frontmatter.objkts}
      />
      {exhibitionGroup && (
        <ExhibitionGroupLink
          exhibitionTitle={frontmatter.title}
          exhibitionGroup={exhibitionGroup}
        />
      )}
      {pastexhibitions.length > 1 && (
        <div className="exhibition-more">
          <div className="container content">
            <FeaturedCards cards={pastexhibitions} title="Past exhibitions" />
          </div>
        </div>
      )}
    </Layout>
  )
}

ExhibitionPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      frontmatter: PropTypes.object,
      html: PropTypes.node,
    }),
  }),
}

export default ExhibitionPage

export const exhibitionPageQuery = graphql`
  query ExhibitionPage($id: String!, $title: String!, $artist: String!) {
    page: markdownRemark(id: { eq: $id }) {
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
    artist: markdownRemark(
      frontmatter: { templateKey: { eq: "artist-post" }, name: { eq: $artist } }
    ) {
      fields {
        slug
      }
    }
    pastexhibitions: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "exhibition-page" }
          artist: { eq: $artist }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            artist
            featuredimage
          }
          fields {
            slug
          }
        }
      }
    }
    exhibitiongroup: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "exhibition-group-page" }
          exhibitions: { elemMatch: { exhibition: { eq: $title } } }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            summary
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
