import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

const EditLog = props => {
  const {updateOff, fetchWorkouts} = props.functions;

  const [editDescription, setEditDescription] = useState(props.updateWorkout.description);
  const [editDefinition, setEditDefinition] = useState(props.updateWorkout.definition);
  const [editResult, setEditResult] = useState(props.updateWorkout.result);

  const handleUpdate = e => {
    e.preventDefault()
    fetch(`http://localhost:3000/log/${props.updateWorkout.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            log: {
                description: editDescription, 
                definition: editDefinition, 
                result:editResult
            }
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    })
    .then(res=>res.json())
    .then(json=>{
      fetchWorkouts()
      updateOff()
    })
  }

    return(
    <Modal isOpen={true}>
        <ModalHeader>Log Your Workout</ModalHeader>
        <ModalBody>
            <Form onSubmit={handleUpdate}>
                <FormGroup>
                    <Label htmlFor="descrition">Description</Label>
                    <Input name="description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="definition">Definition</Label>
                    <Input name="definition" value={editDefinition} onChange={(e) => setEditDefinition(e.target.value)} style={{appearance: 'listbox', WebkitAppearance: 'listbox'}} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="result">Result</Label>
                    <Input name="result" value={editResult} onChange={(e) => setEditResult(e.target.value)} />
                </FormGroup>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button type="submit">Update</Button>
                    <Button onClick={updateOff}>Cancel</Button>
                </div>
            </Form>
        </ModalBody>
    </Modal>
    )
}

export default EditLog;