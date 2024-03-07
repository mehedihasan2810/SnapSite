import { declare } from "@babel/helper-plugin-utils";

class BabelPluginGetExportedElements {
  constructor() {
    // @ts-ignore
    this.state = { elements: {} };

    // @ts-ignore
    this.plugin = declare((api) => {
      api.assertVersion(7);
      const { types: t } = api;

      return {
        visitor: {
          ExportNamedDeclaration: (path) => {
            const {
              declaration: {
                // @ts-ignore
                declarations: [declaration],
              },
            } = path.node;
            const el = declaration.init.body;

            if (t.isJSXElement(el)) {
              const name = declaration.id.name;
              // @ts-ignore
              this.state.elements[name] = el;
            }
          },
        },
      };
    });
  }
}

export default BabelPluginGetExportedElements;
