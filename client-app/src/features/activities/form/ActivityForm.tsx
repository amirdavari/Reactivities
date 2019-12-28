import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityForm: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    setEditMode,
    selectedActivity: initialActivity,
    createActivity,
    updateActivity,
    submitting
  } = activityStore;
  const initializeForm = () => {
    if (initialActivity) return initialActivity;
    else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        venue: "",
        city: "",
        date: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length > 0) {
      updateActivity(activity);
    } else {
      //activity.id = null;
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    }
    console.log(activity);
  };

  return (
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
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
