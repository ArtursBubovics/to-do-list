import React from 'react';
import './Header.css'
import MenuBtn from './Menu_btn/MenuBtn';

function Header(){
    return (
        <div className='header'>
            <div className='header_container'>
                <div className='logo'>
                    <img src="/img/ornament.png" alt="" />
                </div>
                <div className='menu'>
                    <MenuBtn btn_name='ToDoList'/>
                    <MenuBtn btn_name='Profile'/>
                </div>
                </div>
        </div>
    )
} 

export default Header;