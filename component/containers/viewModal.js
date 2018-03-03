import React,{Component} from 'react';
import {connect} from 'react-redux';

class ViewModal extends Component{

    render(){
        console.log(this.props.user);
        return(
            <div className='modal fade' id='viewModal'>
                <div className='modal-dialog modal-lg bg-light'>
                    <div className='modal-content'>
                        <div className='modal-header bg-info'>
                            <h2>User Details</h2>
                            <button className='btn btn-danger' data-dismiss='modal'>&times;</button>
                        </div>
                        <div className='modal-body'>
                            <div className='container-fluid'>
                                <div>Name:<label>{this.props.user.name}</label><img src={'http://localhost:3000/upload/'+this.props.user.profileimage} width='200px' height='200px' className='float-right'/></div><br/>
                                <div>Age:<label>{this.props.user.age}</label></div><br/>
                                <div>State:<label>{this.props.user.state}</label></div><br/>
                                <div>City:<label>{this.props.user.city}</label></div><br/>
                                <div>languages Known:<label>{this.props.user.language}</label></div><br/>
                                <div>Email:<label>{this.props.user.email}</label></div><br/>
                            </div>
                        </div>
                    <div className='modal-footer'>

                    </div>
                    </div>
                </div>
            </div>
        );

    }
}
function mapStateToProps(state){
    return{
    user:state.activeUser}

}
export default connect(mapStateToProps)(ViewModal);