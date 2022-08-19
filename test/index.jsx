import React from "react";

export default function Test(props) {
  const foo = "FOO";
  const bar = "BAR";
  const foobar = `你好`;

  switch (foobar) {
    case "A":
      console.log("A-中文");
      break;
    default:
      console.log("DEFAULT-中文");
      break;
  }

  return (
    <div className="wrapper">
      <div>第一行中文</div>
      <div>'第二行中文'</div>
      <div>{"第二行中文"}</div>
      <div>{`第三行中文`}</div>
      <div>{`${foo}第四行中文`}</div>
      <div>{`${foo}第五行中文${bar}`}</div>
      <div>{foobar}</div>
    </div>
  );
}
