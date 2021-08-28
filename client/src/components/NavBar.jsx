import React, { useState } from 'react';
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Button} from 'reactstrap';

const NavBar = (props) => {
    const {clickLogout, username} = props;
    
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }

    return ( 
        <Navbar color="faded" light expand="md">
            <NavbarBrand hre='/'>Workout Log</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem  className="justify-content-end">
                    {localStorage.getItem('token') ? <Button onClick={clickLogout}>Logout</Button> : ""}
                    </NavItem>
                </Nav>
            </Collapse>
            {username ? <p className="mx-4 text-muted"><em>Welcome, {username}!</em></p> : ''}
        </Navbar>
    );
}

export default NavBar;