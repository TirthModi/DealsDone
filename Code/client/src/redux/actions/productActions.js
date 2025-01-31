import axios from "axios";
import * as actionTypes from '../constants/productConstant'

const URL = 'https://dealsdonebackend-2.onrender.com';

export const getProducts = (category) => async (dispatch) => {
    try {
        const query = category ? `?category=${category}` : ''; // Add category filter to URL
        const { data } = await axios.get(`${URL}/products${query}`);
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message });
    }
};



export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const { data }= await axios.get(`${URL}/product/${id}`);
        
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {

        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.message});
    }
};