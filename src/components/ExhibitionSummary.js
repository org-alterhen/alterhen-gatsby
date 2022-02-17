import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const ExhibitionSummary = ({ exhibition }) => {
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
    </div>
  )
}

ExhibitionSummary.propTypes = {
  exhibition: PropTypes.shape({}),
}

export default ExhibitionSummary
