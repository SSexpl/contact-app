import './header.css';
function Header(props){
return(
       <div className="head">
        <h1>hello {props.name}</h1>
        </div>   
);
}
export default Header;
