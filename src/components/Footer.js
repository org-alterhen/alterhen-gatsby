import React from 'react'
import { Link } from 'gatsby'
import Logo from '../components/Logo'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content">
          <Link to="/"><Logo/></Link>
        </div>
      </footer>
    )
  }
}

export default Footer
