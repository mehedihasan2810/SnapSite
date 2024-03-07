import { declare } from "@babel/helper-plugin-utils";

import { getElementName, getUuid } from "../util";

class BabelPluginGetBlocks {
  state: { blocks: never[] };
  plugin: any;
  constructor() {
    this.state = { blocks: [] };

    this.plugin = declare((api) => {
      api.assertVersion(7);
      const { types: t } = api;

      return {
        visitor: {
          JSXElement: (path) => {
            const openingElement = path.node.openingElement;

            if (t.isJSXMemberExpression(openingElement.name)) {
              const objectName =
                // @ts-ignore
                openingElement.name.object && openingElement.name.object.name;
              const propertyName =
                openingElement.name.property &&
                openingElement.name.property.name;

              if (objectName !== "Blocks" && propertyName !== "Root") {
                return;
              }

              const children = path.node.children.filter(
                (c) => !t.isJSXText(c)
              );

              children.forEach((child: any) => {
                const id = getUuid(child.openingElement);
                const name = getElementName(child.openingElement);
                // @ts-ignore
                this.state.blocks.push({ id, name });
              });
            }
          },
        },
      };
    });
  }
}

export default BabelPluginGetBlocks;
