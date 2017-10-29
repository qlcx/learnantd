export default function omit(obj, field) {
  const shallowCopy = { ...obj }
  for (let i = 0; i < field.length; i++) {
    const key = fields[i]
    delete shallowCopy[key]
  }
  return shallowCopy
}