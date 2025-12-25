import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
    return (
        <Paper
            sx={{
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 6,
                alignContent: 'center',
                height: '100vh',
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
            }}
        >
            <Box sx={{
                display: 'flex', alignItems: 'center', alignContent: 'center', color: 'white', gap: 3
            }}>
                <Group sx={{ width: 110, height: 110 }} />
                <Typography variant="h1">
                    Reactivities
                </Typography>
            </Box>
            <Typography variant="h2">
                Welcome to Reactivities
            </Typography>
            <Button component={Link} to="/activities" variant="contained" size="large" sx={{ bgcolor: '#FFD700', color: 'black', fontWeight: 'bold' }}>
                Take me to the activities!
            </Button>
        </Paper>
    )
}