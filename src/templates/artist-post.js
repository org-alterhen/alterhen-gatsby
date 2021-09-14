import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
// import Exhibition from '../components/Exhibition'
import BasicHeader from '../components/BasicHeader'
import {SocialMediaIconsReact} from 'social-media-icons-react';
// import Img from "gatsby-image"
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
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
              <h2 className="is-size-5 has-text-weight-bold">
                {name}
              </h2>
              <div className="artist-socials">
                { website && <SocialMediaIconsReact 
                  icon="web"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="rgba(60,60,60,1)"
                  iconSize="3"
                  borderWidth="0"
                  roundness="50%"
                  url={website}
                  size="26"
                />}
                { twitter && <SocialMediaIconsReact 
                  icon="twitter"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="rgba(60,60,60,1)"
                  iconSize="3"
                  borderWidth="0"
                  roundness="50%"
                  url={`https://twitter.com/${twitter}`}
                  size="26"
                />}
                { instagram && <SocialMediaIconsReact 
                  icon="instagram"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="rgba(60,60,60,1)"
                  iconSize="3"
                  borderWidth="0"
                  roundness="50%"
                  url={`https://instagram.com/${instagram}`}
                  size="26"
                />}
                { facebook && <SocialMediaIconsReact 
                  icon="facebook"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="rgba(60,60,60,1)"
                  iconSize="3"
                  borderWidth="0"
                  roundness="50%"
                  url={`https://facebook.com/${facebook}`}
                  size="26"
                />}
                { tumblr && <SocialMediaIconsReact 
                  icon="tumblr"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="rgba(60,60,60,1)"
                  iconSize="3"
                  borderWidth="0"
                  roundness="50%"
                  url={`https://tumblr.com/${tumblr}`}
                  size="26"
                />}
                { linktree && <SocialMediaIconsReact 
                  icon="web"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="rgba(60,60,60,1)"
                  iconSize="3"
                  borderWidth="0"
                  roundness="50%"
                  url={`https://linktr.ee/${linktree}`}
                  size="26"
                />}
                { henlink && <SocialMediaIconsReact 
                  icon="web"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="rgba(60,60,60,1)"
                  iconSize="3"
                  borderWidth="0"
                  roundness="50%"
                  url={`https://henlink.com/${henlink}`}
                  size="26"
                />}
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
                <Link to={`/exhibition/${ title.toLowerCase().replace(/ /g,'-') }`} className="block-btn">Enter Exhibition</Link>
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
