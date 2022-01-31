import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'

import { ArtistPostTemplate } from './ArtistPostTemplate'

const ArtistPost = ({ data }) => {
  const { markdownRemark: post } = data

  const currentExhibition = data.exhibitions.edges.find(
    (e) => e.node.frontmatter.title === post.frontmatter.currentexhibition
  ).node
  const pastExhibitions = data.exhibitions.edges
    .filter(
      (e) => e.node.frontmatter.title !== post.frontmatter.currentexhibition
    )
    .map((e) => e.node)

  return (
    <Layout>
      <BasicHeader />
      <ArtistPostTemplate
        currentExhibition={currentExhibition}
        pastExhibitions={pastExhibitions.length > 0 ? pastExhibitions : false}
        bio={post.frontmatter.bio}
        country={post.frontmatter.country}
        website={post.frontmatter.website}
        links={post.frontmatter.links}
        name={post.frontmatter.name}
        instagram={post.frontmatter.instagram}
        twitter={post.frontmatter.twitter}
        facebook={post.frontmatter.facebook}
        linktree={post.frontmatter.linktree}
        henlink={post.frontmatter.henlink}
        hicetnunc={post.frontmatter.hicetnunc}
        tumblr={post.frontmatter.tumblr}
        midbanner={post.frontmatter.midbanner}
        profpic={post.frontmatter.profpic}
        helmet={
          <Helmet titleTemplate="%s | Artist">
            <title>{post.frontmatter.name}</title>
            <meta name="description" content={post.frontmatter.bio} />

            {/* open graph */}
            <meta property="og:title" content={post.frontmatter.name} />
            <meta name="og:description" content={post.frontmatter.bio} />
            <meta property="og:image" content={post.frontmatter.profpic} />

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            {/* <meta property="twitter:url" content="https://alterhen.art/"/> */}
            <meta property="twitter:title" content={post.frontmatter.name} />
            <meta
              property="twitter:description"
              content={post.frontmatter.bio}
            />
            <meta property="twitter:image" content={post.frontmatter.profpic} />
          </Helmet>
        }
      />
    </Layout>
  )
}

ArtistPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ArtistPost

export const pageQuery = graphql`
  query ArtistPostByID($id: String!, $artist: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        published
        name
        bio
        country
        profpic
        midbanner
        website
        instagram
        twitter
        tumblr
        facebook
        henlink
        hicetnunc
        linktree
        currentexhibition
      }
    }
    exhibitions: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "exhibition-page" }
          artist: { eq: $artist }
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
            title
            statement
          }
        }
      }
    }
  }
`
