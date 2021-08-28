import {Table, Button} from 'reactstrap'

const Table = (props) => {
    const {fetchWorkouts, workouts, token, editUpdateWorkout, updateOn} = props.tableProps;

    const deleteWorkout = (workout) => {

        fetch(`http://localhost:3000/log/${workout.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        })
        .then(res => res.json())
        .then(json => {
            fetchWorkouts();
        });
    };

    const mapWorkout = () => workouts.map((workout, i)=>(
        <tr key={i}>
            <th scope="row">
                {workout.id}
            </th>
            <td>{workout.result}</td>
            <td>{workout.description}</td>
            <td>{workout.definition}</td>
            <td>
                <Button color="warning" onClick={()=>{updateOn(); editUpdateWorkout(workout)}}>Update</Button>
                <Button color="danger" onClick={()=>deleteWorkout(workout)}>Delete</Button>
            </td>
        </tr>
    ));


    return ( 
        <div>
            <h3>History of Workouts</h3>
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
                    {mapWorkout()}
                </tbody>
            </Table>
        </div>
        );
};
 
export default Table;