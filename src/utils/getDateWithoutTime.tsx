export default function getDateInSingapore(date: string): string {
  // Adjusts the date to the Singapore timezone and returns it in 'YYYY-MM-DD' string format
  return new Date(date).toLocaleDateString("en-CA", {
    timeZone: "Asia/Singapore",
  });
}
