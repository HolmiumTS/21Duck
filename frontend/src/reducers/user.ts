import { IUser, IAction, ActionTypes } from '../types';


let initialState: IUser = new IUser();

export default (state: IUser = initialState, action: IAction): IUser => {
    switch(action.type) {
        case ActionTypes.LOGIN: {
            const {
                userId, nickName, userHead, identity, blocktime, scores, register
            } = action.payload;
            return new IUser(userId, nickName, userHead, identity,
                blocktime, scores, register);
        }
        case ActionTypes.REGISTER: {
            return new IUser();
        }
        case ActionTypes.LOGOUT: {
            return new IUser();
        }
        default:
            return state;
    }
};
