// COVERSEAL: tri alphabétique — nom vide en dernier, sans casse ni accents.
export function compareAgentNames(aName?: string | null, bName?: string | null): number {
  const left = aName ?? ''; // COVERSEAL: tri alphabétique
  const right = bName ?? ''; // COVERSEAL: tri alphabétique
  if (left === '' && right === '') {
    return 0; // COVERSEAL: tri alphabétique
  }
  if (left === '') {
    return 1; // COVERSEAL: tri alphabétique
  }
  if (right === '') {
    return -1; // COVERSEAL: tri alphabétique
  }
  return left.localeCompare(right, 'fr', {
    sensitivity: 'base', // COVERSEAL: tri alphabétique
    numeric: true, // COVERSEAL: tri alphabétique
  });
}

/** Copy sorted by display name. Search filters keep this order. */
export function sortAgentsByName<T>(
  agents: readonly T[],
  nameOf: (agent: T) => string | null | undefined,
): T[] {
  // COVERSEAL: tri alphabétique
  return [...agents].sort((a, b) => compareAgentNames(nameOf(a), nameOf(b)));
}

/**
 * A pin keeps the slot it already has. The other agents are sorted into the
 * remaining slots, so the alphabetical run does not absorb a pinned row.
 */
export function sortAgentsByNameKeepingPinned<T>(
  agents: readonly T[],
  nameOf: (agent: T) => string | null | undefined,
  isPinned: (agent: T) => boolean,
): T[] {
  const loose = agents.filter((agent) => !isPinned(agent)); // COVERSEAL: tri alphabétique
  const sorted = sortAgentsByName(loose, nameOf); // COVERSEAL: tri alphabétique
  let next = 0; // COVERSEAL: tri alphabétique
  // COVERSEAL: tri alphabétique
  return agents.map((agent) => (isPinned(agent) ? agent : sorted[next++]));
}
