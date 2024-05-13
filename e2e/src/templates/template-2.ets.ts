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
  __sb.append("\nHello ");
  __sb.append(props.name.toString(), false);
  __sb.append("!\n");
  if (props.needsPasswordReset) {
    __sb.glue();
    __sb.append("\nYou need to update your password.\n");
  }
  __sb.glue();
  __sb.append("\n");
  return __sb.string;
}
