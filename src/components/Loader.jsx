import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';

export default function Loader({ isLoading, error, children }) {
    return isLoading ? <div className='spinnerCenter'><Spinner animation="border" /></div> :
        error ? <div className='centerAlign'>
            <Alert variant="danger">
                Something went wrong. Refresh page or try again later...
            </Alert>
        </div> : children
}
