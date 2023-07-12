import React from 'react'
import Dashboard from '../../edvenswa.ae.home/Dashboard';
import { Container } from '@mui/material';
import { ANALYTICS_TILES } from '../../edvenswa.ae.content/tiles/tiles';

const AnalyticsDashBoard = () => {
    return (
        <Container component={"main"} maxWidth="lg">
            <Dashboard contentTiles={ANALYTICS_TILES} />
        </Container>
    )
}

export default AnalyticsDashBoard
