import { getRequest } from '@/api/type'

export const getTodoList = () =>  getRequest('/lists.json')