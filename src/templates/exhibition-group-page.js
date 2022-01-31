import { graphql } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/Layout'
import BasicHeader from '../components/BasicHeader'
import { ExhibitionGroupPageTemplate } from './ExhibitionGroupPageTemplate'

const ExhibitionGroupPage = ({ data }) => {
  console.log(data)

  return (
    <Layout>
      <BasicHeader />
      <ExhibitionGroupPageTemplate />
    </Layout>
  )
}

ExhibitionGroupPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ExhibitionGroupPage

export const exhibitionGroupPageQuery = graphql`
  query ExhibitionGroupPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        exhibitions {
          exhibition
        }
      }
    }
  }
`
