import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    closeForm: () => void;
    activity: Activity | null;
}

export default function ActivityForm({ closeForm, activity }: Props) {

    const { updateActivity, createActivity } = useActivities();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        if (activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
        }
        else {
            await createActivity.mutateAsync(data as unknown as Activity);
        }
        closeForm();
    }
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Create Activity
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField name="title" label="Title" defaultValue={activity?.title || ''} />
                <TextField name="description" label="Description" multiline rows={4} defaultValue={activity?.description || ''} />
                <TextField name="category" label="Category" defaultValue={activity?.category || ''} />
                <TextField name="date" label="Date" type="date"
                    defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                />
                <TextField name="city" label="City" defaultValue={activity?.city || ''} />
                <TextField name="venue" label="Venue" defaultValue={activity?.venue || ''} />
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        loading={updateActivity.isPending || createActivity.isPending}
                    >
                        Submit
                    </Button>
                    <Button variant="outlined" color="inherit" onClick={closeForm}>Cancel</Button>
                </Box>
            </Box>
        </Paper>
    )
}