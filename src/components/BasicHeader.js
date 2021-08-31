import React from 'react'
import PropTypes from 'prop-types'

import { LogoText } from './Logo'
import { Link } from 'gatsby'

const BasicHeader = ({ className }) => (
  <div className={`basic-header ${className}`}>
    <Link to="/"><LogoText/></Link>
  </div>
)

BasicHeader.propTypes = {
  className: PropTypes.string,
}

export default BasicHeader