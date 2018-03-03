import _ from 'lodash';
export default function(state={},action){
    switch(action.type){
        case 'USER_LOGIN':
            debugger;
            console.log('login _user');
            console.log('reducer',action.payload);
            debugger;
            return action.payload;
            break;
        case 'USER_LOGOUT':
            console.log('reducer',action.payload);
            return action.payload;
            break;
    }
    return state;
}