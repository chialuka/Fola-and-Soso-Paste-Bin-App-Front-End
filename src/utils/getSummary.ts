export function getSummary(text: string): string {
  return text.split(' ').slice(0,6).join(' ') + '...';
}
