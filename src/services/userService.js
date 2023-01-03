import * as request from '@/utils/request'

/**
 * Gọi api lấy tất cả bản ghi
 * Author: MDLONG(28/12/2022)
 * 
 * @returns 
 */
export const getAllUser = async () => {
    const res = await request.get('users/')
    return res
}