const dateTimeFormat = new Intl.DateTimeFormat("pt-BR", {
  timeStyle: "short",
  dateStyle: "short",
});

export default function formatDate(date: Date) {
  return dateTimeFormat.format(date);
}
