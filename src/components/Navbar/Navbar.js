import React, {useState } from "react";
import "./Navbar.scss";
import user from '../../assets/assets_Homework_Front-End_01/shape.png';
import path from '../../assets/assets_Homework_Front-End_02/path.png';
import {AiOutlineMenu} from 'react-icons/ai'
import {Link}from 'react-router-dom'

const Navbar = () => {
    const [, setMenu] = useState(false);
    const [toggle, setToggle] = useState(false);
    return (
        <div className="nav-wrapper">
            <div className="nav-wrap">
                <Link className="nav-item" to="#" >so funktionierts</Link>
                <Link className="nav-item" to="#" >sonderangebote</Link>
                <div className="dropdown" onClick={() => setToggle(!toggle)}>
                    <span><img className='user' src={user} alt="" /></span> mein bereich <span><img className='path' src={path} alt="" /></span>
                    {toggle && (
                        <div className='dropdown-content'>
                            <div className='dropdown-item'>My published jokes <span><img className='path' src={path} alt="" /></span></div>
                            <hr />
                            <div className='dropdown-item'>My saved jokes</div>
                            <hr />
                            <div className='dropdown-item'>Account information</div>
                            <hr />
                            <div className='dropdown-item'>Publish new joke</div>
                        </div>
                    )}
                </div>

            </div>
            <div className='nav-wrap-Mobile'>
                <AiOutlineMenu onClick={()=>setMenu(true)}/>
            </div>
        </div>
    );
}
export default Navbar;