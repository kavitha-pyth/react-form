import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const intialValues = { username: '', password: '', email: '' };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.username) {
      errors.username = '*username is required';
    }
    if (!values.password) {
      errors.password = '*password is required';
    } else if (values.password.length < 4) {
      errors.password = 'password must be more than 4 charcters';
    } else if (values.password.length > 10) {
      errors.password = "password can't exceed more than 10 characters";
    }
    if (!values.email) {
      errors.email = '*email is required';
    } else if (!regex.test(values.email)) {
      errors.email = 'this is not a valid email format';
    }
    return errors;
  };
  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui messesage sucess">sign in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <div className="ui divider">
          <div className="ui form">
            <div className="field">
              <label>UserName </label>
              <input
                type="text"
                name="username"
                placeholder="Enter a username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <br />

            <div className="field">
              <label>Password </label>
              <input
                type="password"
                name="password"
                placeholder="Enter a password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <br />

            <div className="field">
              <label>Email </label>
              <input
                type="email"
                name="email"
                placeholder="Enter a email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>

            <br />
            <button className="fluid ui button blue">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
