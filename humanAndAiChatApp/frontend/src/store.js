import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './features/chats/services/chat.slice'

export const store = configureStore({
    reducer:{
        // auth : "",
        chat : chatReducer
        
    }
})