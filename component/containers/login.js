import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginAction, loginValues} from '../../actions/useraction';
var username='';
var password='';
var message='';
class Login extends Component{

    constructor(){
        super();
        this.state={
            uname:'',
            upass:'',
            isValid:false
        }
    }
    clearControls=()=>{

        this.setState({
            uname:'',
            upass:''
        })

       // this.props.loginValues(Obj);
    }
    handleLogin=(e)=>{
        e.preventDefault();
        console.log(this.state.uname)
        this.props.loginAction(this.state.uname,this.state.upass);
        sessionStorage.setItem('user',this.state.uname);


       // var msg=this.props.loginData;
        //console.log(this.props.loginData);
    }
    handleUsername=(e)=>{
       // this.props.loginValues(Obj);
        if(e.target.value===''){
            this.setState({
                isValid:true
            })
        }
       this.setState({
           uname:e.target.value
       });
        }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.loginData);
        var msg=nextProps.loginData.msg;
         if(msg==='success')
        {
            this.props.history.push('/userlist');


        }
        else if(msg==='fail'){
             message='username or password incorerct..'
                this.clearControls();
         }
         else if(msg==='logout')
         {

             this.clearControls();
         }


    }

    handlePassword=(e)=>{
        // var Obj={
        //     "username":this.props.loginVal.username,
        //     "password":e.target.value
        // }
        // this.props.loginValues(Obj);
       this.setState({
           upass:e.target.value
       })
    }
    render(){
        return(

            <div className='container-fluid w-25 bg-light'>
                <div className='navbar'></div><br/>
                <div className='jumbotron'>
                    <h2>Login</h2>

                </div>
                <form className='bg-light'>
                    <label className='text-danger'>{message}</label><br/>
                    <div>
                        <input type='text' className='form-control' placeholder='username' onChange={this.handleUsername} value={this.state.uname} />
                    </div>
                    <br/>
                    <div>
                        <input type='password' className='form-control'  placeholder='password' onChange={this.handlePassword} value={this.state.upass}/>
                    </div>
                    <br/>
                    <div>
                        <button className='btn btn-info float-right' onClick={this.handleLogin} >LOGIN</button>
                    </div>
                </form>
            </div>

        );


    }
}
function mapStateToProps(state){
    return{
        loginData:state.logindata,
        loginVal:state.loginObj

    }

}
function matchStateToProps(dispatch){
    return bindActionCreators({loginAction:loginAction,loginValues:loginValues},dispatch);
}

export default connect(mapStateToProps,matchStateToProps)(Login);