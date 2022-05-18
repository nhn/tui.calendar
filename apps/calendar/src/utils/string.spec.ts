import { capitalize } from '@src/utils/string';

it('should return capitalized string if all character is lower case', () => {
  // Given
  const str = 'abc';

  // When
  const result = capitalize(str);

  // Then
  expect(result).toBe('Abc');
});

it('should return same string if given string is already capitalized', () => {
  // Given
  const str = 'Abc';

  // When
  const result = capitalize(str);

  // Then
  expect(result).toBe(str);
});
