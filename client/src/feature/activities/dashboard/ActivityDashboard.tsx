import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activities: Activity[];
    selectedActivity: Activity | null;
    onSelectActivity: (id: string) => void;
    onCancelSelectActivity: () => void;
    closeForm: () => void;
    editMode: boolean;
    openForm: (id?: string) => void;
}

export default function ActivityDashboard({ activities, selectedActivity, onSelectActivity, onCancelSelectActivity, closeForm, editMode, openForm }: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList activities={activities} onSelectActivity={onSelectActivity} />
            </Grid>
            <Grid size={5}>
                {selectedActivity && !editMode && <ActivityDetail
                    selectedActivity={selectedActivity}
                    onCancelSelectActivity={onCancelSelectActivity}
                    onOpenForm={openForm}
                />}
                {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} />}
            </Grid>
        </Grid>
    )
}