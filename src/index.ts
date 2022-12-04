export default function stableHash(input: any, val = 0): number {
  if (
    input instanceof Function ||
    input instanceof Date ||
    input instanceof RegExp ||
    input instanceof String ||
    !(input instanceof Object))
  {
    return hash(String(input), val) // Use String() not .toString() for cases where input is null / undefined
  }

  if (input instanceof Object) {
    input = Object.entries(input).sort(compareEntries)
  }

  if (input[Symbol.iterator]) {
    for (const item of input) {
      val = stableHash(item, val)
    }
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

// const val = stableHash(() => 'bob')
// console.log(val, new Uint32Array([val])[0])

