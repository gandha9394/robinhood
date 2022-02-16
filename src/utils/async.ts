/**
 *This is a  drop-in replacement of the utils.promisify from the
 * standard `utils` package which works for all functions that have N-arity
 * except for nullaries :/
 * @param functionThatTakesCallback
 * @returns functionThatGivesAPromise
 */

export function promisifyNullary(
  functionThatTakesCallback: (
    cb: (...args: Array<unknown>) => unknown
  ) => unknown
): () => Promise<unknown> {
  return function () {
    return new Promise((res, rej) => {
      functionThatTakesCallback(rej);
    });
  };
}
