import React from 'react'
import PropTypes from 'prop-types'

export const LogoText = ({ className }) => (
  <span className={`logo-text ${className}`}>
    a\ter<span className="logo-text-HEN">HEN</span>
  </span>
)

LogoText.propTypes = {
  LogoText: PropTypes.node,
  className: PropTypes.string,
}

export const LogoIcon = ({ className }) => (
  <span className={`logo-icon ${className}`}>
    <svg
      width="272"
      height="272"
      viewBox="0 0 272 272"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="6.10352e-05" width="46.6667" height="272" fill="currentColor" />
      <rect
        x="29.335"
        y="39.1686"
        width="46.6667"
        height="306.01"
        transform="rotate(-40.5456 29.335 39.1686)"
        fill="currentColor"
      />
      <rect
        x="272"
        width="46.6667"
        height="272"
        transform="rotate(90 272 0)"
        fill="currentColor"
      />
      <rect
        x="272"
        y="106.665"
        width="46.6667"
        height="272"
        transform="rotate(90 272 106.665)"
        fill="currentColor"
      />
      <rect
        x="272"
        y="225.333"
        width="46.6667"
        height="272"
        transform="rotate(90 272 225.333)"
        fill="currentColor"
      />
      <rect x="225.333" width="46.6667" height="272" fill="currentColor" />
    </svg>
  </span>
)

LogoIcon.propTypes = {
  LogoIcon: PropTypes.node,
  className: PropTypes.string,
}

const Logo = ({ className }) => (
  <span className={`logo-full ${className}`}>
    <LogoIcon />
    <LogoText />
  </span>
)

Logo.propTypes = {
  Logo: PropTypes.node,
  className: PropTypes.string,
}

export default Logo
