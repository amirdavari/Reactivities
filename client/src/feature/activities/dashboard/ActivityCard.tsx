import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

type Props = {
    activity: Activity;
    onSelectActivity: (id: string) => void;
    onDeleteActivity: (id: string) => void;
}

export default function ActivityCard({ activity, onSelectActivity, onDeleteActivity }: Props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{activity.date}</Typography>
                <Typography variant="body2">{activity.description}</Typography>
                <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Chip label={activity.category} variant="outlined" />
                <Box display='flex' gap={2}>
                    <Button size="medium" variant="contained" color="error" onClick={() => onDeleteActivity(activity.id)}>Delete</Button>
                    <Button size="medium" variant="contained" onClick={() => onSelectActivity(activity.id)}>View</Button>

                </Box>
            </CardActions>
        </Card>
    )
}