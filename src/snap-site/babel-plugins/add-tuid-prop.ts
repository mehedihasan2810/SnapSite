import { uuid, isBlocksRootElement, addUuidAttr, getUuidAttr } from '../util'

// eslint-disable-next-line
export default (api: any, options: any = {}) => {
  const { types: t } = api
  const { forceUuid } = options

  return {
    visitor: {
      JSXOpeningElement(path: any) {
        // Don't add UUIDs to internal blocks elements. For now we'll
        // prefix them with BLOCKS_
        const name = path.node.name && path.node.name.name
        if (name && name.startsWith('BLOCKS_')) {
          return
        }

        if (isBlocksRootElement(path.node)) {
          return
        }

        const tuid = getUuidAttr(path.node)

        if (tuid && !forceUuid) {
          return
        }

        if (tuid) {
          tuid.value = t.stringLiteral(uuid())
        } else {
          addUuidAttr(path.node)
        }
      }
    }
  }
}