import { declare } from "@babel/helper-plugin-utils";

class BabelPluginGetBlocksUsage {
  state: { usage: null };
  plugin: any;
  constructor() {
    this.state = { usage: null };

    this.plugin = declare((api) => {
      api.assertVersion(7);
      const { types: t } = api;

      return {
        visitor: {
          ExportDefaultDeclaration: (path, { file }) => {
            const { body } = file.ast.program;
            // @ts-ignore
            const name = path.node.declaration.name;
            const usage = body.find((node) => {
              // @ts-ignore
              if (!node.expression || !node.expression.left) {
                return false;
              }

              return (
                t.isExpressionStatement(node) &&
                // @ts-ignore
                node.expression.left.object.name === name &&
                 // @ts-ignore
                node.expression.left.property.name === "usage"
              );
            });

            if (usage) {
              // @ts-ignore
              this.state.usage = usage.expression.right.quasis[0].value.raw;
            }
          },
        },
      };
    });
  }
}

export default BabelPluginGetBlocksUsage;
