import React, { useState } from 'react';

function Register() {
  const initialData = {
    email: '',
    password: '',
    name: '',
  };

  const [data, setData] = useState(initialData);

  const dataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //! Ipsrakjame baranje do nashiot backend server
  //! i nashiot backend server ni prakja odgovor
  //! koj moze da bide pozitiven ili negativen

  const register = async () => {
    try {
      let res = await fetch('/api/v1/auth/create-account', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        alert('User is created');
      }
    } catch (err) {
      console.log(err);
    }
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