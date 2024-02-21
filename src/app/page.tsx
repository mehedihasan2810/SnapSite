"use client";

import * as t from "@babel/types";

export default function Home() {
  const node = (
    <h1 title="hey">
      foo<p>what</p>
    </h1>
  );

  // console.log(node);
  console.log(
    t.jsxAttribute(
      t.jsxIdentifier("foo"),
      t.jsxExpressionContainer(t.numericLiteral(0))
    )
  );

  // console.log(t.numericLiteral(0));
  // console.log(t.jsxExpressionContainer(t.numericLiteral(0)));
  return (
    <div id="app" className="app">
      hello
    </div>
  );
}
