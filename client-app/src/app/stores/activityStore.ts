import { createContext, SyntheticEvent } from "react";
import { observable, computed, action, configure, runInAction } from "mobx";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activity: IActivity | null = null;
  @observable loading = false;
  @observable target = "";
  @observable submitting = false;

  @computed get sortedActivities() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a: IActivity, b: IActivity) => Date.parse(a.date) - Date.parse(b.date)
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action loadActivities = async () => {
    this.loading = true;
    try {
      var activities = await agent.activities.list();
      runInAction(() => {
        activities.forEach(a => {
          a.date = a.date.split(".")[0];
          this.activityRegistry.set(a.id, a);
        });
        this.loading = false;
      });
      console.log(this.groupActivitiesByDate(activities));
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loading = true;
      try {
        activity = await agent.activities.details(id);
        runInAction(() => {
          this.activity = activity;
          this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          this.loading = false;
        });
        console.log(error);
      }
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  @action updateActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.target = event.currentTarget.name;
    this.submitting = true;
    try {
      await agent.activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action selectActivity = (id: string) => {
    console.log(id);
    this.activity = this.activityRegistry.get(id);
  };
}

export default createContext(new ActivityStore());
