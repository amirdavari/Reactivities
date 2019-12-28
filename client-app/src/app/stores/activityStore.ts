import { createContext, SyntheticEvent } from "react";
import { observable, computed, action, configure, runInAction } from "mobx";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable selectedActivity: IActivity | undefined;
  @observable loading = false;
  @observable editMode = false;
  @observable target = "";
  @observable submitting = false;

  @computed get sortedActivities() {
    var a = Array.from(this.activityRegistry.values()).sort(
      (a: IActivity, b: IActivity) => Date.parse(a.date) - Date.parse(b.date)
    );

    return a;
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
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.editMode = false;
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
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.editMode = false;
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
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action openCreateForm = () => {
    this.selectedActivity = undefined;
    this.editMode = true;
  };

  @action setEditMode = (val: boolean) => {
    this.editMode = val;
  };

  @action setSelectedActivity(activity?: IActivity) {
    this.selectedActivity = activity;
  }

  @action cancelDetail = () => {
    this.selectedActivity = undefined;
  };
}

export default createContext(new ActivityStore());
