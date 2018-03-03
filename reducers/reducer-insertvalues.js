export default function(state=[],action){
    switch(action.type){
        case 'ADD_VALUES':
            return action.payload.obj;
            break;
    }
    return state;
}