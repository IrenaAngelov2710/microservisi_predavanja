import React, { useState } from 'react';

function Register() {
  const initData = {
    email: '',
    password: '',
    name: '',
  };

  const [data, setData] = useState(initData);

  const dataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2>Register</h2>
      <label>
        <span>Email</span>
        <br />
        <input
          type='email'
          name='email'
          value={data.email}
          onChange={dataChange}
        />
      </label>
      <br />
      <label>
        <span>Password</span>
        <br />
        <input
          type='password'
          name='password'
          value={data.password}
          onChange={dataChange}
        />
      </label>
      <br />
      <label>
        <span>Full Name</span>
        <br />
        <input
          type='text'
          name='name'
          value={data.name}
          onChange={dataChange}
        />
        <br />
      </label>
      <br />
      <button onClick={register}>Register</button>
    </>
  );
}

export default Register;