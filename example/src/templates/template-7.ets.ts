// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// Source: ./template-7.ets

import { render as renderUser, User } from './user-partial.ets';

const example = 
`1
2
3
4`;

export function render(users: User[]): string {
  return (() => {
  let result = '';
  if (users.length > 0) {
  result += 'Here is a list of users:\n';
  users.forEach(function(user) {
  result += '\n  ';
  result += (function preserveIndentation(text, indentation) {
    return text.toString().split("\n").map((line, idx) => idx === 0 ? line : indentation + line).join("\n");
  })( renderUser(user), '  ');
  result += '\n';
  })
  result += '\n';
  }
  result += 'The indentation level is preserved for the rendered \'partial\'.\n\nThere isn\'t anything special about the \'partial\'. Here we used another ets template, but any\nexpression yeilding a multiline string would be treated the same.\n\n  ';
  result += (function preserveIndentation(text, indentation) {
    return text.toString().split("\n").map((line, idx) => idx === 0 ? line : indentation + line).join("\n");
  })( example, '  ');
  result += '\n\nThe end!';
  return result;
  })()
}
