import { combineReducers } from "redux";
import user from './user'
import post from './post'

const RootReducer = combineReducers({
    user,
    post,
})

export type RootState = ReturnType<typeof RootReducer>
export default RootReducer;