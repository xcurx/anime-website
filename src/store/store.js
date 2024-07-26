import { configureStore } from "@reduxjs/toolkit"
import loader from './loaderSlice'

const store = configureStore({
    reducer:{loader}
})

export default store