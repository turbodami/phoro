import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import "../css/Widgets.css";

function Widgets() {
  const isAuthenticated = false;
  const loggedWidgets = (
    <div className='widgets__widgetContainer'>
      <h2>Trends for you</h2>
    </div>
  );

  const publicWidgets = (
    <div className='widgets__publicContainer'>
      <h3>New to Phoro?</h3>
      <p>Sign up now to access our discussion board!</p>

      <Link className='widgets__publicButtons' to='/login'>
        <h4>Sign in</h4>
      </Link>
      <Link className='widgets__publicButtons' to='/register'>
        <h4>Sign up</h4>
      </Link>
    </div>
  );
  return (
    <div className='widgets'>
      <div className='widgets__input'>
        <SearchIcon className='widgets__searchIcon' />
        <input placeholder='Search Phoro...' type='text' />
      </div>
      {isAuthenticated ? loggedWidgets : publicWidgets}
    </div>
  );
}

export default Widgets;
