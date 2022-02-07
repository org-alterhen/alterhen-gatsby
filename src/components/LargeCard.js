import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import PreviewCompatibleImage from './PreviewCompatibleImage'

export const LargeCard = ({
  title,
  summary,
  url,
  image,
  imageAlt,
  logoUrl = false,
  credit = false,
}) => {
  const transformImg = (img) => {
    if (img.includes('.gif')) return img
    if (!img.includes('ucarecdn')) return img
    return img.substr(0, 58) + '-/scale_crop/728x750' + img.substr(57, 999)
  }

  return (
    <Link to={url} className="large-card">
      <div className="large-card__cover">
        {image ? (
          <>
            {
              <PreviewCompatibleImage
                imageInfo={{
                  image: transformImg(image),
                  alt: imageAlt,
                }}
              />
            }
          </>
        ) : null}
        {credit && <div className="large-card__cover__credit">{credit}</div>}
      </div>
      <div className="large-card__meta">
        {logoUrl && (
          <img
            className="large-card__meta__logo"
            src={logoUrl}
            alt={`${title} logo`}
          />
        )}
        <h3 className="large-card__meta__title">{title}</h3>
        <p className="large-card__meta__summary">{summary}</p>
        <span className="large-card__meta__cta block-btn">View exhibition</span>
      </div>
    </Link>
  )
}

LargeCard.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  url: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
}
