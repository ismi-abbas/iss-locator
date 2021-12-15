import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';

const Result = () => {
	// get current time in unix
	const getUnixTime = () => {
		return Math.floor(new Date().getTime() / 1000.0);
	};

	// set array of unix time
	const [dateTime, setDateTime] = useState([getUnixTime()]);
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(
				`https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${dateTime}&units=miles`
			);
			const data = await response.json();
			setData(data);
		}
		fetchData();
	}, []);

	return (
		<>
			{data.map((item, index) => (
				<div key={index} className='flex text-white p-4 m-2'>
					<div className='col'>
						<h4 className='row lead'>
							{moment.unix(dateTime).format('MM/DD/YYYY h:mm:ss A')}
						</h4>
						<h4 className='row lead'>Latitude: {item.latitude}</h4>
						<h4 className='row lead '>Longitude: {item.longitude}</h4>
						<h4 className='row lead'>
							Altitude: {item.altitude.toFixed(2)} miles
						</h4>
					</div>
				</div>
			))}
		</>
	);
};

export default Result;
