// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Intl {
  class ListFormat {
    constructor(locales: "pt-BR");
    format(values: string[]): string;
  }
}

const listFormat = new Intl.ListFormat("pt-BR");

export default function formatList(list: string[]) {
  return listFormat.format(list);
}
