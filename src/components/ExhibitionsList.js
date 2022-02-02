import React from 'react'
import PropTypes from 'prop-types'
import { random } from 'lodash-es'

import { Card } from './Card'

class ExhibitionsList extends React.Component {
  render() {
    const { exhibitions } = this.props

    return (
      <div className="columns is-multiline">
        {exhibitions &&
          exhibitions.map((exhibition) => (
            <div className={'is-parent column is-6'}>
              <Card
                key={exhibition.id}
                title={exhibition.frontmatter.title}
                artist={exhibition.frontmatter.artist}
                publishedDate={exhibition.frontmatter.date}
                url={exhibition.fields.slug}
                image={exhibition.frontmatter.featuredimage}
                imageAlt={`Featured artwork for ${exhibition.frontmatter.name} - ${exhibition.frontmatter.title}`}
                style={{ order: random(1, 999) }}
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
