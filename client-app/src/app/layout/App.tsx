import React, { useState, Fragment, useEffect, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState<string>("");

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.activities
      .create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleUpdateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.activities
      .update(activity)
      .then(() => {
        setActivities([
          ...activities.filter(a => a.id !== activity.id),
          activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    setSubmitting(true);
    agent.activities
      .delete(id)
      .then(() => {
        setActivities([...activities.filter(activity => activity.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    setLoading(true);
    agent.activities
      .list()
      .then(response => {
        const activities: IActivity[] = [];
        response.forEach(a => {
          a.date = a.date.split(".")[0];
          activities.push(a);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loadinng activities..." />;

  return (
    <Fragment>
      <NavBar OpenCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          updateActivity={handleUpdateActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
