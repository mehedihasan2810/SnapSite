import template from "@babel/template";

import { uuidName } from "../constants";

// eslint-disable-next-line
export default (_: any, { elementId }: any = {}) => {
  const ast = template.ast(`<h1>hello!</h1>`, {
    plugins: ["jsx"],
  });

  return {
    visitor: {
      JSXOpeningElement(path: {
        node: { attributes: any[] };
        parentPath: { insertAfter: (arg0: any) => void };
      }) {
        const id = path.node.attributes.find(
          (node: { name: { name: string } }) =>
            node && node.name && node.name.name === uuidName
        );

        if (!id || id.value.value !== elementId) {
          return;
        }
        //  @ts-ignore
        path.parentPath.insertAfter(ast.expression);
      },
    },
  };
};
