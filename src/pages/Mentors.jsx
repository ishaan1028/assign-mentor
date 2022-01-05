import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "../components/Loader";


export default function Mentors() {

    const [modalShow, setModalShow] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
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
    }, []);

    const handleModalShow = (id) => {
        setDeleteId(id)
        setModalShow(true);
    }

    const handleModalClose = () => setModalShow(false);

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/mentors/delete/${deleteId}`);
            setMentors(mentors.filter(m => m._id !== deleteId));
            setIsLoading(false);
            toast.success("Deleted mentor successfully");
        }
        catch (err) {
            setIsLoading(false);
            console.error(err);
            toast.error("Error deleting mentor. Try again.");
        }
        handleModalClose();
    }

    return <Loader isLoading={isLoading} error={error}>
        <Container>
            <div className="miniContainer">

                <div className="TitleSection">
                    <div className="TitleSectionLeft">
                        <h2 className="titleText">
                            Mentors
                        </h2>
                        <p className="entityNamePara">
                            Total
                            <span className="uiBold"> {mentors?.length} </span>
                            mentors
                        </p>
                    </div>
                    <div className="TitleSectionRight">
                        <Link to="/mentor/create">
                            <Button variant='dark' >Add Mentor</Button>
                        </Link>
                    </div>
                </div>
                <Table striped bordered responsive className='studentTable'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mentor Name</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mentors?.map((m, i) => <tr key={m._id}>
                                <td>{i + 1}</td>
                                <td className='nameTd'>{m.name}</td>
                                <td className='actionsTd'>

                                    <Link to={`/mentor/details/${m._id}`}>
                                        <span className="viewIcon">
                                            <GrView />
                                        </span>
                                    </Link>
                                    <span className="deleteIcon"
                                        onClick={() => handleModalShow(m._id)}>
                                        <AiFillDelete />
                                    </span>
                                </td>
                            </tr>
                            )
                        }

                    </tbody>
                </Table>

            </div>

            <Modal show={modalShow} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete mentor?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this mentor?</Modal.Body>
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
