/**
 * Pass the prop to component conditionally.
 * just passing `undefined` violates the ESLint rule, and it's less readable.
 * So let's use this function to pass the conditional prop.
 */
export function passConditionalProp<P>(condition: boolean, prop: P) {
  // eslint-disable-next-line no-undefined
  return condition ? prop : undefined;
}
