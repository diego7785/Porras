import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '', 
            password: '',
        }
    }

    handleChange(e){
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

     handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then(res => res.json())
            .then(data => {
                if(data.bool){
                    alert("Usuario registrado");
                    console.log(data.data);
                    console.log(data.token);
                    localStorage.setItem('token', JSON.stringify({token: data.token}));
                    localStorage.setItem('data', JSON.stringify(data.data));
                    window.location.reload();
                } else {
                    alert(data.error);
                }
            })
            .catch(e => console.log(e.message))
    }

    render(){
        return(
            <>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input type="text" id="id" placeholder="ID" value={this.state.id} onChange={(e) => this.handleChange(e)}/>
                <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                <input type="submit" value="Login" onClick={(e) => this.handleSubmit(e)}/>
            </form>
            <Link to="/register">Register</Link>
            </>
        )
    }
}

export default Login;