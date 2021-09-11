import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { HTMLContent } from '../components/Content'
import { LogoText, LogoIcon } from '../components/Logo'

import Layout from '../components/Layout'
import ArtistRoll from '../components/ArtistRoll'

export const IndexPageTemplate = ({
  content
}) => (
  <div className="homepage">
    <div style={{padding: "2vw 4vw", position: 'absolute', top: '0', left: '0', right: '0', zIndex: '1'}}>
      <LogoText/>
      <div className="basic-header__icon"><LogoIcon/></div>
    </div>
    <div className="hero">
      <div className="hero-body">
        <LogoIcon/>
        <HTMLContent content={content} className="artist-post-content"/>
        <Link to="/about" className="read-more">Read More ⯈</Link>
      </div>
      <div className="hero-image" style={{ backgroundImage: 'url(../img/home-hero.png)' }}>

      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-12">
              <div className="content">
                <div className="column is-12">
                  {/* <h3 className="side-title">
                    ARTISTS
                  </h3> */}
                  <h2>EXHIBITIONS</h2>
                  <ArtistRoll />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  content: PropTypes.node
}

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  console.log(data)

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        content={html}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
      html: PropTypes.node
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 1080, quality: 95) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
