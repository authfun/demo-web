import request from '@/utils/request'

export function getTenantList() {
  return request({
    url: '/api/tenants',
    method: 'get'
  })
}

export function addTenant(form) {
  return request({
    url: '/api/tenants',
    method: 'post',
    data: form
  })
}

export function updateTenant(id, form) {
  return request({
    url: `/api/tenants/${id}`,
    method: 'put',
    data: form
  })
}

export function delTenant(id) {
  return request({
    url: `/api/tenants/${id}`,
    method: 'delete'
  })
}
