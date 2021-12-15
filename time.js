const moment = require('moment');

const timelineLabels = (desiredStartTime, interval, period) => {
	const periodsInADay = moment.duration(1, 'day').as(period);

	const timeLabels = [];
	const startTimeMoment = moment(desiredStartTime, 'hh:mm');
	for (let i = 0; i <= periodsInADay; i += interval) {
		startTimeMoment.add(i === 0 ? 0 : interval, period);
		timeLabels.push(startTimeMoment.format('hh:mm A'));
	}

	return timeLabels;
};

timelineLabels();
