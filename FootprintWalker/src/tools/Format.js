export function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}
