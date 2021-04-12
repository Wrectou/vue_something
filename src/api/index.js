import { getRequest, putRequest, deleteRequest, postRequest } from '@/api/type'

// 获取所有todos
export const getTodoList = () =>  getRequest('/lists.json')

// 编辑单条todo
export const editTodo = (params) => putRequest(`/lists/${params.dataBaseId}.json`, params)

// 删除单条todo
export const deleteTodo = (params) => deleteRequest(`/lists/${params.dataBaseId}.json`)

// 添加单条todo
export const addTodo = (data) => postRequest('/lists.json', data)