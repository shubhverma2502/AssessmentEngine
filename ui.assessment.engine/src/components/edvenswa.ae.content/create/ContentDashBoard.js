import React from 'react'
import Dashboard from '../../edvenswa.ae.home/Dashboard';
import { Container } from '@mui/material';
import { contentTiles } from '../tiles/tiles';

const ContentDashBoard = () => {
    return (
        <Container component={"main"} maxWidth="lg">
            <Dashboard contentTiles={contentTiles} />
        </Container>
    )
}

export default ContentDashBoard
