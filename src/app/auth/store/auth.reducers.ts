import {AuthActions, LOGOUT, SIGNIN, SIGNUP} from './auth.actions';

export interface AuthState {
    token: string;
    authenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    authenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SIGNUP:
        case SIGNIN:
            return {
                ...state,
                authenticated: true
            };
        case LOGOUT:
            return {
                ...state,
                authenticated: false
            };
        default:
            return state;
    }
}
