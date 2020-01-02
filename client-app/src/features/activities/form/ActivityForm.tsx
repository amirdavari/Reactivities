import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity: initialActivity,
    createActivity,
    updateActivity,
    submitting,
    loadActivity,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    description: "",
    category: "",
    venue: "",
    city: "",
    date: ""
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialActivity && setActivity(initialActivity)
      );
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    match.params.id,
    initialActivity,
    clearActivity,
    activity.id.length
  ]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length > 0) {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    } else {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              placeholder="Title"
              value={activity.title}
              name="title"
              onChange={handleInputChange}
            />
            <Form.TextArea
              rows={2}
              placeholder="Description"
              value={activity.description}
              name="description"
              onChange={handleInputChange}
            />
            <Form.Input
              placeholder="Category"
              value={activity.category}
              name="category"
              onChange={handleInputChange}
            />
            <Form.Input
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
              name="date"
              onChange={handleInputChange}
            />
            <Form.Input
              placeholder="City"
              value={activity.city}
              name="city"
              onChange={handleInputChange}
            />
            <Form.Input
              placeholder="Venue"
              value={activity.venue}
              name="venue"
              onChange={handleInputChange}
            />
            <Button
              floated="right"
              positive
              content="Submit"
              type="submit"
              loading={submitting}
            />
            <Button
              floated="right"
              content="Cancel"
              type="button"
              onClick={() => history.push("/activities")}
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
