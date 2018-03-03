import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../../actions/index';
import FormModal from './modal';
import ViewModal from './viewModal';
import {
    userLogout, addValues, deleteMultipleUser, deleteUser, editUser, loginAction, pageAction,
    sortAction
} from "../../actions/useraction";
import * as action from '../../actions/useraction';
class UserList extends Component{
    constructor(){
        super();
        this.state={
            searchText:'',
            searchArr:[],
            deleteState:true
        }
    }
    handleSearch=(e)=>{
        var s=e.target.value;
        this.setState({
            searchText:e.target.value
        },()=>{
            var tempArr=this.props.user;
            var newArr=[];
            for(var i=0;i<tempArr.length;i++){
                if(this.state.searchText!==''){
                    if(tempArr[i].name.indexOf(this.state.searchText)!==-1){
                        newArr.push(tempArr[i]);
                        this.setState({
                            searchArr:newArr
                        })
                }
            }
            else{
                    this.setState({
                        searchArr:[]
                    })
                }
        }
    })}

    // componentDidMount(){
    //     console.log('component mounted');
    //
    //     console.log(this.props.fetchUser());
    //    // this.props.dispatch.fetchUser();
    //     //console.log('data',data);
    // }
    // componentWillReceiveProps(){
    //     //console.log(this.props.fetchUser());
    //  //y   console.log(this.props.fetchUser());
    // }
    componentWillMount(){

        this.checkBoxSet=new Set();
        var user=sessionStorage.getItem('user');

        console.log('session data',user);
        if(user===null || user===''){
            this.props.history.push('/login');
        }
    }
    handleLogout=()=>{

        sessionStorage.removeItem('user');
        this.props.userLogout();
        console.log(sessionStorage.getItem('user'));
       // this.props.loginAction('','');
        this.props.history.push('/login');

    }
    handleSort=(e)=>{
            console.log(e.target.innerText);
            var fieldname=(e.target.innerText).toLowerCase();
            var sortArr=[...this.props.user];
            sortArr.sort((a,b)=>a[fieldname]>b[fieldname]);
            //console.log('sorted Data',sortArr);
            this.props.sortAction(sortArr);
    }
   editUser=(v)=>{

       //  var formData=new FormData();
       //  formData.append('id',v._id);
       // formData.append('name',v.name);
       // formData.append('age',v.age);
       // formData.append('gender',v.gender);
       // formData.append('state',v.state);
       // formData.append('city',v.city);
       // formData.append('language',v.language.split(","));
       // formData.append('email',v.email);
       // formData.append('profileimage',v.profileimage);
       // formData.append('idEdit',true);


       var valobj={
           'id':v._id,
           'name':v.name,
           'age':v.age,
           'gender':v.gender,
           'state':v.state,
           'city':v.city,
           'language':v.language.split(","),
           'email':v.email,
           'profileimage':v.profileimage,
           'isEdit':true

       }
      // console.log(formData);
       this.props.addValues(valobj);
    }
    handleCheckChange=(e)=>{

        if(this.checkBoxSet.has(e.target.id)){
            this.checkBoxSet.delete(e.target.id);
        }
        else{
            this.checkBoxSet.add(e.target.id);
        }
        console.log(this.checkBoxSet);
        if(this.checkBoxSet.size!==0){
            console.log('has');
            this.setState({
                deleteState:false
            })
        }
        else
        {
            this.setState({
                deleteState:true
            })
        }
    }

