import { createReducer, on } from '@ngrx/store'
import { setUser, setAuthState } from './actions';
import { AuthState } from '../interfaces';

const INITIAL_STATE: AuthState = {
    user: null,
    loggedIn: false
}

const _authReducer = createReducer(
    INITIAL_STATE,
    on(setUser, (state, { payload }) => ({
        ...state,
        user: payload
    })),
    on(setAuthState, (state, { payload }) => ({
        ...state,
        loggedIn: payload
    }))
)

export function AuthReducer(state: AuthState, action: any): AuthState {
    return _authReducer(state, action)
}