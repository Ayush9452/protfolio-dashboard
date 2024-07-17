import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: {},
        isAuthenticated: false,
        error: null,
        message: null,
        isUpdated: false
    },
    reducers: {
        loginRequest(state, action) {
            state.loading = true;
            state.user = {};
            state.isAuthenticated = false;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.user = {};
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        loadUserRequest(state, action) {
            state.loading = true;
            state.user = {};
            state.isAuthenticated = false;
            state.error = null;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loadUserFailed(state, action) {
            state.loading = false;
            state.user = {};
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        logoutSuccess(state, action) {
            state.loading = false;
            state.user = {};
            state.isAuthenticated = false;
            state.error = null;
            state.message = action.payload;
        },
        logoutFailed(state, action) {
            state.loading = false;
            state.user = state.user;
            state.isAuthenticated = state.isAuthenticated;
            state.error = action.payload;
        },
        updatePasswordRequest(state, action) {
            state.loading = true;
            state.isUpdated = false;
            state.message =  null;
            state.error = null;
        },
        updatePasswordSuccess(state, action) {
            state.loading = false;
            state.isUpdated = true;
            state.message =  action.payload;
            state.error = null;
        },
        updatePasswordFailed(state, action) {
            state.loading = true;
            state.isUpdated = false;
            state.message =  null;
            state.error = action.payload;
        },
        updateProfileRequest(state, action) {
            state.loading = true;
            state.isUpdated = false;
            state.message =  null;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.isUpdated = true;
            state.message =  action.payload;
            state.error = null;
        },
        updateProfileFailed(state, action) {
            state.loading = true;
            state.isUpdated = false;
            state.message =  null;
            state.error = action.payload;
        },
        updateProfileResetAfterUpdate(state,action){
            state.message = null;
            state.error = null;
            state.isUpdated = false;
        },
        clearAllErrors(state,action){
            state.error = null;
        },
    },
});


export const login = (email, password) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
        const { data } = await axios.post(
            "https://portfolio-backend-e7yq.onrender.com/api/v1/user/login", 
            { email, password }, 
            { withCredentials: true, headers: { "Content-Type": "application/json" }});
            dispatch(userSlice.actions.loginSuccess(data.user));
            dispatch(userSlice.actions.clearAllErrors());
        } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
}

export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.loadUserRequest());
    try {
        const {data} = await axios.get(
            "https://portfolio-backend-e7yq.onrender.com/api/v1/user/me",
            { withCredentials: true });
            dispatch(userSlice.actions.loadUserSuccess(data.user));
            dispatch(userSlice.actions.clearAllErrors());
        } catch (error) {
        dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
    }
}

export const logout = () => async (dispatch) => {
    try {
        const {data} = await axios.get(
            "https://portfolio-backend-e7yq.onrender.com/api/v1/user/logout",
            { withCredentials: true });
            dispatch(userSlice.actions.logoutSuccess(data.message));
            dispatch(userSlice.actions.clearAllErrors());
        } catch (error) {
        dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    }
}

export const updatePassword = (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
        const { data } = await axios.put(
            "https://portfolio-backend-e7yq.onrender.com/api/v1/user/update/password", 
            { currentPassword, newPassword, confirmNewPassword }, 
            { withCredentials: true, headers: { "Content-Type": "application/json" }});
            dispatch(userSlice.actions.updatePasswordSuccess(data.message));
            dispatch(userSlice.actions.clearAllErrors());
        } catch (error) {
        dispatch(userSlice.actions.updatePasswordFailed(error.response.data.message));
    }
}


export const updateProfile = (data) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
        const response = await axios.put(
            "https://portfolio-backend-e7yq.onrender.com/api/v1/user/update/me", 
            data, 
            { withCredentials: true, headers: { "Content-Type": "multipart/form-data" }});
            dispatch(userSlice.actions.updateProfileSuccess(response.data.message));
            dispatch(userSlice.actions.clearAllErrors());
        } catch (error) {
        dispatch(userSlice.actions.updateProfileFailed(error.response.data.message));
    }
}

export const resetProfile = () => (dispatch)=>{
    dispatch(userSlice.actions.updateProfileResetAfterUpdate());
}

export const clearAllUserErrors = () => async (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
}

export default userSlice.reducer;