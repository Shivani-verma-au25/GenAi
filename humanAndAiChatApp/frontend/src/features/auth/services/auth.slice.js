import {createSlice} from "@reduxjs/toolkit"


const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        isLoading : false,
        error : null
    },

    reducers :{
        setUser :(state ,action)=>{
            state.user = action.payload;
        },

        setLoading : (state ,action) =>{
            state.isLoading = action.setLoading
        },
        setError : (state,action)=>{
            state.error = action.payload
        }
    }
})


const {setUser , setLoading ,error} = authSlice.actions;
export default authSlice.reducer;