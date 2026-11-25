import { sortAgentsByName, sortAgentsByNameKeepingPinned } from '../agentSort';

const nameOf = (agent: { name: string }) => agent.name;

describe('sortAgentsByName', () => {
  it('sorts without case or accents and leaves an empty name last', () => {
    const sorted = sortAgentsByName(
      [{ name: 'Zèbre' }, { name: '' }, { name: 'école 10' }, { name: 'Ecole 2' }],
      nameOf,
    );
    expect(sorted.map((agent) => agent.name)).toEqual(['Ecole 2', 'école 10', 'Zèbre', '']);
  });
});

describe('sortAgentsByNameKeepingPinned', () => {
  it('keeps a pinned agent in its slot and sorts the others around it', () => {
    const agents = [
      { id: 'z', name: 'Zèbre' },
      { id: 'm', name: 'Mouton' },
      { id: 'a', name: 'Abeille' },
      { id: 'b', name: 'Bison' },
    ];
    const sorted = sortAgentsByNameKeepingPinned(
      agents,
      nameOf,
      (agent) => agent.id === 'z' || agent.id === 'b',
    );
    expect(sorted.map((agent) => agent.id)).toEqual(['z', 'a', 'm', 'b']);
  });
});
