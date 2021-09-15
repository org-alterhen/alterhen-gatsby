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
            <Link to={post.fields.slug} className="is-parent column is-6" key={post.id}>
              <article className={`artist-list-item tile is-child`}>
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    {
                      post.frontmatter.featuredimage.childImageSharp ? (
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.featuredimage,
                            alt: `featured artwork for ${post.frontmatter.name} - ${post.frontmatter.title}`,
                          }}
                        />
                      ) : (
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.featuredimage.publicURL,
                            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                          }}
                        />
                      )
                    }
                  </div>
                ) : null}
                <header>
                  <p className="post-meta">
                    <span className="is-block has-text-weight-bold artist-roll-title">
                      {post.frontmatter.title}
                    </span>
                    <span className="has-text-weight-semibold artist-roll-name">{post.frontmatter.name}</span>
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
          sort: { order: ASC, fields: [frontmatter___name] }
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
                name
                title
                templateKey
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 599, maxHeight: 475, quality: 95) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                  publicURL
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
