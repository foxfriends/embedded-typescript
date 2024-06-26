# Embedded TypeScript

> Type safe TypeScript templates

<a href="https://www.npmjs.com/package/@foxfriends/embedded-typescript">
  <img src="https://img.shields.io/npm/v/@foxfriends/embedded-typescript.svg">
</a>

<a href="https://github.com/foxfriends/embedded-typescript/blob/master/LICENSE">
  <img src="https://img.shields.io/npm/l/embedded-typescript.svg">
</a>

## What is this? 🧐

A type safe templating system for TypeScript. Templates are compiled to TypeScript files that you then import for type safe string generation.

This templating system draws inspiration from ERB, [EJS](https://ejs.co/), [handlebars](https://handlebarsjs.com/) and [mustache](https://github.com/janl/mustache.js). This project embraces the "just JavaScript" spirit of `ejs` and adds some of the helpful white space semantics of `mustache`.

Checkout the [examples](#examples-) or [play with embedded-typescript in your browser](https://codesandbox.io/s/ets-playground-9mzk8).

## Installation & Usage 📦

1. Add this package to your project:

   `npm install @foxfriends/embedded-typescript` or `yarn add @foxfriends/embedded-typescript`

## Motivation

`Hello undefined!`

When using a typed language, I want my templates to be type checked. For most cases,
[template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
work well, but template literals quickly become difficult to maintain as the template complexity grows.
I can switch to [EJS](https://ejs.co/), [handlebars](https://handlebarsjs.com/), [mustache](https://github.com/janl/mustache.js),
etc, but then I lose the type safety I had with template literals. Sometimes I want the expressiveness of a templating language
without losing type safety. For those cases, I wrote `embedded-typescript`.

## Syntax

| Syntax                | Name              | Description                                                                                                                                            |
| --------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--- CODE ---`        | Header            | Defines code that should live outside of the generated render function. Use this to define `Props` and any `import`s, `export`s or constants.          |
| `<%= EXPRESSION %>`   | Expression        | Inserts the value of an expression. This value is escaped according to the detected file type mode.                                                    |
| `<%~ EXPRESSION %>`   | RawExpression     | Inserts the value of an expression.                                                                                                                    |
| `<%\| EXPRESSION %>`  | PreserveIndent    | Inserts the escaped value of an expression. If the expression generates multiple lines, the indentation level is preserved across all resulting lines. |
| `<%~\| EXPRESSION %>` | RawPreserveIndent | Inserts the value of an expression. If the expression generates multiple lines, the indentation level is preserved across all resulting lines.         |
| `<% CODE %>`          | Statement         | Executes code, but does not insert a value.                                                                                                            |
| `<>`                  | Glue              | Glues this line and the next one together by deleting exactly 1 following `\n` character.                                                              |
| `TEXT`                | Text              | Text literals are inserted as is. All white space is preserved.                                                                                        |

## Examples 🚀

#### Minimal

1. Write a template file: `my-template.ets`:

```typescript
---
interface Props {
  users: {
    name: string;
  }[]
}
---
<% for (const user of props.users) { %><>
Name: <%= user.name %>
<% } %><>
```

2. Run the compiler: `npx ets`. This will compile any files with the `.ets` extension. `my-template.ets.ts` will be generated.

3. Import the generated `.ets.ts` file wherever you'd like to render your template:

```typescript
import render from "./my-template.ets";

/* will output:
Name: Alice
Name: Bob
*/

console.log(render({ users: [{ name: "Alice" }, { name: "Bob" }] }));
```

Note that the arguments to your template function are type checked. You define the arguments to your template function by defining a `type` or `interface` named `Props`.

#### Partials

Embedded TypeScript preserves the indentation wherever an `expression` tag (`<%= EXPRESSION %>`) is used. This means there isn't any special syntax for partials, and `ets` templates nest as you would expect.

1. Write a "partial" `user-partial.ets`:

```typescript
---
interface Props {
  name: string;
  email: string;
  phone: string;
}
---
Name: <%= props.user.name %>
Email: <%= props.user.email %>
Phone: <%= props.user.phone %>
```

Note there is nothing special about `user-partial.ets`, it's just an `ets` template. We're using the `-partial` suffix purely for illustration.

2. Import your "partial" into another `ets` template `my-template-2.ets`:

```typescript
---
import renderUser, { Props as User } from './user-partial.ets';

interface Props {
  users: User[];
}

const example =
`1
2
3
4`;
---
<% if (props.users.length > 0) { %><>
Here is a list of users:

  <% for (const user of props.users) { %><>
  <%| renderUser(user) %>
  <% } %><>

<% } %><>
The indentation level may be preserved for the rendered 'partial'.

There isn't anything special about the 'partial'. Here we used another `.ets` template, but any
expression yeilding a multiline string would be treated the same.

  <%| example %>

The end!
```

3. Run the compiler: `npx ets`.

4. Import the generated `my-template-2.ets.ts` file wherever you'd like to render your template:

```typescript
import render from "./my-template-2.ets";

/* will output:
Here is a list of users:

  Name: Tate
  Email: tate@tate.com
  Phone: 888-888-8888

  Name: Emily
  Email: emily@emily.com
  Phone: 777-777-7777

The indentation level is preserved for the rendered 'partial'.

There isn't anything special about the 'partial'. Here we used another `ets` template, but any
expression yielding a multi-line string would be treated the same.

  1
  2
  3
  4

The end!
*/

console.log(
  render({
    users: [
      { name: "Tate", phone: "888-888-8888", email: "tate@tate.com" },
      { name: "Emily", phone: "777-777-7777", email: "emily@emily.com" },
    ],
  })
);
```

Note that indentation was preserved for all lines rendered by `user-partial.ets` and all lines of the `example` variable due to the use of the `<%|` interpolation. Any expression yielding a multi-line string rendered inside an `expresssion` block (`<%| EXPRESSION %>`) will apply the indentation across each line.

#### More Examples

For more examples, take a look at the [e2e directory](https://github.com/foxfriends/embedded-typescript/blob/main/e2e). The `*.ets.ts` files are generated by the compiler from the `*.ets` template files. The corresponding `*${NAME}.test.ts` shows example usage and output.

## Async partials

In order to use `async`/`await` in a partial, the file extension must be `.async.ets`. The resulting template function that is generated will be an `async` function respectively, and will need to be `await`-ed when used.

## HTML mode

When the file extension is `.html.ets` (or `.html.async.ets` or `.async.html.ets`), the template is considered in HTML mode. The only change is to the behaviour of `<%=` and `<%|` interpolations: special characters in such interpolated strings will be HTML-escaped.

If you need to output those characters un-changed (e.g. because you're embedding a partial into another partial), use `<%~` or `<%~|`.

## Understanding Error Messages

The compiler will output errors when it encounters invalid syntax:

```
error: Unexpected closing tag '%>'
   --> ./template-1.ets:4:41
    |
4   | <% users.forEach(function(user) { %>%>
    |                                     ^
    |                                     |
...
```

The first line is a description of the error that was encountered.

The second line is location of the error, in `path:line:column` notation.

The next 5 lines provide visual context for the error.

## Highlights

🎁 Zero run time dependencies

## Configuration 🛠

Embedded TypeScript aims to be zero config, but can be configured by creating an `ets.config.mjs` (or `.js` or `.cjs`) file in your project root.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>source</td>
<td>
  The root directory. `.ets` files will be searched under this directory. Embedded TypeScript will recursively search all subdirectories for `.ets` files.

Defaults to the project root.

Example:

Search for `.ets` files under a directory named `src`

    // ets.config.mjs

    ```js
    /** @type {import('ets').Config} */
    export default {
      source: "src",
    };
    ```

</td>
<td>string (filepath)</td>
</tr>
</tbody>
</table>

## Contributing 👫

PR's and issues welcomed! For more guidance check out [CONTRIBUTING.md](https://github.com/foxfriends/embedded-typescript/blob/master/CONTRIBUTING.md)

## Licensing 📃

See the project's [MIT License](https://github.com/foxfriends/embedded-typescript/blob/master/LICENSE).
