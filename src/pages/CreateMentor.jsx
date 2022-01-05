import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loader from '../components/Loader';

export default function CreateMentor() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const students = useRef();
    const [selectStudents, setSelectStudents] = useState([]);
    const [unassigned, setUnassigned] = useState([]);

    const history = useHistory();

    const initialValues = {
        name: ""
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required')
    });

    const onSubmit = ({ name }) => {

        const postData = async () => {
            try {
                setIsLoading(true);
                await axios.post("/mentors/create", { name, students: selectStudents });
                formik.resetForm();
                setIsLoading(false);
                history.push("/mentors");
            }
            catch (err) {
                setIsLoading(false);
                console.error(err);
                setError(true);
            }
        }

        postData();

    };

    const handleSelect = (e) => {
        const values = [...e.target.selectedOptions].map(opt => opt.value).filter(o => o !== "");
        setSelectStudents([...values]);
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get("/students/unassigned");
                setUnassigned([...data]);
                setIsLoading(false);
            }
            catch (err) {
                setIsLoading(false);
                console.error(err);
                setError(true);
            }
        }
        getData();
    }, []);

    return <Loader isLoading={isLoading} error={error}>
        <Container>
            <div className="miniContainer">
                <h4 className='mb1rem' >
                    Create new mentor
                </h4>
                <div className="mentorFormDiv">
                    {
                        error ? <div >
                            <Alert variant="danger ">
                                "Error creating mentor. Try later."
                            </Alert>
                        </div> : null
                    }
                    <Form onSubmit={formik.handleSubmit} >
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="name" value={formik.values.name} placeholder="Enter mentor name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {
                                formik.errors.name && formik.touched.name ?
                                    <Form.Text className="redColor">
                                        {formik.errors.name}
                                    </Form.Text> : null
                            }
                        </Form.Group>
                        <Form.Label>Students:</Form.Label>
                        {
                            unassigned.length > 0 ? <>
                                <p>Ctrl + click to select multiple values</p>
                                <Form.Select name="student" multiple ref={students}
                                    onChange={handleSelect}>
                                    <option value="">assign student</option>
                                    {
                                        unassigned?.map(s => <option key={s._id} value={s._id}>
                                            {s.name}
                                        </option>)
                                    }
                                </Form.Select>
                            </> : <p className="redColor">No students left to assign</p>
                        }
                        <Button type="submit" variant='dark'>
                            {isLoading ? <><Spinner animation="border" size="sm" />{" "} Submitting...</> : "Submit"}
                        </Button>
                    </Form>

                </div>
            </div>
        </Container>
    </Loader>
}
