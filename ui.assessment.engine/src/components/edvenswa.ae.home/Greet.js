import { Card, CardContent, Typography } from '@mui/material';
import Proptypes from 'prop-types';

Greet.propTypes = {
    user: Proptypes.object.isRequired
}

export default function Greet(props) {
  const { user } = props;
    const date = new Date();
    const hours = date.getHours();
   
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                    {hours >= 12 ? "Good Evening," : "Good Morning,"} {user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : user.username}
                
                </Typography>
            </CardContent>
        </Card>
    )
}