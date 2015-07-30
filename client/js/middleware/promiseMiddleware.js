// Middleware
export default function promiseMiddleware() {
  return (next) => (action) => {
    const { promise, types, ...rest } = action;
    console.log(action);
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });
    return promise.then(
      (result) => {
        console.log(result);
        next({ ...rest, result, type: SUCCESS })
      },
      (error) => {
        console.log(error);
        next({ ...rest, error, type: FAILURE })
      }
    );
  };
}

// Usage
function doSomethingAsync(userId) {
  return {
    types: [SOMETHING_REQUEST, SOMETHING_SUCCESS, SOMETHING_FAILURE],
    promise: requestSomething(userId),
    userId
  };
}
