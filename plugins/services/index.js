import getSystemData from './system'
import getModuleData from './module'

export default (_, inject) => {
  inject('getSystemData', (id) => getSystemData(id))
  inject('getModuleData', (id) => getModuleData(id))
}
