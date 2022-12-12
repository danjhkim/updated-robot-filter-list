import React from 'react';
import './SearchBox.css';

const SearchBox = ({ searchChange, searchWord, placeholder }) => {
	return (
		<div className='searchBox'>
			<input
				type='search'
				placeholder={placeholder}
				onChange={searchChange}
				value={searchWord}
			/>
		</div>
	);
};

export default SearchBox;
