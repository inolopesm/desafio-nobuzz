export default function classNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}
