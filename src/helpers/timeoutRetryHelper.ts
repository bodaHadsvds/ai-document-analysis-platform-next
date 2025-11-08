
export async function executeWithTimeoutAndRetry<T>(
  fn: () => Promise<T>,
  timeout = 30000,
  retries = 2
): Promise<T> {
  const attempt = async (remainingRetries: number): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Task timed out")), timeout);

      fn()
        .then(resolve)
        .catch(async (err) => {
          if (remainingRetries > 0) {
            console.warn(`Attempt failed. Retries left: ${remainingRetries}. Error:`, err);
            resolve(await attempt(remainingRetries - 1)); 
          } else {
            reject(err); 
          }
        })
        .finally(() => clearTimeout(timer));
    });
  };

  return attempt(retries);
}
