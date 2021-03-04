import React, {useState} from 'react';
import actions from '../api'

function Login(props) {
    let[login, setLogin] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        // axios.post(`http://localhost:5000/api/login`, {login})
        actions.addPosts(login)
        .then(newPost => {
            console.log('new post!', newPost)
            //Redirect here
            console.log(props)
            props.history.push(`strings`)
        })
        .catch(console.error)
    }

    const handleChange = (e) => {
        setLogin(e.target.value)
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