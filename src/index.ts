export default function commonHash(input: any, val = 0): number {
  if (
    input instanceof Function ||
    input instanceof Date ||
    input instanceof RegExp ||
    input instanceof String ||
    !(input instanceof Object))
  {
    return hash(String(input), val) // Use String() not .toString() for cases where input is null / undefined
  }

  if (input[Symbol.iterator]) {
    // Add a prefix to the hash before hashing each item, so that the hash of [item] !== item
    val = hash('#', val)
    for (const item of input) {
      val = commonHash(item, val)
    }
  } else if (input instanceof Object) {
    val = commonHash(Object.entries(input).sort(compareEntries), val)
  }

  return val
}

function compareEntries(a : [string, unknown], b : [string, unknown]) {
  return a[0] < b[0] ? -1 : 1
}

function hash(input: string, val = 0) {
  for (let i = 0, l = input.length; i < l; i++) {
    const char = input.charCodeAt(i)
    val = Math.imul(31, val) - val + char | 0
  }
  return val
}

// const t = performance.now()
// const val = commonHash(() => 'bob')
// console.log(performance.now() - t, val, new Uint32Array([val])[0])

