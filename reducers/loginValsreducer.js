export default function(state={},action){
    switch(action.type) {
        case 'ADD_LOGIN_VALUES':
            console.log('login data',action.Obj);
            return action.Obj;
            break;
    }
    return state;
}
