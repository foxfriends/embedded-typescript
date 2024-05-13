import render from "./template.async.ets";

describe("template.async", () => {
  it("renders expected output", async () => {
    const input = { promise: Promise.resolve("Hello world") };
    expect(await render(input)).toMatchInlineSnapshot(`
      "The promise resolves to: Hello world.
      "
    `);
  });
});
