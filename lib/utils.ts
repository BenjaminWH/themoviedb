export function mergeAndSortByPopularity<T extends { popularity: number }>(
  ...lists: T[][]
): T[] {
  return lists.flat().sort((a, b) => b.popularity - a.popularity);
}
