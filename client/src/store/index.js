import { configureStore } from '@reduxjs/toolkit'

import authReducer from './loginedUser'


export default configureStore({
    reducer: {
        auth: authReducer,
    }
})