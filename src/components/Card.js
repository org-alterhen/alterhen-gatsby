import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import PreviewCompatibleImage from './PreviewCompatibleImage'

export const Card = ({
  title,
  artist,
  publishedDate,
  url,
  imageUrl,
  imageAlt,
  className,
  style,
}) => (
  <Link to={url} className={className} style={style}>
    <article className={`artist-list-item tile is-child`}>
      {imageUrl ? (
        <div className="featured-thumbnail">
          {
            <PreviewCompatibleImage
              imageInfo={{
                image: imageUrl,
                alt: imageAlt,
              }}
            />
          }
        </div>
      ) : null}
      <header>
        <p className="post-meta">
          <span className="is-block has-text-weight-bold artist-roll-title">
            {title}
          </span>
        </p>
        <div className="description-lines">
          <p className="post-meta">
            <span className="artist-roll-name">{artist}</span>
          </p>
          <p className="post-meta">
            <span className="artist-roll-name">from {publishedDate}</span>
          </p>
        </div>
      </header>
    </article>
  </Link>
)

Card.propTypes = {
  LogoText: PropTypes.node,
  className: PropTypes.string,
}
