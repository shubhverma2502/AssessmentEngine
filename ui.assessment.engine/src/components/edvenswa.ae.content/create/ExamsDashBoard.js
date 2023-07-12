import { Container } from '@mui/material';
import React from 'react';
import Dashboard from '../../edvenswa.ae.home/Dashboard';
import { EXAM_TILES } from '../tiles/tiles';

const ExamsDashBoard = () => {

    return (
        <Container component={"main"} maxWidth="lg">
            <Dashboard contentTiles={EXAM_TILES} />
        </Container>
    )
}

export default ExamsDashBoard