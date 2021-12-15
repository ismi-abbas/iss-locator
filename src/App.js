import './App.css';
import { useState } from 'react';
import moment from 'moment';
import Map from './components/Map';

function App() {
	const [dateTime, setDateTime] = useState([]);
	const [data, setData] = useState([]);
	const [timeArray, setTimeArray] = useState([]);

	const onChange = (e) => {
		const dateParsed = Date.parse(e.target.value) / 1000;
		setDateTime(dateParsed);

		const timeStart = dateParsed;
		const timeEnd = dateParsed + 6000;
		const timeArray = [];

		let time = timeStart;
		do {
			time = time + 600;
			timeArray.push(time);
		} while (time < timeEnd);

		console.log(timeArray);
		setTimeArray(timeArray);
		console.log(dateTime);
	};

	const getData = async () => {
		try {
			const url = `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${timeArray}&units=miles`;
			const response = await fetch(url);
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='App-header'>
			<h1 className='App-link'>NeXT Assessment - ISS Locator</h1>
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
						required
						className='form-control'
					/>
				</form>
				<h4 className='lead text-center mt-2'>
					{moment.unix(dateTime).format('D-MMMM-Y h:mm:ss A')}
				</h4>
				<div className='text-center my-2'>
					<button className='btn btn-primary mt-2 ' onClick={(e) => getData()}>
						Submit
					</button>
				</div>
			</div>
			<div className='container-fluid'>
				<div className='row'>
					{data.map((item, index) => (
						<div key={index} className='col text-white m-2 rounded'>
							<div className=''>
								<h6 className='lead fw-bold'>
									{moment.unix(item.timestamp).format('h:mm A')}
								</h6>
								<h6 className='lead'>Latitude: {item.latitude}</h6>
								<h6 className='lead'>Longitude: {item.longitude}</h6>
								<h6 className='lead'>
									Altitude: {item.altitude.toFixed(2)} kilometers
								</h6>
							</div>
						</div>
					))}
				</div>
			</div>
			<Map />
		</div>
	);
}

export default App;
