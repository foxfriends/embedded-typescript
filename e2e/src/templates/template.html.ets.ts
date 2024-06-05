/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 *
 * Run `npx ets` or `yarn ets` to regenerate this file.
 * Source: ./template.html.ets
 */
/* eslint-disable */

const HTML_STRING = "<div>Hello World</div>";

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

const HTML_NEED_ESCAPE = /["'&<>]/;
function __escape(string: string): string {
  const match = HTML_NEED_ESCAPE.exec(string);
  if (!match) return string;
  let html = "";
  let index = 0;
  let lastIndex = 0;
  for (index = match.index; index < string.length; ++index) {
    let escape;
    switch (string.charCodeAt(index)) {
      case 34: // "
        escape = "&quot;";
        break;
      case 38: // &
        escape = "&amp;";
        break;
      case 39: // '
        escape = "&#39;";
        break;
      case 60: // <
        escape = "&lt;";
        break;
      case 62: // >
        escape = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) html += string.substring(lastIndex, index);
    lastIndex = index + 1;
    html += escape;
  }
  return lastIndex !== index ? html + string.substring(lastIndex, index) : html;
}

function render(props: unknown): string {
  const __sb = new __EtsStringBuilder();
  __sb.append("<div>\n  This is the HTML source:\n  <pre>");
  __sb.append(__escape(HTML_STRING.toString()), false);
  __sb.append("</pre>\n</div>\n\n<div>\n  This is the rendered HTML:\n  ");
  __sb.append(HTML_STRING.toString(), false);
  __sb.append("\n</div>\n");
  return __sb.string;
}
export default render;
