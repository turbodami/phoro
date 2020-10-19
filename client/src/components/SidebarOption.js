import React from 'react';
import './css/SidebarOption.css';

function SidebarOption({ active, title, icon}) {

    return (
        <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
            <h2 className="icon">{icon}</h2>
            <h2 className="title">{title}</h2>
        </div>
    )
}

export default SidebarOption;