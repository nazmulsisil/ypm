export const truncate = (str: string, num?: number) => {
  if (num === undefined || str.length <= num) {
    return str
  }

  return str.slice(0, num) + '...'
}
