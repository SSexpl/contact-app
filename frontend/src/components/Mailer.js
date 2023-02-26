import axios from 'axios';
import { useState } from 'react';
import {useContext} from 'react';
import { useParams } from 'react-router-dom';
import './Mailer.css';
export const Mailer =()=> //id would be picked up from params. present in the url
{
    const { id } = useParams();//we got the id.
    console.log(id);
    const [details,setDetails]=useState({});
    const  send=async ()=> //calls the mailer in node js backend.
    {
      console.log(details);
      const response=await axios.post(`http://localhost:5000/mail/${id}`,details);
    }
    const handleChange = (event) => {
      const { name, value } = event.target;
      setDetails({ ...details, [name]: value });
    };
  

  return (
    <div className="Sender">
        <h1>Hello to send mail</h1>
        <input name="Subject" value={details.Subject} onChange={handleChange} placeholder="Subject"/>
        <br></br>
        <textarea name="Msg" rows="10" cols="40"onChange={handleChange} value={details.Msg}>Write Message here</textarea>
        <br></br>
        <button onClick={send}>Send</button>
    </div>
   
    
    );
}