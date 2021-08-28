import React, { useState } from "react"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"

const Create = (props) => {
const { fetchWorkouts, token } = props

const [description, setDescription] = useState("")
const [definition, setDefinition] = useState("")
const [result, setResult] = useState("")

const handleSubmit = e => {
    e.preventDefault()
    if(!description || !definition || !result){
        alert("Please complete the workout log fields.");
        return;
    }

    fetch('http://localhost:3000/log/', {
        method: 'POST',
        body: JSON.stringify({
            log: {description, definition, result}
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    })
    .then(res => res.json())
    .then(json => {
        setDescription('');
        setDefinition('');
        setResult('');
        fetchWorkouts();
    })
}

    return (
        <div>
            <h3>Workout Log</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="descrition">Description</Label>
                    <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="definition">Definition</Label>
                    <Input name="definition" value={definition} onChange={(e) => setDefinition(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="result">Result</Label>
                    <Input name="result" value={result} onChange={(e) => setResult(e.target.value)} />
                </FormGroup>
                <Button color="primary" className="my-3" type="submit">
                    Submit Workout
                </Button>
            </Form>
        </div>
    )
}

export default Create;