import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function MentorDetails() {

    const [mentor, setMentor] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`/mentors/get/${params.id}`);

                setMentor(data);
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
                                Mentor Details
                            </h2>
                            <p >
                                Mentor created at {new Date((mentor?.createdAt)).toUTCString()}
                            </p>
                        </div>
                    </div>
                    <div className="studentDetailsDiv">
                        <p className="studentDetailPara nameTd">
                            <span className="uiBold mr1rem">
                                Name: {" "}
                            </span>
                            {mentor?.name}
                        </p>
                        <p className="studentDetailPara">
                            <span className="uiBold mr1rem">
                                Mentor Id: {" "}
                            </span>
                            {mentor?._id}
                        </p>
                        <p className="studentDetailPara">
                            <span className="uiBold mr1rem">
                                Students assigned: {mentor?.students?.length}
                            </span>
                        </p>
                        <ul className="studentsList">
                            {
                                mentor?.students?.map(s =>
                                    <li key={s._id}>
                                        <p>
                                            {s.name}
                                        </p>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </Container>
    </Loader>
}
