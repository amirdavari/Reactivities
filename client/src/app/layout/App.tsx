import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    const activity = activities!.find(a => a.id === id) || null
    setSelectedActivity(activity);
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(null);
  }

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  // const handleDeleteActivity = (id: string) => {
  //   // setActivities(activities.filter(a => a.id !== id));
  //   // if (selectedActivity?.id === id) {
  //   //   handleCancelSelectActivity();
  //   // }
  //   console.log("Delete activity with id: " + id);
  // }

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ? <Typography>Loading activities...</Typography> :
          (<ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            onSelectActivity={handleSelectActivity}
            onCancelSelectActivity={handleCancelSelectActivity}
            closeForm={handleCloseForm}
            editMode={editMode}
            openForm={handleOpenForm}
          />)
        }

      </Container>

    </Box>
  )
}

export default App
