import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { random } from 'lodash-es'

class ArtistRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    const transformImg = (img) => {
      if (img.includes('.gif')) return img
      if (!img.includes('ucarecdn')) return img
      return (
        img.substr(0,58) + '-/scale_crop/599x475' + img.substr(57,999)
      )
    }



    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <Link to={post.fields.slug} className="is-parent column is-6" style={{order:random(1,999)}} key={post.id}>
              <article className={`artist-list-item tile is-child`}>
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    {
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: transformImg(post.frontmatter.featuredimage),
                          alt: `featured artwork for ${post.frontmatter.name} - ${post.frontmatter.title}`,
                        }}
                      />
                    }
                  </div>
                ) : null}
                <header>
                  <p className="post-meta">
                    <span className="is-block has-text-weight-bold artist-roll-title">
                      {post.frontmatter.title}
                    </span>
                  </p>
                  <div className="description-lines">
                    <p className="post-meta">
                      <span className="artist-roll-name">{post.frontmatter.name}</span>
                    </p>
                    <p className="post-meta">
                      <span className="artist-roll-name">from 30.09.2021</span>
                    </p>
                  </div>
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
          filter: { 
            frontmatter: { 
              templateKey: { eq: "artist-post" },
              published: { ne: false },
              featured: { ne: false }
            } 
          }
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
                featuredimage
                published
                featured
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ArtistRoll data={data} count={count} />}
  />
)
