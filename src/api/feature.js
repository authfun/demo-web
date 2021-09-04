import request from '@/utils/request'

export function getFeatureList() {
  return request({
    url: '/api/features',
    method: 'get'
  })
}

export function getDetail(id, implicit) {
  return request({
    url: `/api/features/${id}?implicit=${implicit}`,
    method: 'get'
  })
}
