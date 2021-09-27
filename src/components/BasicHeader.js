import React from 'react'
import PropTypes from 'prop-types'

import { LogoIcon, LogoText } from './Logo'
import { Link } from 'gatsby'

const BasicHeader = ({ className }) => (
  <div className="basic-header">
    <Link to="/"><LogoText/></Link>
    <div className="basic-header__icon"><Link to="/"><LogoIcon/></Link></div>
  </div>
)

BasicHeader.propTypes = {
  className: PropTypes.string,
}

export default BasicHeader