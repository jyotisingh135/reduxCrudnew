import React,{Component} from 'react';
import UserList from './containers/user-list';
import UserDetail from './containers/user-detail';
import Login from './containers/login';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
class Master extends Component{
    render(){
        return(
            <Router>
                <section>
                <Links/>
                    <Route path='/register' component={UserList}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/userlist' component={UserList}/>

                </section>
            </Router>

        );
    }
}
const Links=()=>{
    return(
    <div className='navbar bg-dark'>
        <section>
        <NavLink to='/register'>Register</NavLink>
        <NavLink  data-target='#loginForm' data-toogle='modal' to='/login'>Login</NavLink>
        <NavLink to='/userlist'>UserList</NavLink>
        </section>
    </div>)

}
export default Master;