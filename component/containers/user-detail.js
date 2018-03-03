import React,{Component} from 'react';
import {connect} from 'react-redux';
class UserDetail extends Component{
    render(){
        if(this.props.user===undefined){
            return(<div>select a user...</div>)
        }
        return(
            <div>
               Name: {this.props.user.name}
               <hr/>
               Age:{this.props.user.age}
               <hr/>
               state:{this.props.user.state}

               <hr/>
               city:{this.props.user.city}
            </div>
        );
    }
};
function mapStateToProps(state){
    return{
        user:state.activeUser
    }
};
export default connect(mapStateToProps)(UserDetail);