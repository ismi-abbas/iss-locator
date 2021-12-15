import './App.css';
import { useState, useEffect } from 'react';
import moment from 'moment';

function App() {
	const [dateTime, setDateTime] = useState('');
	const [data, setData] = useState([]);

	const onChange = (e) => {
		const dateParsed = Date.parse(e.target.value) / 1000;

		const timeFrameArray = [];
		setDateTime(dateParsed);
		console.log(dateTime);
	};

	const getData = async () => {
		try {
			const url = `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${dateTime}&units=miles`;
			const response = await fetch(url);
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='App-header'>
			<h1 className='App-link'>NeXT Project - ISS Locator</h1>
			<p className='lead text-justify'>
				Input a time to track the ISS location in 10 different timeframe
			</p>
			<div>
				<form>
					<input
						type='datetime-local'
						name='timeframe'
						value={dateTime}
						onChange={(e) => onChange(e)}
					/>
				</form>
				<h4 className='lead text-center mt-2'>
					{moment.unix(dateTime).format('D-MMMM-Y h:mm:ss A')}
				</h4>
				<button className='btn btn-primary mt-2' onClick={(e) => getData()}>
					Submit
				</button>
			</div>
			{data.map((item, index) => (
				<div key={index} className='flex text-white p-4 m-2'>
					<div className='col'>
						<h4 className='row lead'>
							Timeframe: {moment.unix(dateTime).format('D-MMMM-Y h:mm:ss A')} ||
							Latitude: {item.latitude} || Longitude: {item.longitude} ||
							Altitude: {item.altitude.toFixed(2)} kilometers
						</h4>
					</div>
				</div>
			))}
		</div>
	);
}

export default App;
