import Network from './network'
export const getBanner = () => Network.get('/banner?type=2')
