import getSystemData from './system'
import getModuleData from './module'
import getServiceData from './service'

export default ({ $axios }, inject) => {
  inject('getSystemData', (id) => getSystemData(id, $axios))
  inject('getModuleData', (id) => getModuleData(id))
  inject('getServiceData', (id) => getServiceData(id))
}
