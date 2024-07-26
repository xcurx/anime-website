import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    progress:0,
}

const loaderSlice = createSlice({
    name:"loader",
    initialState,
    reducers:{
        handleProgress: (state,action) => {
            state.progress = action.payload.progress
            if(state.progress < 100 && Math.ceil(state.progress) == 100){
                state.progress = 100
            }
        }
    }
})

export const {handleProgress, handleSteps} = loaderSlice.actions
export default loaderSlice.reducer 