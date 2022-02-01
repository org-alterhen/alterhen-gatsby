import React from 'react'
import PropTypes from 'prop-types'

import { LogoIcon, LogoText } from './Logo'
import { Link } from 'gatsby'

const BasicHeader = ({ className, onTop = false, themeLight = false }) => (
  <div className={`basic-header ${onTop ? 'basic-header--on-top' : ''}`}>
    <Link to="/">
      <LogoText className={themeLight ? 'logo-black' : ''} />
    </Link>
    <div className="basic-header__icon">
      <Link to="/">
        <LogoIcon className={themeLight ? 'logo-white' : ''} />
      </Link>
    </div>
  </div>
)

BasicHeader.propTypes = {
  className: PropTypes.string,
}

export default BasicHeader
