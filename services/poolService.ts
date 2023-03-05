import axios from 'axios';
import {apiUrl} from "../config/config";


export const getPools = async () => {
    try {
        const response = await axios.get(`${apiUrl}/pools`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postPool = async (data: any) => {
    try {
        const response = await axios.post(`${apiUrl}/pools`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
