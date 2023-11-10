export default function ellipsis(text: string, max: number) {
  if (text.length <= max) return text;
  return text.substring(0, max - 3).concat("...");
}
