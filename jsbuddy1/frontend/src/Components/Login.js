import React, { useState } from 'react';
import axios from 'axios'

function Login(props) {
    let[login, setLogin] = useState('')

    const handleSubmit = (e) => {
        axios.post()
    }

    const handleChange = (e) => {
        setLogin = e.return.value
    }
    return (
        <div>
            <h2>Victor whats your favorite cake flavor?</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" placeholder="Cake flavor..." />  
                <button>cake</button>        
                 </form>
        </div>
    );
}

export default Login;