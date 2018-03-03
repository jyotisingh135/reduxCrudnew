import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addUser, addValues, fetchCity, fetchState, updateUser} from "../../actions/useraction";
import * as action from '../../actions/useraction';
let language=[];
class FormModal extends Component{
    constructor(){
        super();
        this.state={
            file:''
        }
    }

    handleSubmit=(e)=>{
        //e.preventDefault();
        console.log(e.target.innerText);
        console.log('profile Image',this.props.Obj.profileimage)
        var formData=new FormData();
        formData.append('name',this.props.Obj.name);
        formData.append('age',this.props.Obj.age);
        formData.append('gender',this.props.Obj.gender);
        formData.append('state',this.props.Obj.state);
        formData.append('city',this.props.Obj.city);
        formData.append('language',this.props.Obj.language);
        formData.append('email',this.props.Obj.email);
        formData.append('profileimage',this.props.Obj.profileimage);
        if(e.target.innerText==='Submit')
        {
            this.props.addUser(formData);

        }
        else
        {
            console.log(this.props.Obj.name);
            this.props.updateUser(formData,this.props.Obj.id);
        }
    }
    handleClear=()=>{
        var valobj={
            'name':'',
            'age':'',
            'gender':'',
            'state':'',
            'city':'',
            'language':[],
            'email':''

        }
        this.props.addValues(valobj);
    }
    handleName=(e)=>{
        var valobj={
            'id':this.props.Obj.id,
            'name':e.target.value,
            'age':this.props.Obj.age,
            'gender':this.props.Obj.gender,
            'state':this.props.Obj.state,
            'city':this.props.Obj.city,
            'language':this.props.Obj.language,
            'email':this.props.Obj.email,
            'profileimage':this.props.Obj.profileimage,
            'isEdit':this.props.Obj.isEdit

        }
        this.props.addValues(valobj);
    }
    handleAge=(e)=>{
        var valobj={
            'id':this.props.Obj.id,
            'name':this.props.Obj.name,
            'age':e.target.value,
            'gender':this.props.Obj.gender,
            'state':this.props.Obj.state,
            'city':this.props.Obj.city,
            'language':this.props.Obj.language,
            'email':this.props.Obj.email,
            'profileimage':this.props.Obj.profileimage,
            'isEdit':this.props.Obj.isEdit
        }
        this.props.addValues(valobj);
    }
    handleGender=(e)=>{
        var gen='';
        if(e.target.id==='female'){
            gen='female'
        }
        else
        {
            gen='male'
        }
        console.log('gender',gen);
        console.log('gender',e.target.id);
        var valobj={
            'id':this.props.Obj.id,
            'name':this.props.Obj.name,
            'age':this.props.Obj.age,
            'gender':gen,
            'state':this.props.Obj.state,
            'city':this.props.Obj.city,
            'language':this.props.Obj.language,
            'email':this.props.Obj.email,
            'profileimage':this.props.Obj.profileimage,
            'isEdit':this.props.Obj.isEdit
        }
        this.props.addValues(valobj);
    }
    handleState=(e)=>{

        this.props.fetchCity(e.target.selectedOptions[0].id);

        var valobj={
            'id':this.props.Obj.id,
            'name':this.props.Obj.name,
            'age':this.props.Obj.age,
            'gender':this.props.Obj.gender,
            'state':e.target.selectedOptions[0].innerText,
            'city':this.props.Obj.city,
            'language':this.props.Obj.language,
            'email':this.props.Obj.email,
            'profileimage':this.props.Obj.profileimage,
            'isEdit':this.props.Obj.isEdit
        }
        this.props.addValues(valobj);
    }
    handleCity=(e)=>{
        var valobj={
            'id':this.props.Obj.id,
            'name':this.props.Obj.name,
            'age':this.props.Obj.age,
            'gender':this.props.Obj.gender,
            'state':this.props.Obj.state,
            'city':e.target.selectedOptions[0].innerText,
            'language':this.props.Obj.language,
            'email':this.props.Obj.email,
            'profileimage':this.props.Obj.profileimage,
            'isEdit':this.props.Obj.isEdit
        }
        this.props.addValues(valobj);
    }
    handleLanguage=(e,language)=>{
        if(e.target.checked){
            language.push(e.target.id);
        }
        var valobj={
            'id':this.props.Obj.id,
            'name':this.props.Obj.name,
            'age':this.props.Obj.age,
            'gender':this.props.Obj.gender,
            'state':this.props.Obj.state,
            'city':this.props.Obj.city,
            'language':language,
            'email':this.props.Obj.email,
            'profileimage':this.props.Obj.profileimage,
            'isEdit':this.props.Obj.isEdit
        }
        console.log(language);
        this.props.addValues(valobj);
    }
    handleEmail=(e)=>{
        var valobj={
            'id':this.props.Obj.id,
            'name':this.props.Obj.name,
            'age':this.props.Obj.age,
            'gender':this.props.Obj.gender,
            'state':this.props.Obj.state,
            'city':this.props.Obj.city,
            'language':this.props.Obj.language,
            'profileimage':this.props.Obj.profileimage,
            'email':e.target.value,
            'isEdit':this.props.Obj.isEdit
        }
        this.props.addValues(valobj);
    }
    handleFileChange=(e)=>{
    this.setState({
        file:e.target.files[0]

    },()=>{
        var valobj={
            'id':this.props.Obj.id,
            'name':this.props.Obj.name,
            'age':this.props.Obj.age,
            'gender':this.props.Obj.gender,
            'state':this.props.Obj.state,
            'city':this.props.Obj.city,
            'language':this.props.Obj.language,
            'email':this.props.Obj.email,
            'profileimage':this.state.file,
            'isEdit':this.props.Obj.isEdit}
        this.props.addValues(valobj);
    })

       // e.preventDefault();

        // let imgurl='';
        // let pic;
        // let reader=new FileReader();
        // let file=e.target.files[0];
        // reader.onloadend=function(){
        //     pic=file;
        //     imgurl=reader.result;
        //     var valobj={
        //         'id':this.props.Obj.id,
        //         'name':this.props.Obj.name,
        //         'age':this.props.Obj.age,
        //         'gender':this.props.Obj.gender,
        //         'state':this.props.Obj.state,
        //         'city':this.props.Obj.city,
        //         'language':this.props.Obj.language,
        //         'email':this.props.Obj.email,
        //         'profileimage':imgurl,

        //     }
        //     this.props.addValues(valobj);
        //     //console.log('image url',imgurl);
        // }.bind(this);
       // reader.readAsDataURL(file)
        // let reader = new FileReader();
        // let file = e.target.files[0];
        // reader.onloadend = () => {
        //     this.setState({
        //         pic: file,
        //         imagePreviewUrl: reader.result
        //     })
        // }
        // reader.readAsDataURL(file)

    }
    render(){
        console.log('first time data');
        console.log('isEdit state',this.props.Obj.isEdit);
        return(
            <div className='modal fade' id='formModal'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <div><h3>Information data</h3></div>
                            <button data-dismiss='modal' onClick={this.handleClear}>&times;</button>
                        </div>
                        <div className='modal-body'>

                            <form className='container-fluid' encType='multipart/form-data'>
                                <div>
                                    <input type='text'  className='form-control' placeholder='Name'  onChange={this.handleName} value={this.props.Obj.name} />
                                </div>
                                <br/>
                                <div>
                                    <input type='text'  className='form-control' placeholder='Age'  onChange={this.handleAge} value={this.props.Obj.age} />
                                </div>
                                <br/>
                                <div> Gender
                                    <section>
                                        <input type='radio' name='gender' className='form-control' id='female' onChange={this.handleGender} checked={this.props.Obj.gender==='female'?true:false} />female
                                        <input type='radio' name='gender' className='form-control'  id='male' onChange={this.handleGender} checked={this.props.Obj.gender==='male'?true:false} />male
                                    </section>
                                </div>
                                <br/>
                                <div>
                                    <select className='form-control'  onChange={this.handleState} >
                                        <option>{this.props.Obj.isEdit?this.props.Obj.state:'-----select-----'}</option>
                                        {
                                            this.props.stateData.map((v)=>{
                                                return <option id={v._id}>{v.statename}</option>
                                            })
                                        }

                                    </select>
                                </div>
                                <br/>
                                <div>
                                    <select className='form-control'  onChange={this.handleCity}>
                                        <option>{this.props.Obj.isEdit?this.props.Obj.city:'-----select-----'}</option>
                                        {
                                            this.props.city.map((v)=>{
                                                return <option id={v._id}>{v.cityname}</option>
                                            })
                                        }


                                    </select>
                                </div>
                                <div>
                                    Languages

                                    <section>
                                        <input type='checkbox' id='Hindi' onChange={(e)=>this.handleLanguage(e,language)}
                                               checked={this.props.Obj.language!==undefined?(this.props.Obj.language.indexOf('Hindi')!==-1?true:false):false}  />Hindi
                                        <input type='checkbox' id='English' onChange={(e)=>this.handleLanguage(e,language)}
                                               checked={this.props.Obj.language!==undefined?(this.props.Obj.language.indexOf('English')!==-1?true:false):false} />English
                                        <input type='checkbox' id='Gujarati' onChange={(e)=>this.handleLanguage(e,language)}
                                               checked={this.props.Obj.language!==undefined?(this.props.Obj.language.indexOf('Gujarati')!==-1?true:false):false} />Gujarati
                                        <input type='checkbox' id='Marathi' onChange={(e)=>this.handleLanguage(e,language)}
                                               checked={this.props.Obj.language!==undefined?(this.props.Obj.language.indexOf('Marathi')!==-1?true:false):false} />Marathi
                                    </section>
                                </div>
                                <br/>
                                <div>
                                    <input type='text' placeholder='Email'  className='form-control' onChange={this.handleEmail}  value={this.props.Obj.email} />
                                </div>
                                <br/>
                                <div><input type='file' className='form-control' onChange={this.handleFileChange}/> </div>
                                <div>
                                    <button onClick={this.handleSubmit
                                        // e.preventDefault();
                                        // console.log(this.props.Obj);
                                        // this.props.addUser(this.props.Obj)
                                        // this.handleClear();

                                    }
                                            className='btn btn-primary'>{this.props.Obj.isEdit===undefined?'Submit':'Update'}</button>
                                </div>
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-danger' data-dismiss='modal' onClick={this.handleClear}>close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        stateData:state.stateData,
        city:state.cityData,
        Obj:state.vals
    }

}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
            addUser:addUser,
            fetchState:fetchState,
            fetchCity:fetchCity,
            addValues:addValues,
        updateUser:updateUser
        },
        dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(FormModal);