import {combineReducers, createStore} from 'redux';
import {loginReducer} from "./loginReducer";
import {registerReducer} from "./registerReducer";
import {passwordRestoreReducer} from "./passwordRestoreReducer";
import {newPasswordReducer} from "./newPasswordReducer";
import {profileReducer} from "./profileReducer";


export type AppRootType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    passwordRestore: passwordRestoreReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
})




export const store = createStore(rootReducer);

