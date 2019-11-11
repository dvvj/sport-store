const isPromise = payload =>
  (typeof(payload) === "object" || typeof(payload) === "function")
    && typeof(payload.then) === "function";

export const asyncActions = () => (next) => (action) => {
  console.log('action: ', action);
  if (isPromise(action.payload)) {
    action.payload.then(result => next({...action, payload: result}));
  } else {
    next(action);
  }
}