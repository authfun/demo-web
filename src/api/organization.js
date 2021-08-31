import request from '@/utils/request'

export function getOrganizationTree(tenantId) {
  return request({
    url: `/api/organizations/tree?tenantId=${tenantId}`,
    method: 'get'
  })
}

export function getDetail(id) {
  return request({
    url: `/api/organizations/${id}`,
    method: 'get'
  })
}

