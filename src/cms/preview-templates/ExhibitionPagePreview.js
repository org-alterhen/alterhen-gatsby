import React from 'react'
import PropTypes from 'prop-types'
import ExhibitionDetail from '../../components/ExhibitionDetail'

const ExhibitionPagePreview = ({ entry, getAsset }) => {
  const entryObjkts = entry.getIn(['data', 'objkts'])
  const objkts = entryObjkts ? entryObjkts.toJS() : []

  return (
    <ExhibitionDetail
      artist={entry.getIn(['data', 'artist'])}
      title={entry.getIn(['data', 'title'])}
      description={entry.getIn(['data', 'description'])}
      objkts={{ objkts }}
      longbio={entry.getIn(['data', 'body'])}
    />
  )
}

ExhibitionPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ExhibitionPagePreview
