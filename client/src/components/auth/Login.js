import React, { Fragment, useState } from "react";

function Login() {
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

    console.log("success!");
  };

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

export default Login;
