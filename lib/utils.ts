export function mergeAndSortByPopularity<T extends { popularity: number }>(
  ...lists: T[][]
): T[] {
  return lists.flat().sort((a, b) => b.popularity - a.popularity);
}

export function formatRuntime(minutes: number | undefined): string | undefined {
  if (!minutes) return undefined;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hours === 0) return `${remaining}m`;
  if (remaining === 0) return `${hours}h`;
  return `${hours}h ${remaining}m`;
}
