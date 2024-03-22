import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        isAdmin:null,
    },
    reducers:{
        login:(state,action)=>{
            state.userData=action.payload;
           
        },
        getRole:(state,action)=>{
            state.isAdmin=action.payload;
        },
        logout:(state,action)=>{
            state.userData=action.payload;
            state.isAdmin=action.payload;
        }
    }

});
export const {login,logout,getRole}=userSlice.actions;
export default userSlice.reducer;