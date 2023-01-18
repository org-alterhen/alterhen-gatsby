import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo, className }) => {
  const imageStyle = {}
  const { alt = '', childImageSharp, image } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
      <Img
        style={imageStyle}
        fluid={image.childImageSharp.fluid}
        alt={alt}
        className={className}
      />
    )
  }

  if (!!childImageSharp) {
    return (
      <Img
        style={imageStyle}
        fluid={childImageSharp.fluid}
        alt={alt}
        className={className}
      />
    )
  }

  if (!!image && typeof image === 'string') {
    if (image.includes('ucarecdn')) {
      return (
        <img
          style={imageStyle}
          data-blink-src={image}
          alt={alt}
          className={className}
        />
      )
    } else {
      return (
        <img style={imageStyle} src={image} alt={alt} className={className} />
      )
    }
  }

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
  className: PropTypes.string,
}

export default PreviewCompatibleImage
