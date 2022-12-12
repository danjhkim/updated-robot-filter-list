import React from 'react';
import './LoaderSpinner.css';

const LoaderSpinner = () => {
	return (
		<div className='lds-roller'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default LoaderSpinner;
