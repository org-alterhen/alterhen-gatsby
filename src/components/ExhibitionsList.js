import React from 'react'
import PropTypes from 'prop-types'
import { random } from 'lodash-es'

import { Card } from './Card'

class ExhibitionsList extends React.Component {
  render() {
    const { exhibitions, overrides } = this.props

    return (
      <div className="columns is-multiline">
        {exhibitions &&
          exhibitions.map((exhibition) => (
            <div
              className={'is-parent column is-6'}
              key={exhibition.id}
              style={{ order: random(1, 999) }}
            >
              <Card
                title={exhibition.frontmatter.title}
                artist={exhibition.frontmatter.artist}
                publishedDate={
                  overrides.publishedDate
                    ? overrides.publishedDate
                    : exhibition.frontmatter.date
                }
                url={exhibition.fields.slug}
                image={exhibition.frontmatter.featuredimage}
                imageAlt={`Featured artwork for ${exhibition.frontmatter.name} - ${exhibition.frontmatter.title}`}
              />
            </div>
          ))}
      </div>
    )
  }
}

ExhibitionsList.propTypes = {
  exhibitions: PropTypes.array,
}

export default ExhibitionsList
