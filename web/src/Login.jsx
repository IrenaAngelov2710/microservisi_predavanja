import React, { useEffect, useState } from 'react';
import ProtectedRoute from './ProtectedRoute';

function Login() {
    // Creating initiatal object
    const initData = {
        email: '',
        password: ''
    };

    // Storing data that we are sending to the database
    const [data, setData] = useState(initData);

    // Creating state for checking if we are loged in
    const [loggedIn, setLoggedin] = useState(false);

    // With the upper function we will track the changes in the form
    const dataChange = (e) => {
        setData({
            ...data, 
            [e.target.name]: e.target.value
        })
    };

    // Function login
    const login = async() => {
        try{
            console.log(data);
            let response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": 'application/json',
                }
            });
            // Pretvoren json vo objekt
            let out = await response.json();
            if(response.ok) {
                setLoggedin(true);
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('token', out.token);
            }
        } catch(err) {
            console.log(err);
        }
        alert(out.status); 
        // ova out go zima json objektot sto go vrakja pri login i toj sodrzi status i token
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem(loggedIn) === 'true';
        setLoggedin(isLoggedIn);
    }, []);

    const logout = () => {
        setLoggedin(false);
        localStorage.setItem('loggedin', 'false');
        localStorage.removeItem('token');
    };

    return (
        <>
            {loggedIn ? (
                <>
                <ProtectedRoute/>
                <button onClick={logout}>Logout</button>
                </>
            ) : (
                <div>
                    <h2>Login</h2>
                    <label>
                        <span>Email</span>
                        <br/>
                        <input type='email' 
                            name='email' 
                            value={data.email} 
                            onChange={dataChange}
                        />
                    </label>
                    <br/>
                    <label>
                        <span>Password</span>
                        <br/>
                        <input type='password' 
                            name='password' 
                            value={data.password} 
                            onChange={dataChange} 
                        />
                    </label>
                    <br />
                    <button onClick={login}>Login</button>
                </div>
                )};
        </>
    )
};

export default Login;