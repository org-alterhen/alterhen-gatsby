import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'
// import logo from '../img/logo.svg'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />


        <link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix('/')}favicon/apple-touch-icon.png`}/>
        <link rel="icon" type="image/png" sizes="32x32" href={`${withPrefix('/')}favicon/favicon-32x32.png`}/>
        <link rel="icon" type="image/png" sizes="16x16" href={`${withPrefix('/')}favicon/favicon-16x16.png`}/>
        <link rel="manifest" href={`${withPrefix('/')}favicon/site.webmanifest`}/>
        <link rel="mask-icon" href={`${withPrefix('/')}favicon/safari-pinned-tab.svg`} color="#000000"/>
        <meta name="apple-mobile-web-app-title" content="alterHEN"/>
        <meta name="application-name" content="alterHEN"/>
        <meta name="msapplication-TileColor" content="#000000"/>
        <meta name="theme-color" content="#ffffff"/>

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      {/* <Navbar /> */}
      {/* <div className="simpleHeader">
        <span className="logo-text">alterHEN</span>
      </div> */}
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
