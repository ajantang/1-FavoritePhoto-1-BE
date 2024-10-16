export function calculateTotalCountByObject(gradeCounts) {
  return Object.values(gradeCounts).reduce((total, count) => total + count, 0);
}
