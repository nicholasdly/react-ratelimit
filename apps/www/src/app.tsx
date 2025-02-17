import { add } from "@repo/math/add";

export default function App() {
  const x = add(1, 2);

  return <main>{x}</main>;
}
