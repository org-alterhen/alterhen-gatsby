import React from 'react'
import PropTypes from 'prop-types'
import { ArtistPostTemplate } from '../../templates/artist-post'

const ArtistPostPreview = ({ entry, widgetFor }) => {
  return (
    <ArtistPostTemplate
      bio={entry.getIn(['data', 'bio'])}
      statement={entry.getIn(['data', 'statement'])}
      country={entry.getIn(['data', 'country'])}
      website={entry.getIn(['data', 'website'])}
      name={entry.getIn(['data', 'name'])}
      instagram={entry.getIn(['data', 'instagram'])}
      twitter={entry.getIn(['data', 'twitter'])}
      facebook={entry.getIn(['data', 'facebook'])}
      linktree={entry.getIn(['data', 'linktree'])}
      henlink={entry.getIn(['data', 'henlink'])}
      tumblr={entry.getIn(['data', 'tumblr'])}
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
