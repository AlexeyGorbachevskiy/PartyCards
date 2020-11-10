import {applyMiddleware, combineReducers, createStore} from 'redux';
import {loginReducer} from "./loginReducer";
import {authReducer} from "./authReducer";
import {registerReducer} from "./registerReducer";
import {passwordRestoreReducer} from "./passwordRestoreReducer";
import {newPasswordReducer} from "./newPasswordReducer";
import {profileReducer} from "./profileReducer";
import thunk from "redux-thunk";
import appReducer from "./appReducer";
import {packsReducer} from "./packsReducer";
import {cardsReducer} from "./cardsReducer";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    login: loginReducer,
    register: registerReducer,
    passwordRestore: passwordRestoreReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
})


export type AppRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

