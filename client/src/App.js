import './App.css';
import { useState } from 'react';
import moment from 'moment';
// import Map from './components/Map';

function App() {
	const [dateTime, setDateTime] = useState([]);
	const [data, setData] = useState([]);
	const [timeArray, setTimeArray] = useState([]);

	const onChange = (e) => {
		const dateParsed = Date.parse(e.target.value) / 1000;
		setDateTime(dateParsed);

		const timeStart = dateParsed;
		const timeEnd = dateParsed + 3600;
		const timeEndBefore = dateParsed - 3600;
		const timeArray = [];

		let time = timeStart;
		do {
			time = time + 600;
			timeArray.push(time);
		} while (time < timeEnd);

		do {
			time = time - 600;
			timeArray.push(time);
		} while (time > timeEndBefore);

		timeArray.sort((a, b) => a - b);
		const uniqueChars = [...new Set(timeArray)];
		setTimeArray(uniqueChars);
		console.log(uniqueChars);
	};

	// Fetching data from backend
	const getData = async () => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const body = JSON.stringify(timeArray);
			const res = await fetch(
				`http://localhost:5000/location/${timeArray}`,
				config,
				body
			);
			const data = await res.json();
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
			<div className=''>
				<div className=''>
					{data.map((item, index) => (
						<div key={index} className='text-white m-2 rounded'>
							<h6>
								<span className='fw-bold'>
									{' '}
									{moment.unix(item.timestamp).format('h:mm A')}{' '}
								</span>
								Latitude: {item.latitude.toFixed(2)} || Longitude:{' '}
								{item.longitude.toFixed(2)} || Altitude:{' '}
								{item.altitude.toFixed(2)} miles
							</h6>
						</div>
					))}
				</div>
			</div>
			{/* <Map /> */}
		</div>
	);
}

export default App;
