import './ContactList.css';
import Details from "./Details";
import { Mailer } from './Mailer';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
function ContactList(props)
{const navigate = useNavigate();

    function handledelete()
    {
        props.onDelete(props.id);
    }
    const handleMail =()=>
     {
          const id=props.id;
         navigate(`./mail/:${id}`);
     }
        console.log(props);
        return (
            <div className='bodycontact'>
            <div className="card">
              <div className="top">
                <h2 className="name">{props.name}</h2>
              </div>
              <div className="bottom">
                <Details detailInfo={props.email}/>
              </div>
              <button  className="button-24" onClick={handledelete}>Delete</button>
              |   |
              <button  className="button-24" onClick={handleMail}>Mail</button>
            </div>
            </div>
          );
}
export default ContactList;