import React from 'react'
import PropTypes from 'prop-types'
import { random } from 'lodash-es'

import { Card } from './Card'

class ExhibitionsList extends React.Component {
  render() {
    const { exhibitions } = this.props

    const transformImg = (img) => {
      if (img.includes('.gif')) return img
      if (!img.includes('ucarecdn')) return img
      return img.substr(0, 58) + '-/scale_crop/599x475' + img.substr(57, 999)
    }

    return (
      <div className="columns is-multiline">
        {exhibitions &&
          exhibitions.map((exhibition) => (
            <Card
              key={exhibition.id}
              title={exhibition.frontmatter.title}
              artist={exhibition.frontmatter.artist}
              publishedDate={exhibition.frontmatter.date}
              url={exhibition.fields.slug}
              imageUrl={
                exhibition.frontmatter.featuredimage
                  ? transformImg(exhibition.frontmatter.featuredimage)
                  : false
              }
              imageAlt={`featured artwork for ${exhibition.frontmatter.name} - ${exhibition.frontmatter.title}`}
              className={'is-parent column is-6'}
              style={{ order: random(1, 999) }}
            />
          ))}
      </div>
    )
  }
}

ExhibitionsList.propTypes = {
  exhibitions: PropTypes.array,
}

export { ExhibitionsList }
