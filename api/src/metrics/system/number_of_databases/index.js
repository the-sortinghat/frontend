export default function numberOfDatabases(modules) {
  return modules.reduce(
    (acc, { numberOfDatabases }) => acc + numberOfDatabases,
    0
  )
}
