import axios from "axios";
/*eslint-disable*/
export const baseURL = 'http://localhost:5025/api/v1/'

/**
 * Tạo request
 * Author: MDLONG(16/11/2022)
 */
const request = axios.create({
    baseURL: baseURL
})
/**
 * Gọi get api
 * Author: MDLONG(16/11/2022)
 * @param {string} path
 * @param {Object} options
 */
export const get = async (path, options = {}) => {
    try{
        const response = await request.get(path, options);
        return response.data;
    }catch(error){
        return error.response
    }
}

/**
 * Gọi post api
 * Author: MDLONG(16/11/2022)
 * @param {string} path
 * @param {Object} options
 */
export const post = async (path, options = {}) => {
    try {
        const response = await request.post(path, options);
        return response;
    } catch (error) {
        return error.response
    }
}

/**
 * Gọi put api
 * Author: MDLONG(16/11/2022)
 * @param {string} path
 * @param {Object} options
 */
export const put = async (path, options = {}) => {
    try {
        const response = await request.put(path, options);
        return response;
    } catch (error) {
        return error.response
    }
}

/**
 * Gọi delete api
 * Author: MDLONG(16/11/2022)
 * @param {string} path
 * @param {Object} options
 */
export const del = async (path, options = {}) => {
    try {
        const response = await request.delete(path, options);
        return response;
    } catch (error) {
        return error.response
    }
}

export default request;