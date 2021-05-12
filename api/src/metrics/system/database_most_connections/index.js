/* eslint-disable camelcase */
export default function databaseWithMostConnections(relashionships, type) {
  const databasesRead = {}

  relashionships.forEach(({ databaseId, access_type }) => {
    const types = access_type
      .toLowerCase()
      .split('and')
      .map((w) => w.trim())

    if (types.includes(type)) {
      if (databasesRead[databaseId]) {
        databasesRead[databaseId] += 1
      } else {
        databasesRead[databaseId] = 1
      }
    }
  })

  const maxValue = Object.values(databasesRead).reduce((max, val) => {
    if (val > max) max = val

    return max
  }, 0)

  const databases = Object.entries(databasesRead)
    .filter((obj) => obj[1] === maxValue)
    .map(
      (obj) =>
        relashionships.find(({ databaseId }) => databaseId === parseInt(obj[0]))
          .namespace
    )

  return `${databases.join(', ')} (${maxValue} connections)`
}
