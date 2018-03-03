export default function(state=[],action){
    switch(action.type){
        case 'FETCH_CITY':
            return action.res;
            break;
    }
    return state;
}