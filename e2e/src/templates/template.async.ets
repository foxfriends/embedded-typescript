---
interface Props {
  promise: Promise<string>;
};
---
The promise resolves to: <%= await props.promise %>.
