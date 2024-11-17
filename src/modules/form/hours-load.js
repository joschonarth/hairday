import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"
import { hoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")

function categorizeHours(hours) {
    return {
        morning: hours.filter(hour => parseInt(hour.split(":")[0]) >= 6 && parseInt(hour.split(":")[0]) < 12),
        afternoon: hours.filter(hour => parseInt(hour.split(":")[0]) >= 12 && parseInt(hour.split(":")[0]) < 18),
        night: hours.filter(hour => parseInt(hour.split(":")[0]) >= 18 && parseInt(hour.split(":")[0]) <= 23),
    };
}

function hourHeaderAdd(title) {
    const header = document.createElement("li")
    header.classList.add("hour-period")
    header.textContent = title
    hours.append(header)
}

export function hoursLoad({ date, dailySchedules }) {
    hours.innerHTML = "";

    const unavailableHours = dailySchedules.map(schedule => dayjs(schedule.when).format("HH:mm"));

    const opening = openingHours.map(hour => {
        const [scheduleHour] = hour.split(":");
        const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs());

        return {
            hour,
            available: !unavailableHours.includes(hour) && !isHourPast,
        };
    });

    const categorizedHours = categorizeHours(opening.map(({ hour }) => hour));

    Object.entries(categorizedHours).forEach(([period, periodHours]) => {
        if (periodHours.length > 0) {
            const periodName = period === "morning" ? "Manhã" : period === "afternoon" ? "Tarde" : "Noite";
            hourHeaderAdd(periodName);

            periodHours.forEach(periodHour => {
                const { hour, available } = opening.find(o => o.hour === periodHour);
                const li = document.createElement("li");

                li.classList.add("hour");
                li.classList.add(available ? "hour-available" : "hour-unavailable");
                li.textContent = hour;

                hours.append(li);
            });
        }
    });

    hoursClick();
}