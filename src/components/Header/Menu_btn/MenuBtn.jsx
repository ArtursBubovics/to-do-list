import React from 'react';
import { NavLink } from "react-router-dom"
import "./MenuBtn.css"

function MenuBtn(props){
    return(
        <div className="menu_btn">
            <NavLink to={'/' + props.btn_name} activeClassName="active">{props.btn_name}</NavLink> {/*activeClassName="active"  позволяет добавить класс, когда выбранно поле*/}
        </div>
    )
}

export default MenuBtn