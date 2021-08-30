import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Exhibition from '../components/Exhibition'
import Content, { HTMLContent } from '../components/Content'

export const ArtistPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
  artist,
  blurb
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold">
              {artist}
            </h1>
            <h3 className="title is-size-1 has-text-weight-bold">
              {title}
            </h3>
            <p style={{whiteSpace: 'pre-wrap'}}>{blurb}</p>
          </div>
        </div>
      </div>
      <img src="/img/mid-banner.png" className="mid-banner breakout-width"></img>
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <PostContent content={content} />
          </div>
        </div>
        <Link to={`/exhibition/${artist}`} className="block-btn">Enter Exhibition</Link>
      </div>
    </section>
  )
}

ArtistPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  artist: PropTypes.string,
  blurb: PropTypes.string
}

const ArtistPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <div className="basic-header">
        <Link to="/"><Logo/></Link>
      </div>
      <ArtistPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        blurb={post.frontmatter.blurb}
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
        blurb
      }
    }
  }
`
