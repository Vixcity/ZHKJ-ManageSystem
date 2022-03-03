import http from './http.js'
const baseUrl = '/api'
// 登录
const login = (params) => http.post(`${baseUrl}/admin/auth/login`, params, 'application/json')
// token
const getToken = (params) => http.get(`${baseUrl}/upload/token`, params)
// 删除上传文件
const deleteFile = (params) => http.post(`${baseUrl}/file/delete`, params, 'application/json')
// 教程
const tutorial = {
  create: (params) => http.post(`${baseUrl}/admin/system/study/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/admin/system/study/one`, params),
  list: (params) => http.get(`${baseUrl}/admin/system/study/list`, params),
  delete: (params) => http.post(`${baseUrl}/admin/system/study/delete`, params, 'application/json'),
}
const company = {
  create: (params) => http.post(`${baseUrl}/admin/company/init`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/admin/company/list`, params),
  detail: (params) => http.get(`${baseUrl}/admin/company/detail`, params),
  setType: (params) => http.post(`${baseUrl}/admin/edit/category`, params, 'application/json'),
}
const setting = {
  pantong: {
    create: (params) => http.post(`${baseUrl}/admin/company/init`, params, 'application/json'),
    list: (params) => http.get(`${baseUrl}/pan/color/list`, params),
    delete: (params) => http.post(`${baseUrl}/admin/system/study/delete`, params, 'application/json')
  }
}
const message = {
  create: (params) => http.post(`${baseUrl}/system/update/log/save`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/system/update/log/lists`, params),
  detail: (params) => http.get(`${baseUrl}/system/update/log/detail`, params)
}
const categoryType = {
  list: (params) => http.get(`${baseUrl}/admin/category/all`, params),
  create: (params) => http.post(`${baseUrl}/product/category/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/product/category/delete`, params, 'application/json'),
  unitList: (params) => http.get(`${baseUrl}/product/unit/all`, params),
  settingUnit: (params) => http.post(`${baseUrl}/product/unit/save`, params, 'application/json'),
}
// 生产流转码
const productFlowCode = {
  list: (params) => http.get(`${baseUrl}/production/code/list`, params, 'application/json'),
  statistics: (params) => http.get(`${baseUrl}/production/code/total`, params, 'application/json'),
  save: (params) => http.post(`${baseUrl}/production/code/save`, params, 'application/json'),
}
export {
  productFlowCode,
  categoryType,
  message,
  setting,
  company,
  tutorial,
  deleteFile,
  getToken,
  login
}