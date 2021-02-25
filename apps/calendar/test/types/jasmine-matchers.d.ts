declare namespace jasmine {
  interface Matchers<T> {
    toEqualViewModel(expected: Record<string, string[]>): boolean;
    toEqualMatricesTitle(expected: Record<string, any>): boolean;
    toEqualMatricesTop(expected: Record<string, any>): boolean;
  }
}
