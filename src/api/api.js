import request from '@/utils/request'

export function getApiList() {
  return request({
    url: '/api/apis',
    method: 'get'
  })
}

export function addApi(form) {
  return request({
    url: '/api/apis',
    method: 'post',
    data: form
  })
}

export function updateApi(id, form) {
  return request({
    url: `/api/apis/${id}`,
    method: 'put',
    data: form
  })
}

export function delApi(id) {
  return request({
    url: `/api/apis/${id}`,
    method: 'delete'
  })
}
