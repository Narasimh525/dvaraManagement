import './App.css';
import React,{Component} from 'react';
import firebase from '../firebaseConnection';
import { Link } from 'react-router-dom';
import deleteimag from '../images/deleteLogo1.png';
import { Grid , Input, Dropdown , Form , Button  , Dimmer, Loader, Image, Segment} from 'semantic-ui-react'
import ReactTable from 'react-table-v6'
import { Events, animateScroll as scroll, scroller } from 'react-scroll';

import 'react-table-v6/react-table.css';
import TopHeader from './TopHeader';

var database3 = firebase.database();


class App extends Component { 
  constructor(){
    super()
    this.state = {
      name1:"",
      mobile1:"",
      name2:"",
      mobile2:"",
      name3:"",
      mobile3:"",
      name4:"",
      mobile4:"",
      name5:"",
      mobile5:"",
      database:"",
      databases:{},
      databasePaths:{},
      showUsers:true,
      userDerails:[],
      dataAdded:false,
      showUsersSelected:false,
      addUserSelected:false,
      databaseOptions:[],
      mobileValidation:false,
      jsonFormatChange:false,
      loader:true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChange1 = this.handleChange1.bind(this)
  }
  componentDidMount = async() =>{
    database3.ref('/').on("value", (snap) => {
      const data = snap.val();
      var initializations={};
      var databases = {};
      var databaseOptions = [];
      var databasePaths={};
      var keys = Object.keys(data);
      keys.forEach(async (item, index, array)=>{
        initializations[item] = firebase.initializeApp(data[item],item);
        databases[item] = firebase.database(initializations[item])
        databaseOptions.push({ key: item, value: item, text: item })
        await databases[item].ref('/').on("value", (snap) => {
          const data = snap.val();
          if(Object.keys(data).includes("Files")){
            if(Object.keys(data["Files"]).includes("restrict_user")){
              databasePaths[item] = 'Files/restrict_user'
              if(item == "EDairy"){
                this.setState({loader:false})
              }
            }
            else{
              databasePaths[item] = 'Files/restrictUser'
            }
            
          }
          else{
            databasePaths[item] = '/restrictUser'
          }
          this.setState({databasePaths:databasePaths})
        })
      })
      this.setState({databaseOptions:databaseOptions,databases:databases})
    })
      
      
  }
  scrollTo() {
    scroller.scrollTo('grid-scroll', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuint'
    })
  }
  handleChange(event){
    let {name , value} = event.target;
    if(name.includes("mobile")){
      this.setState({[name]: value},()=>{

      if(value.length>10 || this.state.mobile1.length>10)
        this.setState({mobileValidation:true})
      else
        this.setState({mobileValidation:false})
        })
      }
    else{
      this.setState({ [name]: value})
    }
  }
  handleChange1 = (e, { name, value }) => 
    {var database=this.state.database;console.log(database);;this.setState({ [name]: value},()=>{if(database) this.displayUsers(false)}) 
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    console.log(this.state);
    if(this.state.name1 && this.state.mobile1 && this.state.database && !this.state.mobileValidation){
      var data ={
        [this.state.name1]: "+91"+this.state.mobile1,
      }
      if(this.state.name2 && this.state.mobile2)  data[this.state.name2]="+91"+this.state.mobile2
      if(this.state.name3 && this.state.mobile3)  data[this.state.name3]="+91"+this.state.mobile3
      if(this.state.name4 && this.state.mobile4)  data[this.state.name4]="+91"+this.state.mobile4
      if(this.state.name5 && this.state.mobile5)  data[this.state.name5]="+91"+this.state.mobile5
      this.state.databases[this.state.database].ref(this.state.databasePaths[this.state.database]).update(data).then(()=>{
        this.setState({dataAdded:true})
        setTimeout(()=>{this.setState({dataAdded:false})},1500)
      });
    }
    else{
      this.setState({addUserSelected:true})
      setTimeout(()=>{this.setState({addUserSelected:false})},1500)
    }
  }
  displayUsers(showUsers){
    if(this.state.database)
    {
      if(showUsers) this.setState({showUsers:!this.state.showUsers})
      var database;
      this.state.databases[this.state.database].ref(this.state.databasePaths[this.state.database]).on("value", (snap) => {
        const restrictUser = snap.val();
        var restrictUserKeys = Object.keys(restrictUser)
        var arr = []
        restrictUserKeys.forEach(item => {
            arr.push({"Name":item,"MobileNumber":restrictUser[item]})
        })
        this.setState({userDerails:arr},()=>{console.log(this.state.userDerails);})
      })
    }
    else{
     
        this.setState({showUsersSelected:true})
        setTimeout(()=>{this.setState({showUsersSelected:false})},1500)
    }
    
  }
  hideUsers(){
    this.setState({showUsers:!this.state.showUsers})
  }
  deleteUsers(name){
      this.state.databases[this.state.database].ref(this.state.databasePaths[this.state.database]).update({
        [name]: null
      });
    
    
  }
  filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
  }
  render(){
    var sortOptions = [
      {
        id: 'Name',
        desc: false
      }
    ]
    var input_array = [1,2,3,4,5];
    var inputs = input_array.map(item=>
          <Form.Group widths='4'>
            <Form.Input
              fluid
              id='form-subcomponent-shorthand-input-first-name'
              label='Name'
              name={"name"+item}
              placeholder='Name'
              onChange={this.handleChange}
            />
            {/* <Form.Input
              fluid
              // type='number'
              pattern="[789][0-9]{9}"
              id='form-subcomponent-shorthand-input-last-name'
              label='Mobile Number'
              placeholder='Mobile Number'
              name={"mobile"+item}
              onChange={this.handleChange}
            /> */}
            <Form.Field>
              <label>Mobile Number</label>
              <Input 
                label='+91' 
                type="number"
                id='form-subcomponent-shorthand-input-last-name'
                placeholder='Mobile Number' 
                name={"mobile"+item}
                onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
      )
      const columns = [
        
        {
          Header: 'Name',
          accessor: 'Name',
          id: 'Name',
          filterable: true,
          headerStyle: {
            background:"#57b8ff",
            textAlign:'center',
            color: '#060806',
            fontSize:'16px',
            fontFamily:"Times, Times New Roman, serif",
            borderRadius: '1px',
            padding: '5px',
            border:'1px solid #133314',
        },
        },
        {
          Header: 'Mobile Number',
          accessor: 'MobileNumber',
          filterople: true,
          headerStyle: {
            background:"#57b8ff",
            textAlign:'center',
            color: '#060806',
            fontSize:'16px',
            fontFamily:"Times, Times New Roman, serif",
            borderRadius: '1px',
            padding: '5px',
            border:'1px solid #133314',
        },
        },
        {
          Header: "Action",
          Cell: ({row}) => (
            // <Button onClick = { () => this.deleteUsers(row.Name)} style = {{height:"10px",width:"10px"}}>
              <img onClick = { () => this.deleteUsers(row.Name)} style = {{height:"20px",width:"20px",cursor:"pointer",marginLeft:"40%"}} src={deleteimag} /> 
            // </Button>
          ),
          headerStyle: {
            background:"#57b8ff",
            textAlign:'center',
            color: '#060806',
            fontSize:'16px',
            fontFamily:"Times, Times New Roman, serif",
            borderRadius: '1px',
            padding: '5px',
            border:'1px solid #133314',
          }
        }
      ];
    return (
      <div style={{backgroundColor:'#eee'}}>
        <TopHeader/>
        {this.state.loader?<Loader style={{marginTop:"1%",marginBottom:'2%'}} active inline='centered' />:
          <div  style={{margin:"1% 0% 2% 40%"}}>
            <Dropdown
              placeholder='Select Database'
              // fluid
              search
              selection
              options={this.state.databaseOptions}
              name="database"
              onChange={this.handleChange1}
            />
          </div>
        }
        <Form style={{marginLeft:"30%"}} onSubmit={this.handleSubmit}>
          {inputs}
          { this.state.mobileValidation ?
            <p style={{marginLeft:"14%",color:"red"}}>Mobile Number is Not Valid</p>
            :null
          }
          { this.state.dataAdded ?
            <p style={{marginLeft:"14%",color:"green"}}>Users added successfully....!</p>
            :null
          }
          { this.state.addUserSelected ?
            <p style={{marginLeft:"14%",color:"red"}}>Please Fill the form....!</p>
            :null
          }
          <Form.Group  widths='equal'>
            <Form.Field 
                style={{marginLeft:"14%",background:"green",color:"white"}}
                id='form-button-control-public'
                control={Button}
                content='Add Users'
              />
          </Form.Group>
        </Form>
        <hr />
        
        <div style={{margin:"1% 0% 2% 40%"}}>
          { this.state.showUsersSelected ?
              <p style={{color:"red"}}>Please Select a Project....!</p>
              :null
          }
          {this.state.showUsers? <Button primary onClick={()=>{this.displayUsers(true)}}>Show Users</Button> : <Button color='teal' onClick={()=>{this.hideUsers()}}>Hide Users</Button>}
        </div>
        <div name = 'grid-scroll'></div> 
        {!this.state.showUsers?
            <Grid className = "app-home">
              <Grid.Row centered columns = {1}  relaxed = "very" stackable style= {{'padding-top': '50px'}} >
                <h3>{this.state.database}</h3>
                <Grid.Column style = {{maxWidth: "50%", background: 'white', }}>

                        <ReactTable 
                        columns = {columns}
                        data = {this.state.userDerails}
                        noDataText = {"No Results ....."}
                        defaultPageSize = {10}
                        sorted = {sortOptions}
                        defaultFilterMethod = {this.filterMethod}
                        rowClassName = {this.setRowCLassName}
                      >

                      </ReactTable>
                </Grid.Column>
              </Grid.Row>
              </Grid>
          :null}

      </div>
    )
    }
  
}
export default App;
