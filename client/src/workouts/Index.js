import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';
import Create from './Create';
import EditLog from './EditLog';
import Table from './Table';

const Index = (props) => {
  const { token } = props;

  const [workouts, setWorkouts] = useState([])
  const [updateActivity, setUpdateActivity] = useState(false) //changes to true when user clicks 'update'
  const [updateWorkout, setUpdateWorkout] = useState({})

    const fetchWorkouts = () => {
        fetch('http://localhost:3000/log/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token,
            })
        })
        .then(res => res.json())
        .then(json => {
            setWorkouts(json)
        })
    }

    const editUpdateWorkout = workout => setUpdateWorkout(workout);

    useEffect(()=>{ //fetches when we login
        fetchWorkouts()
    },[])

    const updateOn = () => setUpdateActivity(true)
    const updateOff = () => setUpdateActivity(false)

    const tableProps = {token, workouts, fetchWorkouts, editUpdateWorkout, updateOn}
    const editProps = { updateOff, fetchWorkouts, updateWorkout}
    return ( 
        <Container>
            <Row>
            <Col md="3">
                <Create fetchWorkouts={fetchWorkouts} token={token}/>
            </Col>
            <Col md="9">
                <Table tableProps={tableProps}/>
            </Col>
            {updateActivity ? <EditLog functions={editProps} updateWorkout={updateWorkout} token={token}/> : ""}
            </Row>
        </Container>
    );
}
 
export default Index;