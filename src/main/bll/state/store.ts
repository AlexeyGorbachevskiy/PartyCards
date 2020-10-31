import {applyMiddleware, combineReducers, createStore} from 'redux';
import {loginReducer} from "./loginReducer";
import {authReducer} from "./authReducer";
import {registerReducer} from "./registerReducer";
import {passwordRestoreReducer} from "./passwordRestoreReducer";
import {newPasswordReducer} from "./newPasswordReducer";
import {profileReducer} from "./profileReducer";
import thunk from "redux-thunk";
import appReducer from "./appReducer";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    login: loginReducer,
    register: registerReducer,
    passwordRestore: passwordRestoreReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
})


export type AppRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

