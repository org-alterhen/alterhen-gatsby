import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import PreviewCompatibleImage from './PreviewCompatibleImage'

export const Card = ({
  title,
  artist,
  publishedDate,
  url,
  image,
  imageAlt,
  className,
  style,
}) => {
  const transformImg = (img) => {
    if (img.includes('.gif')) return img
    if (!img.includes('ucarecdn')) return img
    return img.substr(0, 58) + '-/scale_crop/599x475' + img.substr(57, 999)
  }

  return (
    <Link
      to={url}
      className={`card ${className ? className : ''}`}
      style={style}
    >
      <article className={`artist-list-item tile is-child`}>
        {image ? (
          <div className="featured-thumbnail">
            {
              <PreviewCompatibleImage
                imageInfo={{
                  image: transformImg(image),
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
            {publishedDate && (
              <p className="post-meta">
                <span className="artist-roll-name">{publishedDate}</span>
              </p>
            )}
          </div>
        </header>
      </article>
    </Link>
  )
}

Card.propTypes = {
  LogoText: PropTypes.node,
  className: PropTypes.string,
}
