import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";

import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { sortedActivities } = activityStore;

  return (
    <Fragment>
      {sortedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Label color="blue" size="large">
            {group}
          </Label>
          <Item.Group divided>
            {activities.map(activity => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);
