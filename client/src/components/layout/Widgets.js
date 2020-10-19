import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../css/Widgets.css";

function Widgets() {
  return (
    <div className='widgets'>
      <div className='widgets__input'>
        <SearchIcon className='widgets__searchIcon' />
        <input placeholder='Search Phoro...' type='text' />
      </div>
      <div className='widgets__widgetContainer'>
        <h2>Trends for you</h2>
      </div>
    </div>
  );
}

export default Widgets;
