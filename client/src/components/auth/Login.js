import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

function Login({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          placeholder='email'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
          required
        />
        <input type='submit' value='Login' />
      </form>
    </Fragment>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateTopProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateTopProps, { login })(Login);
