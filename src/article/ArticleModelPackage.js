import { registerSchema, ListPackage } from 'substance'
import TextureDocument from './TextureDocument'
import InternalArticle from './InternalArticle'
import TextureArticleImporter from './TextureArticleImporter'
import TextureHTMLConverters from './TextureHTMLConverters'
import XMLListNode from './XMLListNode'
import XMLListItemNode from './XMLListItemNode'
import XMLListNodeHTMLConverter from './XMLListNodeHTMLConverter'
import TableElementNode from './TableElementNode'
import TableCellElementNode from './TableCellElementNode'
import FigureModel from './models/FigureModel'
import ReferenceModel from './models/ReferenceModel'
import ReferenceCollectionModel from './models/ReferenceCollectionModel'
import AuthorCollectionModel from './models/AuthorCollectionModel'
import GroupCollectionModel from './models/GroupCollectionModel'
import OrganisationCollectionModel from './models/OrganisationCollectionModel'

export default {
  name: 'TextureArticle',
  configure (config) {
    registerSchema(config, InternalArticle, TextureDocument)

    // override registered nodes
    config.addNode(XMLListNode, true)
    config.addNode(XMLListItemNode, true)
    config.addNode(TableElementNode, true)
    config.addNode(TableCellElementNode, true)

    config.addImporter(InternalArticle.getName(), TextureArticleImporter)
    // enable rich-text support for clipboard
    TextureHTMLConverters.forEach(converter => {
      config.addConverter('html', converter)
    })
    config.addConverter('html', XMLListNodeHTMLConverter)
    config.addConverter('html', ListPackage.ListItemHTMLConverter)

    // Collection Models
    config.addModel('authors', AuthorCollectionModel)
    config.addModel('groups', GroupCollectionModel)
    config.addModel('organisations', OrganisationCollectionModel)
    config.addModel('references', ReferenceCollectionModel)
    // Models: Provide API's on top of raw nodes
    config.addModel('fig', FigureModel)
    config.addModel('table-wrap', FigureModel)
    config.addModel('journal-article', ReferenceModel)
    config.addModel('conference-paper', ReferenceModel)
    config.addModel('data-publication', ReferenceModel)
    config.addModel('magazine-article', ReferenceModel)
    config.addModel('newspaper-article', ReferenceModel)
    config.addModel('patent', ReferenceModel)
    config.addModel('software', ReferenceModel)
    config.addModel('thesis', ReferenceModel)
    config.addModel('webpage', ReferenceModel)
    config.addModel('report', ReferenceModel)
    config.addModel('book', ReferenceModel)
    config.addModel('chapter', ReferenceModel)
  }
}
