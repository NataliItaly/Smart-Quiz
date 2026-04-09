/**
 * pass random instead of using Math.random directly to make the function manageable and testable.
 */
export function shuffleArray<T> (arr: T[], random = Math.random): T[]  {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
