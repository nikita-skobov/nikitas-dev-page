export function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export const has = Object.prototype.hasOwnProperty
