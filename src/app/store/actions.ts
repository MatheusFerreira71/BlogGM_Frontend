import { createAction, props } from "@ngrx/store";
import { ReturnedUser } from '../interfaces'

export enum ActionTypes {
    SetUser = 'SetUser',
    SetAuthState = 'SetAuthState'
}

const { SetUser, SetAuthState } = ActionTypes

export const setUser = createAction(SetUser, props<{ payload: ReturnedUser }>())
export const setAuthState = createAction(SetAuthState, props<{ payload: boolean }>());