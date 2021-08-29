import React from 'react'
import PropTypes from 'prop-types'

const Logo = ({ className }) => (
  <span className={`logo-text ${className}`}>alter<span class="logo-text-HEN">HEN</span></span>
)

Logo.propTypes = {
  Logo: PropTypes.node,
  className: PropTypes.string,
}

export default Logo