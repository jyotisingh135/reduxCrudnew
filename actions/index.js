export const selectUser=(user)=>{
    console.log('selected user',user.name);
    return {
        type: 'USER_SELECTED',
        payload:user

    };
};