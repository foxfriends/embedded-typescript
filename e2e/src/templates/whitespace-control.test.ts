import render from "./whitespace-control.ets";

describe("whitespace-control", () => {
  it("renders expected output", () => {
    const input = { users: [{ name: "Tate" }, { name: "Emily" }] };
    expect(render(input)).toMatchInlineSnapshot(`
      "This is some text.
      This text will be on the next line.
      This is on yet another next line.

      This is some text. This text will be on the same line as that. This is still on the same line.

      This is some text.
      This text will be on the next line.
      This is on yet another next line.

      This is some text. This text will be on the same line as that. This is still on the same line."
    `);
  });
});
