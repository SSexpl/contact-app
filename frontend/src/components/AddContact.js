import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AddContact(props)
{
    const[val,setInput]=useState({
        Name:"",
        Email:""
    });
    function handleChange(event)
    {
         console.log(val);
        const{name,value}=event.target;
        console.log(name);
        
        setInput(prevState=>
            {
              if(name=="Name")
              return{
                Name:value,
               Email:prevState.Email,
              
              };
              else
              {
                return{
                  Name:prevState.Name,
                  Email:value
                };
              }
                        
            });
          
    }
    return(
        <div>
        <label>Enter your name:
          <input 
            type="text" 
            name="Name"
            value={val.Name}
            onChange={handleChange}
          />
        </label>
        <label>Enter your email:
          <input 
            type="email" 
            name="Email"
            value={val.Email}
            onChange={handleChange}
          />
        </label>
      <button onClick={()=>
        {props.onAdd(val)
        setInput( prevState => ({
          Name:"",
          Email:""
        }));}      
        }>AddContact</button>
      </div>
    )
}
export default AddContact;