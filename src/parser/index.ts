function isPresent(idx: number): boolean {
  return idx !== -1;
}

export type Node =
  | HeaderNode
  | TextNode
  | ExpressionNode
  | StatementNode
  | GlueNode;
export type HeaderNode = {
  type: "header";
  content: string;
};

export type TextNode = {
  type: "text";
  content: string;
};

export type ExpressionNode = {
  type: "expression";
  preserveIndent: boolean;
  content: string;
};

export type StatementNode = {
  type: "statement";
  content: string;
};

export type GlueNode = { type: "glue" };

interface Range {
  line: number;
  column: number;
}

export interface ParseError {
  error: string;
  position: {
    start: Range;
    end: Range;
  };
  context: string;
}

const SYMBOLS = {
  Header: "---\n",
  Open: "<%",
  Close: "%>",
  Expression: "=",
  PreserveIndent: "|",
  Glue: "<>",
};

function isExpression(token: string): boolean {
  return token.startsWith(SYMBOLS.Expression);
}

function isPreserveIndentExpression(token: string): boolean {
  return token.startsWith(SYMBOLS.PreserveIndent);
}

function stripModifierToken(token: string): string {
  let stripped = token;
  if (isExpression(token) || isPreserveIndentExpression(token)) {
    stripped = stripped.slice(1);
  }
  return stripped;
}

export function isParseError(
  parsed: unknown | ParseError
): parsed is ParseError {
  return typeof parsed === "object" && parsed != null && "error" in parsed;
}

interface Position {
  line: number;
  column: number;
}

function lineAndColumn(template: string, index: number): Position {
  const lines = template.slice(0, index).split("\n");
  const line = lines.length;
  const column = (lines.pop()?.length ?? 0) + 1;

  return {
    line,
    column,
  };
}

function formatContext(template: string, position: Position): string {
  const templateLines = template.split("\n").length - 1;
  const hasMoreLines = templateLines > position.line;
  const line = template.split("\n")[position.line - 1];
  return `    |
${position.line.toString().padEnd(4, " ")}| ${line}
    | ${"^".padStart(position.column, " ")}
    | ${"|".padStart(position.column, " ")}
${hasMoreLines ? "..." : ""}
`;
}

function parseError({
  error,
  template,
  startIndex,
  endIndex,
}: {
  error: string;
  template: string;
  startIndex: number;
  endIndex: number;
}): ParseError {
  const start = lineAndColumn(template, startIndex);
  const end = lineAndColumn(template, endIndex);

  return {
    error,
    position: {
      start,
      end,
    },
    context: formatContext(template, start),
  };
}

export function parse(template: string): Node[] | ParseError {
  const parsed: Node[] = [];
  let position = 0;

  // header
  header: {
    const headerStartIndex = template.indexOf(SYMBOLS.Header, 0);
    if (!isPresent(headerStartIndex)) {
      parsed.push({ type: "header", content: "" });
      break header;
    }
    const headerEndIndex = template.indexOf(
      SYMBOLS.Header,
      headerStartIndex + SYMBOLS.Header.length
    );
    if (!isPresent(headerEndIndex)) {
      return parseError({
        error: `Expected to find corresponding close to 'Header' ('${SYMBOLS.Header}') before end of template`,
        template,
        startIndex: headerStartIndex,
        endIndex: template.length - 1,
      });
    }
    const contentBeforeHeader = template.slice(0, headerStartIndex);
    const nonWhiteSpaceIndex = contentBeforeHeader.search(/\S/);
    if (isPresent(nonWhiteSpaceIndex)) {
      return parseError({
        error: `Unexpected token before 'Header' ('${SYMBOLS.Header}')`,
        template,
        startIndex: nonWhiteSpaceIndex,
        endIndex: headerStartIndex,
      });
    }
    parsed.push({
      type: "header",
      content: template.slice(
        headerStartIndex + SYMBOLS.Header.length,
        headerEndIndex
      ),
    });
    position = headerEndIndex + SYMBOLS.Header.length;
  }

  // body
  while (position < template.length) {
    const openIndex = template.indexOf(SYMBOLS.Open, position);
    const closeIndex = template.indexOf(SYMBOLS.Close, position);
    const glueIndex = template.indexOf(SYMBOLS.Glue, position);

    if (
      isPresent(glueIndex) &&
      (!isPresent(openIndex) || glueIndex < openIndex)
    ) {
      // text before open tag
      const text = template.slice(position, glueIndex);
      if (text.length) {
        parsed.push({ type: "text", content: text });
      }
      parsed.push({ type: "glue" });
      position = glueIndex + SYMBOLS.Glue.length;
      continue;
    }

    if (!isPresent(openIndex) && !isPresent(closeIndex)) {
      parsed.push({
        type: "text",
        content: template.slice(position, template.length),
      });
      break;
    }

    if (
      (!isPresent(openIndex) && isPresent(closeIndex)) ||
      (isPresent(openIndex) && isPresent(closeIndex) && closeIndex < openIndex)
    ) {
      return parseError({
        error: `Unexpected closing tag '${SYMBOLS.Close}'`,
        template,
        startIndex: closeIndex,
        endIndex: closeIndex + SYMBOLS.Close.length - 1,
      });
    }

    if (isPresent(openIndex) && !isPresent(closeIndex)) {
      return parseError({
        error: `Expected to find corresponding closing tag '${SYMBOLS.Close}' before end of template`,
        template,
        startIndex: openIndex,
        endIndex: template.length - 1,
      });
    }

    const nextOpenIndex = template.indexOf(
      SYMBOLS.Open,
      openIndex + SYMBOLS.Open.length
    );
    if (isPresent(nextOpenIndex) && nextOpenIndex < closeIndex) {
      return parseError({
        error: `Unexpected opening tag '${SYMBOLS.Open}'`,
        template,
        startIndex: nextOpenIndex,
        endIndex: nextOpenIndex + SYMBOLS.Open.length - 1,
      });
    }

    // text before open tag
    const text = template.slice(position, openIndex);
    if (text.length) {
      parsed.push({ type: "text", content: text });
    }

    const code = template
      .slice(openIndex + SYMBOLS.Open.length, closeIndex)
      .trim();
    if (isExpression(code) || isPreserveIndentExpression(code)) {
      parsed.push({
        type: "expression",
        content: stripModifierToken(code),
        preserveIndent: isPreserveIndentExpression(code),
      });
    } else {
      parsed.push({
        type: "statement",
        content: code,
      });
    }

    position = closeIndex + SYMBOLS.Close.length;
  }

  return parsed;
}
