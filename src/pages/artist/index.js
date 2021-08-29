import React from 'react'
import { Link } from 'gatsby' 

import Layout from '../../components/Layout'
import Logo from '../../components/Logo'
import ArtistRoll from '../../components/ArtistRoll'

export default class ArtistIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="hero-artist">
          <Link to="/"><Logo/></Link>
        </div>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/artist-index.jpg')`
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
              backgroundColor: '#000',
              color: 'white',
              padding: '1rem',
            }}
          >
            alterHEN Artists
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <ArtistRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
