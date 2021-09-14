import React, { useState, useEffect } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';


const App = () => {
    const [sessionToken, setSessionToken] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setSessionToken(localStorage.getItem('token'));
        }
    }, []);

    const updateToken = (newToken) => {
        localStorage.setItem('token', newToken);
        setSessionToken(newToken);
        console.log(sessionToken);
    };

    const clearToken = () => {
        localStorage.clear();
        setSessionToken('');
    };

    const protectedViews = () => {
        return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} /> : <Auth updateToken={updateToken}/>)
    }

    // constructor = () => {
    //     super();
    //     this.setToken = (token) => {
    //         localStorage.setItem('token', token);
    //         this.setState({ sessionToken: token });
    //     }
    //     this.state = {
    //         sessionToken: '',
    //         setToken: this.setToken
    //     }
    // }

    // render = () => {
        return (
            <Router>
                <AuthContext.Provider value={this.state}>
                    <div>
                        <Sitebar clickLogout={clearToken} />
                        {protectedViews()}
                        {/* <Auth updateToken={updateToken} /> protectedViews() replaces this code*/}
                    </div>
                </AuthContext.Provider>
            </Router>
        );
    }


export default App;
