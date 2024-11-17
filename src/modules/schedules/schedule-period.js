import { openingHours } from '../../utils/opening-hours.js';

function categorizeHours(hours) {
    const morning = hours.filter(hour => parseInt(hour.split(':')[0]) >= 6 && parseInt(hour.split(':')[0]) < 12);
    const afternoon = hours.filter(hour => parseInt(hour.split(':')[0]) >= 12 && parseInt(hour.split(':')[0]) < 18);
    const night = hours.filter(hour => parseInt(hour.split(':')[0]) >= 18 && parseInt(hour.split(':')[0]) <= 23);
  
    return { morning, afternoon, night };
}

function updatePeriodSpan(period, hours) {
    const startHour = hours[0];
    const endHour = hours[hours.length - 1];

    const startHourFormatted = startHour.split(':')[0];
    const endHourFormatted = endHour.split(':')[0];

    const periodSpan = document.getElementById(period);
    periodSpan.textContent = `${startHourFormatted}h-${endHourFormatted}h`;
}

function generateSchedule() {
    const { morning, afternoon, night } = categorizeHours(openingHours);

    updatePeriodSpan('morning-span', morning);
    updatePeriodSpan('afternoon-span', afternoon);
    updatePeriodSpan('night-span', night);
}

document.addEventListener('DOMContentLoaded', generateSchedule);