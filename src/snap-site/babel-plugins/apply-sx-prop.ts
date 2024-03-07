import { toLiteral } from "../util";
import { uuidName } from "../constants";

// eslint-disable-next-line
export default (api: any, { elementId, sx }: any) => {
  const { types: t } = api;

  return {
    visitor: {
      JSXOpeningElement(path: any) {
        const id = path.node.attributes.find(
          (node: any) => node && node.name && node.name.name === uuidName
        );

        if (!id || id.value.value !== elementId) {
          return;
        }

        Object.entries(sx).forEach(([key, value]) => {
          const sxProp = path.node.attributes.find(
            (node: any) => node && node.name && node.name.name === "sx"
          );

          if (typeof value === "undefined") {
            return;
          }

          if (!sxProp) {
            path.node.attributes.push(
              t.jSXAttribute(
                t.jSXIdentifier("sx"),
                t.jsxExpressionContainer(
                  t.objectExpression([
                    t.objectProperty(t.identifier(key), toLiteral(value)),
                  ])
                )
              )
            );
          } else {
            const existingProp = sxProp.value.expression.properties.find(
              (node: any) => node.key.name === key
            );

            if (existingProp) {
              existingProp.value = toLiteral(value);
              return;
            }

            sxProp.value.expression.properties.push(
              t.objectProperty(t.identifier(key), toLiteral(value))
            );
          }
        });
      },
    },
  };
};
