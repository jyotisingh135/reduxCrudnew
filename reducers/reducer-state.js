export default function(state=[],action){
    switch(action.type){
        case 'FETCH_STATE':
            return action.res;
            break;
    }
    return state;
}