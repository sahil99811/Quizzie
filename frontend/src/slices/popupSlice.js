import {createSlice} from '@reduxjs/toolkit'
const initialState={
    deletePopup:false,
    createPopup:false
}

const popupSlice=createSlice({
    name:"popup",
    initialState:initialState,
    reducers:{
         setDeletePopup(state,value){
            state.deletePopup=value.payload
         },
         setCreatePopup(state,value){
            state.createPopup=value.payload
         }
    }
});

export const {setDeletePopup,setCreatePopup} = popupSlice.actions;

export default popupSlice.reducer;