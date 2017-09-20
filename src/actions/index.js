export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const ADD_TO_CART ='ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const login = (email, token) => {
    return {
        type: 'LOGIN',
        email: email,
        token: token
    };
};
 
export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export const addToCart = (item) => ({
	type : ADD_TO_CART,
	payload : item
})

export const removeFromCart = (id) => ({
	type : REMOVE_FROM_CART,
	payload : id
})