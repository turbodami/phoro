import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import SearchIcon from "@material-ui/icons/Search";
import "../css/Widgets.css";

function Widgets({ auth: { isAuthenticated, loading }, logout }) {
  const authWidgets = (
    <div className='widgets__widgetContainer'>
      <button onClick={logout}>Logout</button>
      <h2>Trends for you</h2>
    </div>
  );

  const guestWidgets = (
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
      {!loading && (
        <Fragment>{isAuthenticated ? authWidgets : guestWidgets}</Fragment>
      )}
    </div>
  );
}

Widgets.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Widgets);
