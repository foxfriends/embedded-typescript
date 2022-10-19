/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 *
 * Run `npx ets` or `yarn ets` to regenerate this file.
 * Source: ./template-2.ets
 */
/* eslint-disable */

export interface Props {
  name: string;
  needsPasswordReset: boolean;
}

export default function (props: Props): string {
  let result = "";
  result += "Hello ";
  result += props.name;
  result += "!\n";
  if (props.needsPasswordReset) {
    result += "You need to update your password.\n";
  }
  return result;
}
