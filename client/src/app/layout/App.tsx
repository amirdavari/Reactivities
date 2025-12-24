import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  const handleSelectActivity = (id: string) => {
    const activity = activities.find(a => a.id === id) || null
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

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      // edit existing activity without change the position in the list
      setActivities(activities.map(a => a.id === activity.id ? activity : a));
      setSelectedActivity(activity);
      console.log(activity.id);
    } else {
      activity.id = crypto.randomUUID();
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      console.log('not edit');
    }
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    console.log('delete', id);
    setActivities(activities.filter(a => a.id !== id));
    if (selectedActivity?.id === id) {
      handleCancelSelectActivity();
    }
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          onSelectActivity={handleSelectActivity}
          onCancelSelectActivity={handleCancelSelectActivity}
          closeForm={handleCloseForm}
          editMode={editMode}
          openForm={handleOpenForm}
          submitForm={handleSubmitForm}
          onDeleteActivity={handleDeleteActivity}
        />
      </Container>

    </Box>
  )
}

export default App
