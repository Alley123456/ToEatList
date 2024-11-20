export function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function (this: any, ...args: any[]) {
    const context = this;
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
