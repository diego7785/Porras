import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '', 
            name: '',
            email: '',
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
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json())
        .then(data => {
            if(data.bool){
                alert(data.data);
            } else {
                alert(data.error);
            }
        })
       
    }

    handleClick(e){
        this.props.history.push('/');
    }

    render(){
        return(
            <>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input type="text" id="id" placeholder="ID" value={this.state.id} onChange={(e) => this.handleChange(e)}/>
                <input type="text" id="name" placeholder="Name" value={this.state.name} onChange={(e) => this.handleChange(e)}/>
                <input type="email" id="email" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange(e)}/>
                <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                <input type="submit" value="Register" onClick={(e) => this.handleSubmit(e)}/>
            </form>
            <Link to="/">Login</Link>
            </>
        )
    }
}

export default Register;