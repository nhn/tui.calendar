declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualMatricesTitle(expected: Record<string, any>): R;
      toEqualMatricesTop(expected: Record<string, any>): R;
      toEqualViewModelByTitle(expected: Record<string, string[]>): R;
    }
  }
}

export {};
