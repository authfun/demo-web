import request from '@/utils/request'

export function getMenuList() {
  return request({
    url: '/api/menus',
    method: 'get'
  })
}

export function addMenu(form) {
  return request({
    url: '/api/menus',
    method: 'post',
    data: form
  })
}

export function updateMenu(id, form) {
  return request({
    url: `/api/menus/${id}`,
    method: 'put',
    data: form
  })
}

export function delMenu(id) {
  return request({
    url: `/api/menus/${id}`,
    method: 'delete'
  })
}
