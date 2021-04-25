export function parseSystemData(system, sysModules, metrics) {
  // parsing data into a valid object
  const { name, description, nonFunctionalRequirements } = system
  const modules = sysModules.modules.map(({ id, name }) => ({ id, name }))
  const links = sysModules.links

  return {
    name,
    description,
    nonFunctionalRequirements,
    modules,
    links,
    metrics,
  }
}
