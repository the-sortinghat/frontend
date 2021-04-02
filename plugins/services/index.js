import getSystemData from './system'
import getModuleData from './module'
import getServiceData from './service'

export default (_, inject) => {
  inject('getSystemData', (id) => getSystemData(id))
  inject('getModuleData', (id) => getModuleData(id))
  inject('getServiceData', (id) => getServiceData(id))
}
