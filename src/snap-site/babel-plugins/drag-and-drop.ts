import template from "@babel/template";

import { isBlocksRootElement } from "../util";
import { uuidName } from "../constants";

const buildDraggable = (id: any, index: any) =>
  template.ast(
    `
  <BLOCKS_Draggable key='${id}' draggableId='${id}' index={${index}}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      ></div>
    )}
  </BLOCKS_Draggable>
`,
    { plugins: ["jsx"] }
  );

const buildInlineDraggable = (id: any, index: any) =>
  template.ast(
    `
  <BLOCKS_Draggable key='${id}' draggableId='${id}' index={${index}}>
    {(provided, snapshot) => (
      <span
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      ></span>
    )}
  </BLOCKS_Draggable>
`,
    { plugins: ["jsx"] }
  );

// eslint-disable-next-line
export default (api: any) => {
  const { types: t } = api;

  return {
    visitor: {
      JSXElement(path: any) {
        const openingElement = path.node.openingElement;
        let isNav = false;

        if (!isBlocksRootElement(openingElement)) {
          return;
        }

        path.node.children = path.node.children
          .filter((node: any) => t.isJSXElement(node))
          .map((node: any, i: any) => {
            const tuid = node.openingElement.attributes.find(
              (node: any) => node.name && node.name.name === uuidName
            );

            if (!tuid) {
              return null;
            }

            const id = tuid.value.value;
            // @ts-ignore
            const { expression: childWrapper } = isNav
              ? buildInlineDraggable(id, i)
              : buildDraggable(id, i);
            childWrapper.children[1].expression.body.children = [node];

            return childWrapper;
          });

        if (t.isJSXMemberExpression(openingElement.name)) {
          path.node.openingElement.name = t.jsxIdentifier("BLOCKS_Root");
          path.node.closingElement.name = t.jsxIdentifier("BLOCKS_Root");
        }
      },
    },
  };
};
