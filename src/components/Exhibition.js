import React from 'react'
import PropTypes from 'prop-types'

const Exhibition = ({ className, title, description }) => (
  <div className={className}>
    <div className="exhibition__container">
      <div className="exhibition__title">
        <h1>{title}</h1>
      </div>
      <div className="exhibition__description">
        <p>{description}</p>
      </div>
      <div className="exhibition__content">
      </div>
    </div>
  </div>
)

Exhibition.propTypes = {
  Exhibition: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
}

export default Exhibition