import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { LogoText } from '../components/Logo'
// import Content, { HTMLContent } from '../components/Content'

export const ArtistPostTemplate = ({
  helmet,
  artist,
  statement,
  country,
  website,
  links,
  bio
}) => {
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold">
              {artist}
            </h1>
            {/* <h3 className="title is-size-1 has-text-weight-bold">
              {title}
            </h3> */}
            <p style={{whiteSpace: 'pre-wrap'}}>{bio}</p>
          </div>
        </div>
      </div>
      <img src="/img/mid-banner.png" alt="page break banner" className="mid-banner breakout-width"></img>
      <br/>
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <p style={{whiteSpace: 'pre-wrap'}}>{statement}</p>
          </div>
        </div>
      </div>
      <br/>
      <div className="has-text-centered	">
        <Link to={`/exhibition/${ artist.toLowerCase().replace(/ /g,'-') }`} className="block-btn">Enter Exhibition</Link>
      </div>
      <br/><br/><br/>
    </section>
  )
}

ArtistPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
  artist: PropTypes.string,
  bio: PropTypes.string,
  statement: PropTypes.string,
  country: PropTypes.string,
  website: PropTypes.string,
  links: PropTypes.object
}

const ArtistPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <div className="basic-header">
        <Link to="/"><LogoText/></Link>
      </div>
      <ArtistPostTemplate
        bio={post.frontmatter.bio}
        statement={post.frontmatter.statement}
        country={post.frontmatter.country}
        website={post.frontmatter.website}
        links={post.frontmatter.links}
        artist={post.frontmatter.artist}
        helmet={
          <Helmet titleTemplate="%s | Artist">
            <title>{`${post.frontmatter.artist}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

ArtistPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ArtistPost

export const pageQuery = graphql`
  query ArtistPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        artist
        description
        bio
        country
        website
        links {
          instagram
          twitter
          tumblr
          facebook
          henlink
          linktree
        }
        statement
      }
    }
  }
`