    render(){
        console.log("users",this.props.user);
        console.log('from render page ',this.props.page);
        console.log(this.props.page.limit);
        var last=this.props.page.pagenum*this.props.page.limit;
        var start=last-this.props.page.limit;
        var pageArr=[];
        var totalPages=Math.ceil(this.props.user.length/this.props.page.limit);
        for(var i=1;i<=totalPages;i++){
            pageArr.push(i);
        }
        const pages=pageArr.map((v)=>{
            return <a href={'#'} onClick={(e)=>{
                e.preventDefault();
                this.props.pageAction(v,this.props.page.limit);
            }}>{v}</a>
        })

        var currentRec=this.state.searchArr.length!=0?this.state.searchArr.slice(start,last):this.props.user.slice(start,last);
console.log('current record',currentRec);
        return(

            <div>
                <ViewModal/>
                <button className='btn btn-info'  data-target='#formModal' data-toggle='modal'>Add New</button>
                <FormModal/>
                <button className='btn btn-danger float-right' disabled={this.state.deleteState} onClick={()=>{this.props.deleteMultiUser([...this.checkBoxSet])}}>Delete</button>
                <div className='navbar bg-dark'>
                    <select className='form-control col-1' onChange={(e)=>{this.props.pageAction(1,e.target.selectedOptions[0].innerText)}}>

                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                    <input type='text' className='form-control col-2' value={this.state.searchText} placeholder='type here to search....' onChange={this.handleSearch}/>
                    <button className='btn btn-primary' onClick={this.handleLogout}>Logout</button>
                </div>
                <div align='center'>
                <table className='table table-bordered w-75'>
                    <tbody>
                    <tr>
                        <th onClick={this.handleSort}>Name</th>
                        <th onClick={this.handleSort}>age</th>
                        <th onClick={this.handleSort}>state</th>
                        <th onClick={this.handleSort}>city</th>
                        <th onClick={this.handleSort}>language</th>
                        <th onClick={this.handleSort}>email</th>
                        <th>profileImage</th>
                        <th colSpan={2}>Remove/Edit</th>
                        <th></th>
                    </tr>
                    { currentRec.map((v,i)=>{
                        return <tr key={i}>

                        <td data-target='#viewModal' data-toggle='modal' onClick={()=>{this.props.selectUser(v)}}>{v.name} </td>
                        <td data-target='#viewModal' data-toggle='modal' onClick={()=>this.props.selectUser(v)}>{v.age}</td>
                        <td data-target='#viewModal' data-toggle='modal' onClick={()=>this.props.selectUser(v)}>{v.state}</td>
                        <td data-target='#viewModal' data-toggle='modal' onClick={()=>this.props.selectUser(v)}>{v.city}</td>
                            <td data-target='#viewModal' data-toggle='modal' onClick={()=>this.props.selectUser(v)}>{v.language}</td>
                            <td  data-target='#viewModal' data-toggle='modal' onClick={()=>this.props.selectUser(v)}>{v.email}</td>
                            <td data-target='#viewModal' data-toggle='modal' onClick={()=>this.props.selectUser(v)}><img src={'http://localhost:3000/upload/'+v.profileimage} width='50px' height='50px'/></td>
                        <td onClick={()=>this.props.selectUser(v)}>
                        <button className='btn btn-info' id={v._id} onClick={()=>{this.editUser(v)}}  data-target='#formModal' data-toggle='modal'>Edit</button>
                        </td>
                        <td onClick={()=>this.props.selectUser(v)}>
                        <button className='btn btn-danger' id={v._id} onClick={()=>{this.props.deleteUser(v._id)}}>delete</button>
                        </td>
                            <td><input type='checkbox' id={v._id} key={v._id} checked={this.checkBoxSet.has(v._id)?true:false} onChange={this.handleCheckChange}/></td>
                        </tr>

                    })}
                    </tbody>
                </table>
                </div>
                <div align='center'>
                    {pages}
                </div>

            </div>
        );
    }

}

function mapStateToProps(state){
    return{
        user:state.user,
        page:state.page
    }

}
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectUser:selectUser,
        deleteUser:deleteUser,
        editUser:editUser,
        addValues:addValues,
        pageAction:pageAction,
        sortAction:sortAction,
        loginAction:loginAction,
        deleteMultiUser:deleteMultipleUser,
        userLogout:userLogout
        },
        dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(UserList);