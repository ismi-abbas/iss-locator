import './App.css';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Result from './Result';

function App() {
	const [dateTime, setDateTime] = useState();

	return (
		<div className='App-header'>
			<h1 className='App-link'>NeXT Project - ISS Locator</h1>
			<p className='lead text-justify'>
				Input a time to track the ISS location in 10 different timeframe
			</p>
			<div className='mt-2'>
				<input
					type='datetime-local'
					className='form-control text-center'
					placeholder='Put a date'
					onChange={(e) => setDateTime(e.target.value)}
				/>
				<h4 className='lead text-center mt-2'>
					{moment(dateTime).format('D-MMMM-Y h:mm:ss A')}
				</h4>
			</div>
			{/* Result */}
			<Result />
		</div>
	);
}

export default App;
