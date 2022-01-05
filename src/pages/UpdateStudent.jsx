import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UpdateStudent() {

    const [student, setStudent] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [mentors, setMentors] = useState([]);
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`/students/get/${params.id}`);
                setStudent(data);
                setIsLoading(false);
            }
            catch (err) {
                setIsLoading(false);
                console.error(err);
                setError(true);
            }
        }
        getData();

        const getMentors = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get("/mentors/all");
                setMentors([...data]);
                setIsLoading(false);
            }
            catch (err) {
                setIsLoading(false);
                console.error(err);
                setError(true);
            }
        }
        getMentors();
    }, [params.id]);

    const initialValues = {
        name: student?.name || "",
        batch: student?.batch || "",
        mentor: student?.mentor || ""
    }

    const validationSchema = Yup.object({
        name: Yup.string(),
        batch: Yup.string(),
        mentor: Yup.string(),
    });

    const onSubmit = ({ name, batch, mentor }) => {

        const postData = async () => {
            try {
                setIsLoading(true);
                await axios.put(`/students/update/${params.id}`, { name, batch, mentor });
                setIsLoading(false);
                toast.success("Updated Student successfully")
                history.push(`/student/details/${params.id}`);
            }
            catch (err) {
                setIsLoading(false);
                console.error(err);
                setError(true);
            }
        }
        postData();

    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        enableReinitialize: true
    });

    return <Loader isLoading={isLoading} error={error}>
        <Container>
            <div className="miniContainer">
                <h4 className='mb1rem' >
                    Update student details
                </h4>
                <div className="adminFormBody">
                    {
                        error ? <div className="alertCenterDiv">
                            <Alert variant="danger ">
                                {error}
                            </Alert>
                        </div> : null
                    }
                    <Form onSubmit={formik.handleSubmit} >
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="name" value={formik.values.name} placeholder="Enter student name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {
                                formik.errors.name && formik.touched.name ?
                                    <Form.Text className="redColor">
                                        {formik.errors.name}
                                    </Form.Text> : null
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="batch" value={formik.values.batch} placeholder="Enter student batch" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {
                                formik.errors.batch && formik.touched.batch ?
                                    <Form.Text className="redColor">
                                        {formik.errors.batch}
                                    </Form.Text> : null
                            }
                        </Form.Group>
                        <Form.Select name="mentor" onChange={formik.handleChange}
                            value={formik.values.mentor}
                            onBlur={formik.handleBlur}>
                            <option disabled value="">Select a mentor for student</option>
                            {
                                mentors?.map(m => <option key={m._id} value={m._id}>{m.name}</option>)
                            }
                        </Form.Select>
                        <p>{
                            formik.errors.mentor && formik.touched.mentor ?
                                <Form.Text className="redColor">
                                    {formik.errors.mentor}
                                </Form.Text> : null
                        }</p>

                        <Button type="submit" variant='dark'>
                            Submit
                        </Button>
                    </Form>

                </div>
            </div>
        </Container>
    </Loader>
}
