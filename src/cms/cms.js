import CMS from 'netlify-cms-app'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import ArtistPostPreview from './preview-templates/ArtistPostPreview'
import ExhibitionPagePreview from './preview-templates/ExhibitionPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('exhibition', ExhibitionPagePreview)
CMS.registerPreviewTemplate('artist', ArtistPostPreview)