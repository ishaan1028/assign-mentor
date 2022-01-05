import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';


export default function Students() {

    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [deleteId, setDeleteId] = useState();

    useEffect(() => {
        const getStudents = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get("/students/all");
                setStudents([...data]);
                setIsLoading(false);
            }
            catch (err) {
                setIsLoading(false);
                console.error(err);
                setError(true);
            }
        }
        getStudents();
    }, []);

    const handleModalShow = (id) => {
        setDeleteId(id)
        setModalShow(true);
    }

    const handleModalClose = () => setModalShow(false);

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/students/delete/${deleteId}`);
            setStudents(students.filter(s => s._id !== deleteId));
            setIsLoading(false);
            toast.success("Deleted student successfully");
        }
        catch (err) {
            setIsLoading(false);
            console.error(err);
            toast.error("Error deleting student. Try again.");
        }
        handleModalClose();
    }

    return <Loader isLoading={isLoading} error={error}>
        <Container>
            <div className="miniContainer">

                <div className="TitleSection">
                    <div className="TitleSectionLeft">
                        <h2 className="titleText">
                            Students
                        </h2>
                        <p className="entityNamePara">
                            Total
                            <span className="uiBold"> {students?.length} </span>
                            students
                        </p>
                    </div>
                    <div className="TitleSectionRight">
                        <Link to="/student/create">
                            <Button variant='dark' >Add Student</Button>
                        </Link>
                    </div>
                </div>

                <Table striped bordered responsive className='studentTable'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student Name</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students?.map((s, i) => <tr key={s._id}>
                                <td>{i + 1}</td>
                                <td className='nameTd'>{s.name}</td>
                                <td className='actionsTd'>

                                    <Link to={`/student/details/${s._id}`}>
                                        <span className="viewIcon">
                                            <GrView />
                                        </span>
                                    </Link>
                                    <Link to={`/student/update/${s._id}`}>
                                        <span className="editIcon" >
                                            <AiOutlineEdit />
                                        </span>
                                    </Link>
                                    <span className="deleteIcon"
                                        onClick={() => handleModalShow(s._id)}>
                                        <AiFillDelete />
                                    </span>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </Table>

            </div>

            <Modal show={modalShow} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete student?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    </Loader>
}
