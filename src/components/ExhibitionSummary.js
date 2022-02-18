import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const ExhibitionSummary = ({ exhibition }) => {
  const exhibitionGroup = exhibition.exhibitiongroup?.node
  return (
    <div className="exhibition-summary">
      <h3 className="exhibition-summary__title">
        {exhibition.frontmatter.title}
      </h3>
      <p className="exhibition-summary__statement">
        {exhibition.frontmatter.statement}
      </p>
      <Link to={exhibition.fields.slug} className="block-btn">
        Enter Exhibit
      </Link>
      {exhibitionGroup && (
        <div className="exhibition-summary__footer">
          <div className="exhibition-summary__footer__description">
            <p>
              <i>{exhibition.frontmatter.title}</i> is part of the{' '}
              <i>{exhibitionGroup.frontmatter.title}</i> exhibition.
            </p>
            <p>{exhibitionGroup.frontmatter.summary}</p>
            <Link
              className="exhibition-summary__footer__description__link"
              to={exhibitionGroup.fields.slug}
            >
              View full exhibition
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

ExhibitionSummary.propTypes = {
  exhibition: PropTypes.shape({}),
}

export default ExhibitionSummary
