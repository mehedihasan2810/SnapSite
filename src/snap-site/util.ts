import * as t from "@babel/types";
import { ControlType } from "./property-controls";

import { uuidName } from "./constants";

export const uniq = (arr: any[]) => {
  // @ts-ignore
  return [...new Set(arr)];
};

export const uuid = (
  a?: any // placeholder
) => {
  return a // if the placeholder was passed, return
    ? // a random number from 0 to 15
      (
        a ^ // unless b is 8,
        ((Math.random() * // in which case
          16) >> // a random number from
          (a / 4))
      ) // 8 to 11
        .toString(16) // in hexadecimal
    : // or otherwise a concatenated string:

      (
        "" +
        1e7 + // 10000000 +
        -1e3 + // -1000 +
        -4e3 + // -4000 +
        -8e3 + // -80000000 +
        -1e11
      ) // -100000000000,
        .replace(
          // replacing
          /[018]/g, // zeroes, ones, and eights with
          uuid // random hex digits
        );
};

export const toLiteral = (val: any) => {
  if (
    !val &&
    typeof val !== "number" &&
    typeof val !== "boolean" &&
    typeof val !== "string"
  ) {
    return t.nullLiteral();
  }

  if (typeof val === "number") {
    return t.numericLiteral(val || 0);
  }

  if (typeof val === "boolean") {
    return t.booleanLiteral(val);
  }

  return t.stringLiteral(val.toString());
};

// Returns a typed JSXAttribute
export const toJSXAttribute = (api: any, key: any, value: any) => {
  const { types: t } = api;

  switch (typeof value) {
    case "number":
    case "boolean":
      return t.JSXAttribute(
        t.JSXIdentifier(key),
        t.jsxExpressionContainer(toLiteral(value))
      );
    default:
      return t.JSXAttribute(t.JSXIdentifier(key), toLiteral(value));
  }
};

// Returns a typed value from onchange events
export const parseFieldValue = (type: any, e: any) => {
  const value = e.target.value;

  switch (type) {
    case ControlType.Number:
      return Number(value);
    case ControlType.Boolean:
      return value === "true";
    default:
      return value;
  }
};

// Leave last space on a string since a user could
// be in the middle of typing into a text input
export const textTrim = (str: string) =>
  str
    .replace(/^\s*/, "")
    .replace(/\s{1,}$/, " ")
    .replace(/\s+/g, " ");

export const isBlocksRootElement = (node: any) => {
  if (t.isJSXMemberExpression(node.name)) {
    const objectName = node.name.object && node.name.object.name;
    const propertyName = node.name.property && node.name.property.name;

    return objectName === "Blocks" && propertyName === "Root";
  }

  return false;
};

export const getElementName = (node: any) => {
  const elementName = node.name;

  if (t.isJSXMemberExpression(elementName)) {
    // @ts-ignore
    return [elementName.object.name, elementName.property.name].join(".");
  } else {
    return elementName.name;
  }
};

export const getUuidAttr = (node: any) =>
  node.attributes.find(
    (node: any) => node && node.name && node.name.name === uuidName
  );

export const addUuidAttr = (node: any) => {
  node.attributes.push(
    t.jSXAttribute(t.jSXIdentifier(uuidName), t.stringLiteral(uuid()))
  );
};

export const getUuid = (node: any) => {
  const id = getUuidAttr(node);
  return id && id.value.value;
};
