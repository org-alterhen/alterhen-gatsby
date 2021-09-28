import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { HTMLContent } from '../components/Content'
import { LogoText, LogoIcon } from '../components/Logo'

import Layout from '../components/Layout'
import ArtistRoll from '../components/ArtistRoll'

export const IndexPageTemplate = ({
  content
}) => {
  const userAddress = localStorage.getItem('lastUserAddress')
  return (
    <div className="homepage">
      <div style={{padding: "2em", position: 'absolute', top: '0', left: '0', right: '0', zIndex: '1'}}>
        <LogoText className="logo-black"/>
        <div className="basic-header__icon"><LogoIcon className="logo-white"/></div>
      </div>
      <div className="hero">
        <div className="hero-body">
          <span className="alter-hen-logo"></span>
          <HTMLContent content={content} className="artist-post-content"/>
          <Link to="/about" className="read-more">Read More <span>►</span></Link>
        </div>
        <div className="hero-image" style={{ background: 'black' }}>
          <iframe title="homepage animation" style={{width:'100%',height:'100%',border:'0px'}} src="https://sandbox.cables.gl/viewer/61409ec67478d428e57439ca"></iframe>
        </div>
      </div>
      <h1 className="separating-headline">EXHIB\TIONS</h1>
      <section className="section tint-pink">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-12">
                <div className="content">
                  <div className="column is-12" id="exhibitions">
                    <ArtistRoll />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      { userAddress && (
        <h1 className="separating-headline collection"><a target="_blank" rel="noreferrer" href={`https://hexpo.andreasrau.eu/#${userAddress}/collection`}>YOUR COLLECT\ON</a></h1>
      )}
    </div>
  )
}

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
