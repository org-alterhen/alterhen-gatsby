import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Exhibition from '../components/Exhibition'
import BasicHeader from '../components/BasicHeader'
import {SocialMediaIconsReact} from 'social-media-icons-react';
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
  bio
}) => {
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold">
              {name}
            </h1>
            <div className="artist-socials">
              { website && <SocialMediaIconsReact 
                icon="web"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(40,40,40,1)"
                iconSize="5"
                borderWidth="0"
                roundness="50%"
                url={website}
                size="30"
              />}
              { twitter && <SocialMediaIconsReact 
                icon="twitter"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(40,40,40,1)"
                iconSize="5"
                borderWidth="0"
                roundness="50%"
                url={`https://twitter.com/${twitter}`}
                size="30"
              />}
              { instagram && <SocialMediaIconsReact 
                icon="instagram"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(40,40,40,1)"
                iconSize="5"
                borderWidth="0"
                roundness="50%"
                url={`https://instagram.com/${instagram}`}
                size="30"
              />}
              { facebook && <SocialMediaIconsReact 
                icon="facebook"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(40,40,40,1)"
                iconSize="5"
                borderWidth="0"
                roundness="50%"
                url={`https://facebook.com/${facebook}`}
                size="30"
              />}
              { tumblr && <SocialMediaIconsReact 
                icon="tumblr"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(40,40,40,1)"
                iconSize="5"
                borderWidth="0"
                roundness="50%"
                url={`https://tumblr.com/${tumblr}`}
                size="30"
              />}
              { linktree && <SocialMediaIconsReact 
                icon="web"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(40,40,40,1)"
                iconSize="5"
                borderWidth="0"
                roundness="50%"
                url={`https://linktr.ee/${linktree}`}
                size="30"
              />}
              { henlink && <SocialMediaIconsReact 
                icon="web"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(40,40,40,1)"
                iconSize="5"
                borderWidth="0"
                roundness="50%"
                url={`https://henlink.com/${henlink}`}
                size="30"
              />}
            </div>
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
            <div className="exhibition__title">
              {/* <h1>{title}</h1> */}
            </div>
            <div className="exhibition__description">
              {/* <p>{description}</p> */}
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <p style={{whiteSpace: 'pre-wrap'}}>{statement}</p>
          </div>
        </div>
      </div>
      <br/>
      <div className="has-text-centered	">
        {/* <Link to={`/exhibition/${ name.toLowerCase().replace(/ /g,'-') }`} className="block-btn">Enter Exhibition</Link> */}
        <button onClick={() => {
          document.getElementsByTagName('html')[0].style.overflow = "hidden"; 
          document.body.classList.add("exhibition")
        }} className="block-btn">Enter Exhibition</button>
        <Exhibition
          objkts={[12345,23456,34567]}
        />
      </div>
      <br/><br/><br/>
    </section>
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
  links: PropTypes.array
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
      }
    }
  }
`
