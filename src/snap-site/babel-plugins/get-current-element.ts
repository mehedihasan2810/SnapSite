import { declare } from "@babel/helper-plugin-utils";
import * as t from "@babel/types";

import { textTrim, getElementName, getUuid } from "../util";
import { uuidName } from "../constants";
import { NodePath } from "@babel/traverse";

const getElementProps = (attributes = {}) => {
  // @ts-ignore
  const props = attributes.reduce(
    (
      acc: { [x: string]: any },
      curr: {
        value: t.Node | null | undefined;
        name: { name: string | number };
      }
    ) => {
      let value = null;
      // @ts-ignore
      if (curr.value.value) {
        // @ts-ignore
        value = curr.value.value;
      } else if (t.isJSXExpressionContainer(curr.value)) {
        // @ts-ignore
        value = curr.value.expression.properties.reduce(
          (
            acc: { [x: string]: any },
            curr: { key: { name: string | number }; value: { value: any } }
          ) => {
            acc[curr.key.name] = curr.value.value;
            return acc;
          },
          {}
        );
      } else {
        //debugger
      }

      acc[curr.name.name] = value;
      return acc;
    },
    {}
  );

  props.sx = props.sx || {};
  return props;
};

const getParentId = (node: NodePath<t.JSXOpeningElement>) => {
  // @ts-ignore
  const parent = node.parentPath.parentPath.node;
  // @ts-ignore
  const openingElement = parent && parent.openingElement;

  if (!openingElement) {
    return null;
  }

  const id = openingElement.attributes.find(
    (node: { name: { name: string } }) =>
      node && node.name && node.name.name === uuidName
  );

  return id && id.value && id.value.value;
};

class BabelPluginGetCurrentElement {
  state: { element: null };
  plugin: any;
  constructor() {
    this.state = { element: null };

    this.plugin = declare((api, { elementId }) => {
      api.assertVersion(7);
      const { types: t } = api;

      return {
        visitor: {
          JSXOpeningElement: (path) => {
            const id = path.node.attributes.find(
              // @ts-ignore
              (node) => node && node.name && node.name.name === uuidName
            );

            // @ts-ignore
            if (!id || id.value.value !== elementId) {
              return;
            }

            // @ts-ignore
            const children = path.container.children || [];
            const hasElements = children.some(
              (n: t.Node | null | undefined) => !t.isJSXText(n)
            );

            const element = {
              id: elementId,
              name: getElementName(path.node),
              props: getElementProps(path.node.attributes),
              parentId: getParentId(path),
            };

            if (hasElements) {
              // @ts-ignore
              element.children = children
                .map((c: t.Node | null | undefined) => {
                  if (t.isJSXText(c)) {
                    return false;
                  }
                  return {
                    // @ts-ignore
                    id: getUuid(c.openingElement),
                    // @ts-ignore
                    name: getElementName(c.openingElement),
                  };
                })
                .filter(Boolean);
            } else if (children.length) {
              // @ts-ignore
              element.text = children
                .map((n: { value: string }) => textTrim(n.value))
                .join(" ");
            }
            // @ts-ignore
            this.state.element = element;
          },
        },
      };
    });
  }
}

export default BabelPluginGetCurrentElement;
