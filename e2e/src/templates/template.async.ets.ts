/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 *
 * Run `npx ets` or `yarn ets` to regenerate this file.
 * Source: ./template.async.ets
 */
/* eslint-disable */

interface Props {
  promise: Promise<string>;
}

export default async function (props: Props): Promise<string> {
  let result = "";
  result += "The promise resolves to: ";
  result += await props.promise;
  result += ".";
  return result;
}
