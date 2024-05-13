/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 *
 * Run `npx ets` or `yarn ets` to regenerate this file.
 * Source: ./template-6.ets
 */
/* eslint-disable */

import renderUser, { Props as User } from "./user-partial.ets";

export interface Props {
  users: User[];
}

const example = `1
2
3
4`;

class __EtsStringBuilder {
  string: string = "";
  isGlue: boolean = false;
  glue() {
    this.isGlue = true;
  }
  append(string: string, preserveIndent: boolean = false) {
    if (this.isGlue && string.startsWith("\n")) {
      string = string.slice(1);
    }
    if (preserveIndent) {
      const indent = this.indent;
      const parts = string.split("\n");
      this.string += parts[0];
      for (const part of parts.slice(1)) {
        this.string += "\n" + " ".repeat(indent) + part;
      }
    } else {
      this.string += string;
    }
    this.isGlue = false;
  }
  get indent() {
    const parts = this.string.split("\n");
    return parts[parts.length - 1].length;
  }
}

export default function (props: Props): string {
  const __sb = new __EtsStringBuilder();
  if (props.users.length > 0) {
    __sb.glue();
    __sb.append("\nHere is a list of users:\n");
    for (const user of props.users) {
      __sb.glue();
      __sb.append("\n  ");
      __sb.append(renderUser(user).trimEnd().toString(), true);
      __sb.append("\n");
    }
    __sb.append("\n");
  }
  __sb.glue();
  __sb.append(
    "\nThe indentation level is preserved for the rendered 'partial'.\n\nThere isn't anything special about the 'partial'. Here we used another ets template, but any\nexpression yeilding a multiline string would be treated the same.\n\n  "
  );
  __sb.append(example.toString(), true);
  __sb.append("\n\nThe end!\n");
  return __sb.string;
}
