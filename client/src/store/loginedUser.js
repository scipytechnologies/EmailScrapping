import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('authToken') || null,
    isConnected: false,
    firstName: '',
    lastName: '',
    email: ''
};

export const LoginedUserSlice = createSlice({
    name: 'loginedUser',
    initialState,
    reducers: {
        loggeduser : (state,action ) => {
            state.id = action.payload   
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('authToken', action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('authToken');
        },
        isConnected: (state) => {
            state.isConnected = true;
        },
        setUserProfile: (state, action) => {
            const { firstName, lastName, email } = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
        }
    }   
});

// Action creators are generated for each case reducer function
export const { setToken, clearToken, isConnected, loggeduser, setUserProfile } = LoginedUserSlice.actions

export default LoginedUserSlice.reducer