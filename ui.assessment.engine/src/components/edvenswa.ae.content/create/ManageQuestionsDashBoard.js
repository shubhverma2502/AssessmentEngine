import React from 'react'
import Dashboard from '../../edvenswa.ae.home/Dashboard';
import { Container } from '@mui/material';
import { questionsTiles } from '../tiles/tiles';

const ManageQuestionDashBoard = () => {
    return (
        <Container component={"main"} maxWidth="lg">
            <Dashboard contentTiles={questionsTiles} />
        </Container>
    )
}

export default ManageQuestionDashBoard
