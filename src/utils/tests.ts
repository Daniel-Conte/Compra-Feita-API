export const toBeTypeOrNull = (received: any, argument: any) => {
  if (received === null) {
    return {
      message: () => `Ok`,
      pass: true,
    };
  } else if (expect(received).toEqual(expect.any(argument)) as any) {
    return {
      message: () => `Ok`,
      pass: true,
    };
  } else {
    return {
      message: () => `expected ${received} to be ${argument} type or null`,
      pass: false,
    };
  }
};
