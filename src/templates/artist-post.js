import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
// import Exhibition from '../components/Exhibition'
import BasicHeader from '../components/BasicHeader'
// import Img from "gatsby-image"
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import SocialLinks from '../components/SocialLinks'
// import ExhibitionLinks from '../components/ExhibitionLinks'
// import Content, { HTMLContent } from '../components/Content'

export const ArtistPostTemplate = ({
  helmet,
  name,
  title,
  description,
  statement,
  country,
  website,
  instagram,
  twitter,
  facebook,
  henlink,
  hicetnunc,
  linktree,
  tumblr,
  bio,
  profpic,
  midbanner = null
}) => {
  return (
    <>
      { midbanner && (
        <PreviewCompatibleImage
          imageInfo={{
            image: midbanner,
            alt: `page break banner by ${name}`,
          }}
          className="top-banner breakout-width"
        />
      ) }
      <section className="section artist-post">
        {helmet || ''}
        <div className="container content">
          <div className="columns" style={{margin: '0'}}>
            <div className="column is-one-third artist-post-sidebar">
              { profpic && (
                <PreviewCompatibleImage
                  imageInfo={{
                    image: profpic,
                    alt: name,
                  }}
                  className="artist-profpic"
                />
              ) }
              <div className="artist-socials">
                <SocialLinks links={{
                  website: website,
                  instagram: instagram,
                  twitter: twitter,
                  facebook: facebook,
                  linktree: linktree,
                  henlink: henlink,
                  tumblr: tumblr,
                  hicetnunc: hicetnunc,               
                }} />
              </div>
              <h2 style={{marginTop: 0}} className="is-size-5 has-text-weight-bold">
                {name}
              </h2>
              {/* <h3 className="title is-size-1 has-text-weight-bold">
                {title}
              </h3> */}
              <p style={{whiteSpace: 'pre-wrap'}}>{bio}</p>
            </div>
            
            <div className="column is-two-thirds">
              <div className="exhibition__title">
                <h1>{title}</h1>
              </div>
              <p className="exhibition__description">{statement}</p>
              <br/><br/>
              <div>
                <Link to={`/exhibition/${ title.toLowerCase().replace(/[ ]/g,'-').replace(/["|'|,|_]/g,'') }`} className="block-btn">Enter Exhibition</Link>
                {/* <ExhibitionLinks posts={[title]}></ExhibitionLinks> */}
              </div>
              <br/><br/><br/>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

ArtistPostTemplate.propTypes = {
  published: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  helmet: PropTypes.object,
  name: PropTypes.string,
  bio: PropTypes.string,
  statement: PropTypes.string,
  country: PropTypes.string,
  website: PropTypes.string,
  links: PropTypes.array,
  midbanner: PropTypes.string,
  profpic: PropTypes.string,
}

const ArtistPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BasicHeader/>
      <ArtistPostTemplate
        bio={post.frontmatter.bio}
        statement={post.frontmatter.statement}
        country={post.frontmatter.country}
        website={post.frontmatter.website}
        links={post.frontmatter.links}
        name={post.frontmatter.name}
        instagram={post.frontmatter.instagram}
        twitter={post.frontmatter.twitter}
        facebook={post.frontmatter.facebook}
        linktree={post.frontmatter.linktree}
        henlink={post.frontmatter.henlink}
        hicetnunc={post.frontmatter.hicetnunc}
        tumblr={post.frontmatter.tumblr}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        midbanner={post.frontmatter.midbanner}
        profpic={post.frontmatter.profpic}
        helmet={
          <Helmet titleTemplate="%s | Artist">
            <title>{post.frontmatter.name}</title>
            <meta
              name="description"
              content={post.frontmatter.bio}
            />
            
            {/* open graph */}
            <meta property="og:title" content={post.frontmatter.name} />
            <meta
              name="og:description"
              content={post.frontmatter.bio}
            />
            <meta
              property="og:image"
              content={post.frontmatter.profpic}
            />

            
            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image"/>
            {/* <meta property="twitter:url" content="https://alterhen.art/"/> */}
            <meta property="twitter:title" content={post.frontmatter.name}/>
            <meta property="twitter:description" content={post.frontmatter.bio}/>
            <meta property="twitter:image" content={post.frontmatter.profpic}/>
          </Helmet>
        }
      />
    </Layout>
  )
}

ArtistPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  }),
}

export default ArtistPost

export const pageQuery = graphql`
  query ArtistPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        published
        title
        name
        description
        bio
        country
        website
        instagram
        twitter
        tumblr
        facebook
        henlink
        hicetnunc
        linktree
        statement
        profpic
        midbanner
      }
    }
  }
`
