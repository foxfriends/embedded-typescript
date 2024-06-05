import render from "./template.html.ets";

describe("template.html", () => {
  it("renders expected output", async () => {
    const input = { promise: Promise.resolve("Hello world") };
    expect(await render(input)).toMatchInlineSnapshot(`
      "<div>
        This is the HTML source:
        <pre>&lt;div&gt;Hello World&lt;/div&gt;</pre>
      </div>

      <div>
        This is the rendered HTML:
        <div>Hello World</div>
      </div>
      "
    `);
  });
});
