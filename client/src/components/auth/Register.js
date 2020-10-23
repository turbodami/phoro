import React, { Fragment, useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("password do not match");
    } else {
      console.log("success!");
    }
  };

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          placeholder='name'
          name='name'
          value={name}
          onChange={(e) => onChange(e)}
          required
        />
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
        <input
          type='password'
          placeholder='confirm password'
          name='password2'
          value={password2}
          onChange={(e) => onChange(e)}
          minLength='6'
          required
        />
        <input type='submit' value='Register' />
      </form>
    </Fragment>
  );
}

export default Register;
