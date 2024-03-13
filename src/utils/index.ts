export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const checkArrayForNullOrUndefined = (arr: (any | null | undefined)[]): boolean => {
  return arr.length > 0 && arr.every(item => item !== null && item !== undefined);
}
