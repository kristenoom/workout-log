import React from 'react';
import { Container, Row, Col } from 'reactstrap'; //importing all the Bootstrap tools that allow us to use its grid system
import Login from './Login';
import Signup from './Signup';

const Auth = (props) => {
    //below will hold our login and signup forms side by side.
    return (
        <Container className="auth-container">
            <Row>
                <Col md="6">
                    <Signup updateToken={props.updateToken} />
                </Col>
                <Col md="6" className="login-col">
                    <Login updateToken={props.updateToken} />
                </Col>
            </Row>
        </Container>
    )
};

export default Auth;