import * as request from '@/utils/request'

/**
 * Gọi api lấy tất cả bản ghi
 * Author: MDLONG(28/12/2022)
 * 
 * @returns 
 */
export const getAllUser = async () => {
    const res = await request.get('users/')
    return res.data
}
/**
 * Lấy user theo filter
 * Author: MDLONG(01/01/2023)
 * @param {*} pagingRequest 
 * @returns 
 */
export const getUserByFilter = async (pagingRequest) => {
    const res = await request.post('users/filter', {...pagingRequest})
    return res?.data
}

/**
 * Lấy user theo id
 * Author: MDLONG(01/01/2023)
 * @param {*} user 
 * @returns 
 */
export const getUserByID = async (user) => {
    const res = await request.get(`users/${user.UserID}`)
    return res
}

/**
 * Lấy user theo id
 * Author: MDLONG(01/01/2023)
 * @param {*} user 
 * @returns 
 */
export const getNewUserCode = async () => {
    const res = await request.get(`users/newCode`)
    return res
}

/**
 * Thêm mới nhân viên
 * @param {*} users 
 * @returns 
 */
export const addUser = async (users)=>{
    const res = await request.post(`users/`, users)
    return res
}

/**
 * sửa user
 * Author: MDLONG(01/01/2023)
 * @param {*} user 
 * @returns 
 */
export const editUser = async (user)=>{
    const res = await request.put(`users/${user.UserID}`, {...user})
    return res
}

/**
 * Xóa user
 * Author: MDLONG(01/01/2023)
 * @param {*} user 
 * @returns 
 */
export const deleteUser = async (user)=>{
    const res = await request.del(`users/${user.UserID}`)
    return res
}