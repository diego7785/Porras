import React, { Component } from 'react';
import Login from '../components/Login';

class Home extends Component {

    componentDidMount(){
        if(localStorage.getItem('token') != null){
            console.log(JSON.parse(localStorage.getItem('data')));
            console.log(JSON.parse(localStorage.getItem('token')).token);
        }
    }

    handleLogout(e){
        localStorage.clear();
        window.location.reload();
    }

    render() {
        return(
            <>
                {
                    localStorage.getItem('token') === null ? 
                    <Login/>
                    :
                    <>
                        <h1>Ya estas logeado {JSON.parse(localStorage.getItem('data'))[0].name}</h1>
                        <input type="button" value="Logout" onClick={(e) => this.handleLogout(e)}/>
                    </>
                }
            </>
        )
    }
}

export default Home;