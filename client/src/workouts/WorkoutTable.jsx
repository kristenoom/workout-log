import React from 'react';
import { Table, Button } from 'reactstrap';

const WorkoutTable = (props) => {
    const workoutMapper = () => {
        return props.workouts.map((workout, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{workoutMapper.id}</th>
                    <td>{workoutMapper.result}</td>
                    <td>{workoutMapper.description}</td>
                    <td>{workoutMapper.definition}</td>
                    <td>
                        <Button color="warning" onClick={() => { props.editUpdateWorkout(workout); props.updateOn()}}>Update</Button>
                        <Button color="danger">Delete</Button>
                    </td>
                </tr>
            );
        });
    };

    const deleteWorkout = (workout) => {
        fetch('http://localhost:3000/log/${workout.id}', {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchWorkouts())
    }
    
    return (
        <>
            <h3>Workout History</h3>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Result</th>
                        <th>Description</th>
                        <th>Definition</th>
                    </tr>
                </thead>
                <tbody>
                    {workoutMapper()}
                </tbody>
            </Table>
        </>
    )
}

export default WorkoutTable;