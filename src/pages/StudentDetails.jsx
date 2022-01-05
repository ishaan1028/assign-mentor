import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';

export default function StudentDetails() {

    const [student, setStudent] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`/students/get/${params.id}`);
                console.error(data);

                if (data.mentor.length) {
                    const { data: mentor } = await axios.get(`/mentors/get/${data.mentor}`);
                    data.mentor = mentor;
                }
                else {
                    data.mentor = { name: "Not assigned" };
                }

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
    }, [params.id]);

    return <Loader isLoading={isLoading} error={error}>
        <Container>
            <div className="miniContainer">
                <div className="stduentDetailsBody">
                    <div className="TitleSection">
                        <div className="TitleSectionLeft">
                            <h2 className="titleText">
                                Student Details
                            </h2>
                            <p >
                                Student created at {new Date((student?.createdAt)).toUTCString()}
                            </p>
                        </div>
                        <div className="TitleSectionRight">
                            <Link to={`/student/update/${params.id}`}>
                                <Button variant='dark' >Edit student details</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="studentDetailsDiv">
                        <p className="studentDetailPara nameTd">
                            <span className="uiBold mr1rem">
                                Name: {" "}
                            </span>
                            {student?.name}
                        </p>
                        <p className="studentDetailPara">
                            <span className="uiBold mr1rem">
                                Student Id: {" "}
                            </span>
                            {student?._id}
                        </p>
                        <p className="studentDetailPara ">
                            <span className="uiBold mr1rem">
                                Batch: {" "}
                            </span>
                            {student?.batch}
                        </p>
                        <p className="studentDetailPara">
                            <span className="uiBold mr1rem">
                                Mentor assigned: {" "}
                            </span>
                            {student?.mentor.name}
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    </Loader>
}
