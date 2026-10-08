/** 0..1 progress through the story's scenes. */
export function useSceneProgress(index, total) {
  const progress = total > 1 ? index / (total - 1) : 1;
  return { progress };
}
