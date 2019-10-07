declare namespace jasmine {
  interface Matchers<T> {
    toEqualViewModel(expected: Record<string, string[]>): boolean;
  }
}
