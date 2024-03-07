import { toJSXAttribute, getUuid } from '../util'

// eslint-disable-next-line
export default (api: any, { elementId, key, value }: any = {}) => {
  return {
    visitor: {
      JSXOpeningElement(path: any) {
        const id = getUuid(path.node)

        if (!id || id !== elementId) {
          return
        }

        const newAttr = toJSXAttribute(api, key, value)

        const existingAttrIndex = path.node.attributes.findIndex(
          (node: any) => node && node.name && node.name.name === key
        )

        if (existingAttrIndex !== -1) {
          path.node.attributes[existingAttrIndex] = newAttr
        } else {
          path.node.attributes.push(newAttr)
        }
      }
    }
  }
}