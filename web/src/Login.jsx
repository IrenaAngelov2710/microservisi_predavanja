import React, { useEffect, useState } from 'react';
import ProtectedRoute from './ProtectedRoute';

function Login() {
  //1. We will create initial object
  const initData = {
    email: '',
    password: '',
  };

  //2.Ќе ги зачуваме податоците што ќе ги испратиме на нашето апи во јуссејт
  const [data, setData] = useState(initData);

  //3. Kje kreirame stejt koj kje proveruvame dali sme logirani ili ne
  const [loggedIn, setLoggedIn] = useState(false);

  //4. So ovaa funkcija kje gi sledime promenite vo formata
  const dataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //5. Imame funkcija login koja normalno e asihrona
  const login = async () => {
    try {
      let res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });
      let prevorenJsonVoObjekt = await res.json();

      if (res.ok) {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('token', prevorenJsonVoObjekt.token);
      }
      alert(prevorenJsonVoObjekt.status);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(loggedIn) === 'true';
    setLoggedIn(isLoggedIn);
  }, []);

  const logout = () => {
    setLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('token');
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <ProtectedRoute />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login Form</h2>
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
            <br />
          </label>
          <br />
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;