import {
  GörlitzerParkVolunteers,
  GörlitzerParkActivity,
  görlitzerParkVolunteers,
} from "./görlitzer-park-log";

import {
  KörnerParkVolunteers,
  KörnerParkActivity,
  körnerParkVolunteers,
} from "./körner-park-log";

type CombinedActivity = GörlitzerParkActivity | KörnerParkActivity;

type Volunteers = {
  id: string | number;
  name: string;
  activities: CombinedActivity[];
};

function combineVolunteers(
  volunteers: (GörlitzerParkVolunteers | KörnerParkVolunteers)[]
) {
  return volunteers.map((volunteer) => {
    let id = volunteer.id;
    if (typeof id === "string") {
      id = parseInt(id, 10);
    }
    return {
      id: volunteer.id,
      name: volunteer.name,
      activities: volunteer.activities,
    };
  });
}

function isVerified(verified: string | boolean) {
  if (typeof verified === "string" && verified === "Yes") {
    return true;
  } else if (typeof verified === "string" && verified === "No") {
    return false;
  }
  return verified;
}

function getHours(activity: CombinedActivity) {
  if ("hours" in activity) {
    return activity.hours;
  } else {
    return activity.time;
  }
}

function calculateHours(volunteers: Volunteers[]) {
  return volunteers.map((volunteer) => {
    let hours = 0;

    volunteer.activities.forEach((activity) => {
      if (isVerified(activity.verified)) {
        hours = hours + getHours(activity);
      }
    });

    return {
      id: volunteer.id,
      name: volunteer.name,
      hours: hours,
    };
  });
}

function byHours(a, b) {
  return b.hours - a.hours;
}

const combinedVolunteers = combineVolunteers(
  [].concat(körnerParkVolunteers, görlitzerParkVolunteers)
);

const result = calculateHours(combinedVolunteers);
console.log(result.sort(byHours));
