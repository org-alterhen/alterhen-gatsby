import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class ArtistRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <Link to={post.fields.slug} className="is-parent column is-3" key={post.id}>
              <article className={`artist-list-item tile is-child`}>
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured artwork for ${post.frontmatter.artist} - ${post.frontmatter.title}`,
                      }}
                    />
                  </div>
                ) : null}
                <header>
                  <p className="post-meta">
                    <span className="has-text-weight-bold artist-roll-name">{post.frontmatter.artist}</span>
                    <span className="subtitle is-block has-text-weight-semibold artist-roll-title">
                      {post.frontmatter.title}
                    </span>
                  </p>
                </header>
              </article>
            </Link>
          ))}
      </div>
    )
  }
}

ArtistRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ArtistRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___artist] }
          filter: { frontmatter: { templateKey: { eq: "artist-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                artist
                title
                templateKey
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 300, maxHeight: 400, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ArtistRoll data={data} count={count} />}
  />
)
