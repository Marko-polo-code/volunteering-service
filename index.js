"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const g_rlitzer_park_log_1 = require("./g\u00F6rlitzer-park-log");
const k_rner_park_log_1 = require("./k\u00F6rner-park-log");
function combineVolunteers(volunteers) {
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
function isVerified(verified) {
    if (typeof verified === "string" && verified === "Yes") {
        return true;
    }
    else if (typeof verified === "string" && verified === "No") {
        return false;
    }
    return verified;
}
function getHours(activity) {
    if ("hours" in activity) {
        return activity.hours;
    }
    else {
        return activity.time;
    }
}
function calculateHours(volunteers) {
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
const combinedVolunteers = combineVolunteers([].concat(k_rner_park_log_1.körnerParkVolunteers, g_rlitzer_park_log_1.görlitzerParkVolunteers));
const result = calculateHours(combinedVolunteers);
console.log(result.sort(byHours));
