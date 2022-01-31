import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const ExhibitionSummary = ({ exhibition }) => {
  return (
    <>
      <div className="exhibition__title">
        <h1>{exhibition.frontmatter.title}</h1>
      </div>
      <p className="exhibition__description">
        {exhibition.frontmatter.statement}
      </p>
      <br />
      <br />
      <div>
        <Link to={exhibition.fields.slug} className="block-btn">
          Enter Exhibition
        </Link>
        {/* <ExhibitionLinks posts={[title]}></ExhibitionLinks> */}
      </div>
      <br />
      <br />
      <br />
    </>
  )
}

ExhibitionSummary.propTypes = {
  exhibition: PropTypes.shape({}),
}

export default ExhibitionSummary
