import React from 'react';
import './TagList.css';

const TagList = ({ item, deletetag, index }) => {
	return (
		<div className='tagBox'>
			Tags:{' '}
			{item.tags
				? item.tags.map((items, index) => {
						return (
							<span className='tags' key={index}>
								{items}
								<span
									className='closer'
									onClick={e =>
										deletetag(e, items, index, item.id)
									}>
									x
								</span>
							</span>
						);
				  })
				: null}
		</div>
	);
};

export default TagList;
