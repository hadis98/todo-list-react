import React, { Component } from 'react';
import { TodoBanner } from "./TodoBanner";
import {TodoCreator  } from "./TodoCreator";
import { TodoRow } from "./TodoRow";
import { VisibilityControl } from "./visibilityControl";
// import logo from './logo.svg';
// import './App.css';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state ={
      userName: "hadis",
      todoItems:[{action :"Buy flowers",done:false},{action:"Get shoes" , done:false},
      {action:"Collect Tickets",done:false},
      {action:"Call Joe",done:false}
    ],
    showCompleted:true
    // newItemText:""
    }
  }

  updateNewTextValue = (event)=>{
    this.setState({newItemText:event.target.value});
  }
   
  creatNewTodo = (task) =>{
    if(!this.state.todoItems.find(item => item.action === task )){
      this.setState({todoItems: [...this.state.todoItems,{action :task , done :false}]},
        ()=>localStorage.setItem("todos",JSON.stringify(this.state))
        );
    }
  }
  // creatNewTodo = ()=>{
  //   if(!this.state.todoItems.find(item => item.action === this.state.newItemText)){
  //     this.setState({
  //       todoItems:[...this.state.todoItems,
  //       {action:this.state.newItemText,done:false}],
  //       newItemText:""
  //     });
  //   }
  // }
  toggleTodo = (todo)=>
    this.setState({todoItems:this.state.todoItems.map(item => item.action === todo.action ? {...item,done:!item.done}:item)},
    ()=>localStorage.setItem("todos",JSON.stringify(this.state)));
  
  // todoTableRows = ()=> this.state.todoItems.map(item =>
  // <tr key={item.action}>
  //   <td>{item.action}</td>
  //   <td>
  //     <input type="checkbox" checked={item.done} onChange={()=>this.toggleTodo(item)}>
        
  //     </input>
  //   </td>
  // </tr>)

  todoTableRows = (doneValue)=>this.state.todoItems.filter(item => item.done === doneValue).map(item => <TodoRow key={item.action} item={item} callback={this.toggleTodo} />)
  // todoTableRows =()=> this.state.todoItems.map(item =>
  // <TodoRow key={item.action} item={item}
  // callback={this.toggleTodo} />)

  // changeStateDate =()=>{
    
  //   this.setState({
  //     userName:this.state.userName === "hadis" ? "mohaddeseh" :"hadis"
  //   })
  // }

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null
        ? JSON.parse(data)
        :  {
            userName: "hadis",
            todoItems: [{ action: "Buy Flowers", done: false },
                        { action: "Get Shoes", done: false },
                        { action: "Collect Tickets", done: false },
                        { action: "Call Joe", done: false }],
            showCompleted: true
        });
}

// componentDidMount = ()=>{
//   let data = localStorage.getItem("todos");
//   this.setState(data !=null ? JSON.parse(data) : {
//     userName:"hadis",
//     todoItems:[{action :"Buy flowers",done:false},{action:"Get shoes" , done:false},
//     {action:"Collect Tickets",done:false},
//     {action:"Call Joe",done:false}
//   ],
//   showCompleted:true
//   } )
// }


  render = ()=>
    <div>
      <TodoBanner name={this.state.userName} tasks = {this.state.todoItems} />
      <div className="container-fluid">
        <TodoCreator callback={this.creatNewTodo}/>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody> 
            {this.todoTableRows(false)} </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="completed Tasks" isChecked={this.state.showCompleted} 
            callback={(checked) =>this.setState({showCompleted :checked}) } />
        </div>
        {this.state.showCompleted && 
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {this.todoTableRows(true)}
            </tbody>
          </table>
        }
      </div>
    </div>




//   render(){
//     return(
//       <div>
//         <h4 className="bg-primary text-white text-center p-2"> {this.state.userName} 's TO DO LIST ({this.state.todoItems.filter(t => !t.done).length} items to do)
//         </h4>
//         <div className="container-fluid">
//           <div className="my-1">
//               <input className="form-control" value={this.state.newItemText} onChange={this.updateNewTextValue}/> 
//               <button className="btn btn-primary mt-1" onClick={this.creatNewTodo}>
//                 Add
//               </button>
//           </div>
//           <table className="table table-striped table-borderd">
//             <thead>
//               <tr>
//                 <th>Discription</th>
//                 <th>Done</th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.todoTableRows()}
//             </tbody>
//           </table>
//         </div>
//         {/* <button className="btn btn-primary m-2" onClick={this.changeStateDate}>
//           change
//         </button> */}
//       </div>
//     )
//   }
}

