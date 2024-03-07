import template from '@babel/template'

import { uuidName } from '../constants'

// eslint-disable-next-line
export default (_: any, { elementId }: any = {}) => {
  const ast = template.ast(`<h1>hello!</h1>`, {
    plugins: ['jsx']
  })

  return {
    visitor: {
      JSXOpeningElement(path: any) {
        const id = path.node.attributes.find(
            // @ts-ignore
          node => node && node.name && node.name.name === uuidName
        )

        if (!id || id.value.value !== elementId) {
          return
        }
      // @ts-ignore
        path.parentPath.insertBefore(ast.expression)
      }
    }
  }
}