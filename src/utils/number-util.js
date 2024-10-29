export function calculateTotalCountByObject(gradeCounts) {
  return Object.values(gradeCounts).reduce((total, count) => total + count, 0);
}

export function calculateTotalCountByFilterObject(filterCounts) {
  console.log("calculateTotalCountByFilterObject :", filterCounts);
  return Object.values(filterCounts.sortGrade).reduce(
    (total, count) => total + count,
    0
  );
}
