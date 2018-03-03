export const fetchUser=()=> {
    return function(dispatch){
        return fetch('http://localhost:3000/getdata').then((response)=>{

            response.json().then((res)=>{
                //console.log(res);
                dispatch ({type:'FETCH_USER',res});
            })


    });}}
    export const addUser=(user)=>{
        return function(dispatch){
            return fetch('http://localhost:3000/newdata',{
                method:'POST',
                body:user
            }).then((response)=>{
                response.json().then((res)=>{
                    dispatch({type:'ADD_USER',res})
                })
            })
        }}
        export const deleteUser=(id)=>{
            return function(dispatch){
                return fetch(`http://localhost:3000/delete/${id}`,{
                    method:'PUT'
                }).then((response)=>{
                    response.json().then((res)=>{
                        console.log(res._id);
                        dispatch({type:'DELETE_USER',res})
                    })
                })
            }
}
export const editUser=(user)=>{
    return {type:'EDIT_USER',user};



}
export const updateUser=(user,id)=> {
    return function (dispatch) {
        console.log(user);
        return fetch(`http://localhost:3000/edit/${id}`, {
            method: 'PUT',
            body:user
        }).then((response) => {
            response.json().then((res) => {
                console.log(res);

                dispatch({type: 'UPDATE_USER', res})
            })
        })

    }
}



export const fetchState=()=>{
    return function(dispatch){
        return fetch(`http://localhost:3000/getstate`).then((response)=>{
            response.json().then((res)=>{
                dispatch({type:'FETCH_STATE',res})
            })
        })
    }
}
export const fetchCity=(sid)=>{
    return function(dispatch){
        return fetch(`http://localhost:3000/getcity/${sid}`).then((response)=>{
            response.json().then((res)=>{
                console.log(res);
                dispatch({type:'FETCH_CITY',res})
            })
        })
    }
}
export const addValues=(obj)=>{
    return ((dispatch,getState) =>{
        let user = getState().obj
        dispatch({type:'ADD_VALUES',payload:{...user,obj}})
    })
}
export const loginValues=(Obj)=>{
    return ((dispatch,getState)=>{
        let loginUser=getState().Obj
        console.log(loginUser);
        dispatch({type:'ADD_LOGIN_VALUES',Obj});
    })
}
export const pageAction=(pnum,limit)=>{
    console.log('from action',pnum,limit);
    return function(dispatch){
                dispatch({type:'PAGING',payload:{'pagenum':pnum,'limit':limit}})
            }
}
export const sortAction=(sortArr)=>{
    return(
        {type:'SORTING',payload:sortArr})

}
export const userLogout=()=>{
    return({type:'USER_LOGOUT',payload:{'msg':'logout'}})

}
export const loginAction=(username,password)=>{
    return function(dispatch){
        console.log('username',username,password);
        debugger;
        return fetch('http://localhost:3000/login',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:{'username':username,'password':password}
        }).then((response)=>{


                response.json().then((res)=>{
                    debugger;
                    console.log('from user action',response);
                    dispatch({type:'USER_LOGIN',payload:response.data});
                })


            debugger;
        });
    }
}
export const deleteMultipleUser=(delset)=>{
    return function(dispatch){
        console.log('set data',delset);
        return fetch(`http://localhost:3000/deletemulti`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(delset)
        }).then((response)=>{
            response.json().then(()=>{
               // console.log(res._id);
                dispatch({type:'DELETE_MULTI_USER',delset})
            })
        })
    }
}
// function compare(a,b) {
//     if (a.last_nom < b.last_nom)
//         return -1;
//     if (a.last_nom > b.last_nom)
//         return 1;
//     return 0;
// }
//
// objs.sort(compare);
// export const addFirstName=(obj)=>{
//     return ((dispatch,getState) =>{
//         let user = getState().obj
//         dispatch({type:'ADD_FIRSTNAME',payload:{...user,obj}})
//     })
// }
    // var data;
    // fetch('http://localhost:3000/student').then((response)=>{
    //     response.json().then((res)=>{
    //         data=res;
    //     })
    // })
    // return {
    //     type: 'FETCH_USER',
    //     payload:data
    //
    // }

// export function fetchUsers(){
//
//     return function(dispatch){
//         axios.get('http://reqres.in/api/users?page=1')
//             .then((response) =>{
//                 dispatch({type:'FETCH_USERS_FULFILLED', payload:response.data.data});
//             })
//             .catch((err) => {
//                 dispatch({type:'FETCH_USERS_REJECTED',payload:err})
//             })
//     }
// }