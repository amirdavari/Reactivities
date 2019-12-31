import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";

import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    sortedActivities: activities,
    deleteActivity,
    submitting,
    target
  } = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  as={Link}
                  to={`/activities/${activity.id}`}
                />
                <Button
                  floated="right"
                  content="Delete"
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  color="red"
                  onClick={e => deleteActivity(e, activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
