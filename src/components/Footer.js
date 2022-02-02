import React from 'react'
import { Link } from 'gatsby'
import { LogoText } from '../components/Logo'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content">
          <a
            href="https://immaterialfuture.org"
            target="_blank"
            rel="noreferrer"
            className="iflogo"
          ></a>
          <Link to="/">
            <LogoText />
          </Link>
        </div>
      </footer>
    )
  }
}

export default Footer
