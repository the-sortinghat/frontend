import getSystemData from './system'
// import {  } from './module;

export default ({ app }, inject) => {
  inject('getSystemData', (id) => getSystemData(id))
}
