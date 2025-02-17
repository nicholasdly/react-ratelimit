import { add } from "@repo/math/add";

export default function App() {
  const x = add(1, 2);

  return <main className="text-2xl font-semibold">{x}</main>;
}
