import React from "react";
import SidebarOption from "./SidebarOption";
import "../css/Sidebar.css";

function Sidebar() {
  return (
    <div className='sidebar'>
      <h2 className='sidebar__phoroIcon'>🏟phoro</h2>
      <SidebarOption active title='Home' icon='🏠' />
      <SidebarOption title='Explore' icon='🔍' />
      <SidebarOption title='Profile' icon='👨🏿‍🦰' />
    </div>
  );
}

export default Sidebar;
