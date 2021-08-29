import React from 'react'
import PropTypes from 'prop-types'
import { ArtistPostTemplate } from '../../templates/artist-post'

const ArtistPostPreview = ({ entry, widgetFor }) => {
  return (
    <ArtistPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

ArtistPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ArtistPostPreview
