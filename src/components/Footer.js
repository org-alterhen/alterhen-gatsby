import React from 'react'
import { Link } from 'gatsby'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content">
          <Link to="/"><span className="logo-text">alterHEN</span></Link>
        </div>
      </footer>
    )
  }
}

export default Footer
