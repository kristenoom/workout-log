import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const Signup = (props) => {
    const { updateToken, updateUsername } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')  
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)
    const [displayFormValidation, setDisplayFormValidation] = useState(false)

    const handleInput = e => {
        setUsername(e.target.value)
    }

    useEffect(() => {
        if(username){
            fetch(`http://localhost:3000/user/userCheck/${username}`)
            .then(res=>res.json())
            .then(json=>{
                if(json.user.length) {
                    setIsUsernameAvailable(false)
                } else {
                    setIsUsernameAvailable(true)
                };
            })
        }
    }, [username]);

    const handleSubmit = e => {
        e.preventDefault()

        if(!username || !password || !isUsernameAvailable){
            setDisplayFormValidation(true)
        } else {
            setDisplayFormValidation(false)
            fetch(`http://localhost:3000/user/register`, {
                method: 'POST',
                mode: 'cors', 
                body: JSON.stringify({user :{username, password}}),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            })
            .then(res=>res.json())
            .then(json=>{
                {
                updateToken(json.sessionToken);
                updateUsername(json.user.username);
                }
            })
        }
    }
  

    return ( 
        <div>
        <h1>Signup</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup >
                <Label htmlFor="username">Username</Label>
                <Input onChange={handleInput} name="username" value={username} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input onChange={e=>setPassword(e.target.value)} type="password" name="password" value={password} />
            </FormGroup>
            {displayFormValidation ? <p>Please fill out required (*) fields.</p> : <p>***All Fields Required***</p>}
            {username === '' ? '' : isUsernameAvailable ? <p>Username is available!</p> : <p style={{color: 'red'}}>That username is already in use.</p>}
            <Button className="my-3" type="submit">Signup</Button>
        </Form>
        </div>
    );
}
 
export default Signup;