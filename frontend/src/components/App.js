//import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import ContactList from './ContactList.js';
import {useState} from "react";
import AddContact from './AddContact.js'
import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Mailer } from './Mailer';
function App() {
  const[contacts,setcontact]=useState([]);
  const[warning,setWarning]=useState("");
  console.log(contacts);
  useEffect(() => {
    updateContact();},[]);
  const updateContact= async()=>
  {
     let updated= await fetch('http://localhost:5000/list',{
      method:'get'
     });
    updated= await updated.json();
    setcontact(updated);
  }
  const dbadd=async (newitem)=>
  {
    const reqobj={Name:newitem.Name,Email:newitem.Email};
    console.log("dbadd "+ newitem.Email +" "+newitem.Name);
  //   const result=await fetch('http://localhost:5000/add',{
  //     method:'post',
  //     body:JSON.stringify(reqobj),
  //     headers :{
  //       'Content -Type':'application/json'
  //     }
  // })
  const result=await axios.post('http://localhost:5000/add',reqobj);
   console.log(result);
   updateContact();
  }
  async function addItem(newitem)//newitem contains name and contact.
  {
    
    const response=await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=29bbc10399484bda86fc9adf2254393f&email=${newitem.Email}`);
    if(response.data.deliverability=="DELIVERABLE"){
           dbadd(newitem);
    }
    else
      {
          setWarning("The email id does not exist!!!");
      }
  }

  async function deleteNote(id) {
      
   
     console.log("id to send" + id);
     const response= await axios.get(`http://localhost:5000/delete/${id}`);
     updateContact();
  }
  return (
    <Router>
        <Routes>
       <Route exact path="/" element={ <div className="App">
      <Header
      name="shivansh" />
      <AddContact        // addcontact componenet would be send OnAdd function which can be used to change the value of contacts list
       onAdd={addItem}
       />
       <div id="warning" style={{color:'red'}}>{warning}</div>
       <h2 className='ch'>Contacts</h2>
       <div className='fulllist'>
       {contacts.map((contact, index) => {
        return (
          <ContactList
            key={index}
            id={contact._id}
            name={contact.Name}
            email={contact.Email}
            onDelete={deleteNote}
          />
        )})}
        </div>
        </div>} />  
     
        </Routes>
        <Routes>
       <Route exact path="/mail/:id" element={<Mailer/>} />
       </Routes>
       

    </Router>
        
  );
}

export default App;
