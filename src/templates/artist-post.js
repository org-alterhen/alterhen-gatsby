import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
// import Exhibition from '../components/Exhibition'
import BasicHeader from '../components/BasicHeader'
// import Img from "gatsby-image"
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
// import SocialLinks from '../components/SocialLinks'
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
  linktree,
  tumblr,
  bio,
  profpic,
  midbanner = null
}) => {
  return (
    <>
      { midbanner && (
        midbanner.childImageSharp ? (
          <PreviewCompatibleImage
            imageInfo={{
              image: midbanner,
              alt: `page break banner by ${name}`,
            }}
            className="top-banner breakout-width"
          />
        ) : (
          <PreviewCompatibleImage
            imageInfo={{
              image: midbanner.publicURL,
              alt: `page break banner by ${name}`,
            }}
            className="top-banner breakout-width"
          />
        )
      ) }
      <section className="section">
        {helmet || ''}
        <div className="container content">
          <div className="columns" style={{margin: '0'}}>
            <div className="column is-one-third" style={{
              borderRight: '2px solid black',
              marginTop: '-3rem',
              marginBottom: '-3rem',
              padding: '2rem'
            }}>
              { profpic && (
                profpic.childImageSharp ? (
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: profpic,
                      alt: name,
                    }}
                    className="artist-profpic"
                  />
                ) : (
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: profpic.publicURL,
                      alt: name,
                    }}
                    className="artist-profpic"
                  />
                )
              ) }
              <h2 style={{marginTop: 0}} className="is-size-5 has-text-weight-bold">
                {name}
              </h2>
              <div className="artist-socials">
                {/* <SocialLinks links={{
                  website: website,
                  instagram: instagram,
                  twitter: twitter,
                  facebook: facebook,
                  linktree: linktree,
                  henlink: henlink,
                  tumblr: tumblr                  
                }} /> */}
              </div>
              {/* <h3 className="title is-size-1 has-text-weight-bold">
                {title}
              </h3> */}
              <p style={{whiteSpace: 'pre-wrap'}}>{bio}</p>
            </div>
            
            <div className="column is-two-thirds" style={{paddingLeft: '2rem'}}>
              <div className="exhibition__title">
                <h1>{title}</h1>
              </div>
              <div className="exhibition__description">
              <p style={{whiteSpace: 'pre-wrap'}}>{statement}</p>
              </div>
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
        tumblr={post.frontmatter.tumblr}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        midbanner={post.frontmatter.midbanner}
        profpic={post.frontmatter.profpic}
        helmet={
          <Helmet titleTemplate="%s | Artist">
            <title>{`${post.frontmatter.name}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
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
        linktree
        statement
        profpic {
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        midbanner {
          childImageSharp {
            fluid(maxWidth: 2560, maxHeight: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
      }
    }
  }
`
