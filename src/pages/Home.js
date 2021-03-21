import React, { Component } from 'react';
import Login from '../components/Login';

class Home extends Component {
    render() {
        return(
            <>
                {
                    localStorage.getItem('token') === null ? 
                    <Login/>
                    :
                    <h1>Ya estas logeado</h1>
                    
                }
            </>
        )
    }
}

export default Home;