import { useState } from 'react';

const Form = () => {
	const [dateTime, setDateTime] = useState();

	const onChange = (e) => {
		const dateParsed = Date.parse(e.target.value) / 1000;
		setDateTime(dateParsed);
		console.log(dateParsed);
	};

	return (
		<div>
			Add timeframe
			<form>
				<input
					type='datetime-local'
					name='timeframe'
					placeholder='timeframe'
					required
					value={dateTime}
					onChange={(e) => onChange(e)}
				/>
				<input type='submit' value='Submit' className='btn btn-secondary' />
			</form>
		</div>
	);
};

export default Form;
