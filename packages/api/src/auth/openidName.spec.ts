import { resolveOpenIDName } from './openid';

const claims = { name: 'Ada Lovelace', given_name: 'Ada', family_name: 'Lovelace' };

describe('resolveOpenIDName', () => {
  it('fills an empty name from the name claim', () => {
    expect(
      resolveOpenIDName({ stored: '  ', email: 'ada@example.com', username: 'ada', claims }),
    ).toBe('Ada Lovelace');
  });

  it('replaces a stored email, ignoring case', () => {
    expect(
      resolveOpenIDName({
        stored: 'Ada@Example.com',
        email: 'ada@example.com',
        username: 'ada',
        claims,
      }),
    ).toBe('Ada Lovelace');
  });

  it('replaces a stored username', () => {
    expect(
      resolveOpenIDName({
        stored: 'ada',
        email: 'ada@example.com',
        username: 'ADA',
        claims,
      }),
    ).toBe('Ada Lovelace');
  });

  it('keeps a name that is already a display name', () => {
    expect(
      resolveOpenIDName({
        stored: 'A. Lovelace',
        email: 'ada@example.com',
        username: 'ada',
        claims: { name: 'Someone Else', given_name: 'Someone', family_name: 'Else' },
      }),
    ).toBe('A. Lovelace');
  });

  it('uses the given and family names when the name claim is an email', () => {
    expect(
      resolveOpenIDName({
        stored: 'ada@example.com',
        email: 'ada@example.com',
        username: 'ada',
        claims: { name: 'ada@example.com', given_name: 'Ada', family_name: 'Lovelace' },
        fallback: 'ada@example.com',
      }),
    ).toBe('Ada Lovelace');
  });

  it('uses the fallback when the claims carry no display name', () => {
    expect(
      resolveOpenIDName({
        stored: null,
        email: 'ada@example.com',
        username: 'ada',
        claims: {},
        fallback: 'ada@example.com',
      }),
    ).toBe('ada@example.com');
  });
});
