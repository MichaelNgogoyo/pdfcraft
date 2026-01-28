type PromiseResolver<T> = (value: T | PromiseLike<T>) => void;
type PromiseRejecter = (reason?: unknown) => void;

export type PromiseWithResolversResult<T = unknown> = {
  promise: Promise<T>;
  resolve: PromiseResolver<T>;
  reject: PromiseRejecter;
};

type PromiseConstructorWithResolvers = typeof Promise & {
  withResolvers?: <T = unknown>() => PromiseWithResolversResult<T>;
};

const PromiseWithResolvers = Promise as PromiseConstructorWithResolvers;

if (typeof PromiseWithResolvers.withResolvers !== 'function') {
  PromiseWithResolvers.withResolvers = function withResolvers<T = unknown>() {
    let resolve!: PromiseResolver<T>;
    let reject!: PromiseRejecter;

    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return { promise, resolve, reject };
  };
}
