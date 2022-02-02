import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const ExhibitionGroupLink = ({ exhibitionTitle, exhibitionGroup }) => {
  return (
    <div className="exhibition-group-link content">
      <div className="container">
        <div className="columns">
          <div className="column is-one-third ">
            <h2>{exhibitionGroup.frontmatter.title}</h2>
          </div>
          <div className="column is-two-thirds">
            <p>
              <i>{exhibitionTitle}</i> is part of the{' '}
              <i>{exhibitionGroup.frontmatter.title}</i> exhibition.
            </p>
            <p>{exhibitionGroup.frontmatter.summary}</p>
            <Link to={exhibitionGroup.fields.slug} className="block-btn">
              View {exhibitionGroup.frontmatter.title} Exhibition
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

ExhibitionGroupLink.propTypes = {
  exhibition: PropTypes.shape({}),
}

export default ExhibitionGroupLink
