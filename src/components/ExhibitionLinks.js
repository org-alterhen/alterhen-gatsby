import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const ExhibitionLinks = ({ posts }) => (
  <>
    {JSON.stringify(posts)}
    {posts &&
      posts.map(
        ({ node: post }) =>
          post.fields && (
            <Link to={post.fields.slug} key={post.id}>
              <article className={`exhibition-list-item tile is-child`}>
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    {post.frontmatter.featuredimage.childImageSharp ? (
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
                    )}
                  </div>
                ) : null}
                <header>
                  <p className="post-meta">
                    <span className="is-block has-text-weight-bold exhibition-link-title">
                      {post.frontmatter.title}
                    </span>
                    <span className="has-text-weight-semibold exhibition-link-name">
                      {post.frontmatter.name}
                    </span>
                  </p>
                </header>
              </article>
            </Link>
          )
      )}
  </>
)

ExhibitionLinks.propTypes = {
  data: PropTypes.array,
}

export default ExhibitionLinks
