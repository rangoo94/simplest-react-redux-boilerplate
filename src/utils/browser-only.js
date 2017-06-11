export default function browserOnly (f) {
  return (...args) => {
    if (typeof window === 'undefined') {
      return
    }

    return f(...args)
  }
}
