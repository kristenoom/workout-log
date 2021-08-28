import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login = (props) => {
    const { updateToken, updateUsername } = props

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [displayFormValidation, setDisplayFormValidation] = useState(false)


    const handleSubmit = e => {
        e.preventDefault()
        
        if(!username || !password){
            setDisplayFormValidation(true)
        } else {
            setDisplayFormValidation(false)
            fetch(`http://localhost:3000/user/login`, {
                    method: 'POST',
                    mode: 'cors', 
                    body: JSON.stringify({user :{username, password}}),
                    headers: new Headers({
                        'Content-type': 'application/json'
                })
            })
            .then(res=>res.json())
            .then(json=>{
                if(!json.user){
                    alert(json.error);
                } else {
                    updateToken(json.sessionToken);
                    updateUsername(json.user.username);
                }
            })
        }
    }
  

    return ( 
    <div>
    <h1>Login</h1>
    <Form onSubmit={handleSubmit}>
    <FormGroup>
    <Label htmlFor="username">Username</Label>
    <Input onChange={e=>setUsername(e.target.value)} name="username" value={username} />
    </FormGroup>
    <FormGroup>
    <Label htmlFor="password">Password</Label>
    <Input onChange={e=>setPassword(e.target.value)} type="password" name="password" value={password} />
    </FormGroup>
    {displayFormValidation ? <p>Please fill out required (*) fields.</p> : <p>***All Fields Required***</p>}

    <Button className="my-3" type="submit">Login</Button>
    </Form>
    </div>
    );
}
 
export default Login;