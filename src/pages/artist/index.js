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
            className="is-size-1"
            style={{
              backgroundColor: '#000',
              color: 'white',
              padding: '1rem',
              fontWeight: '400',
              letterSpacing: '0.4rem'
            }}
          >
            artists
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
