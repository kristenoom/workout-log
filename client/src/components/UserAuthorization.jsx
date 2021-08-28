import { Container, Row, Col } from "reactstrap";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup";

const UserAuthorization = (props) => {
    const { updateToken, updateUsername } = props;

    return ( 
    <Container className="auth-container">
        <Row>
            <Col md="6">
                <UserSignup updateToken={updateToken} updateUsername={updateUsername}/>
            </Col>
            <Col md="6" className="login-col">
                <UserLogin updateToken={updateToken} updateUsername={updateUsername}/>
            </Col>
        </Row>
    </Container> 
    )
}
 
export default UserAuthorization;