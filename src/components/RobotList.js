import React, { useState, useCallback } from 'react';
import { Collapse } from 'react-collapse';
import './Robots.css';
import './RobotList.css';
import LoaderSpinner from './LoaderSpinner';
import TagList from './TagList';

const RobotList = ({
	list,
	setList,
	filteredRobots,
	activeIndex,
	setActiveIndex,
}) => {
	const [tagSearch, setTagSearch] = useState({});

	//function for showing all test scores.
	//adds to object the corresponding id and sets opposite boolean value...true, false, true.. etc
	function showtest(item) {
		setActiveIndex(prevState => ({
			...prevState,
			[item.id]: !prevState[item.id],
		}));
	}

	//memo func for finding average score
	const averageFinder = useCallback(array => {
		return array.map(Number).reduce((a, b) => a + b, 0) / array.length;
	}, []);

	//adding tag to individual robots
	const handleSubmit = useCallback(
		(e, item, index) => {
			const inputs = document.querySelectorAll('.tagsearch');
			e.preventDefault();
			//if input has value run code (needed for undefined properties)
			if (inputs[index].value) {
				if (list[index].tags.includes(inputs[index].value)) {
					alert('Tag already exists');
				} else {
					setList(prevState => {
						// Copy the array (your code was doing that)
						let update = [...prevState];
						// Copy the object (your code wasn't doing that) and update its
						// `selected` property
						update.forEach(findTagItem => {
							if (findTagItem.id === item.id) {
								findTagItem.tags = [
									...findTagItem.tags,
									tagSearch[item.id],
								];
							}
						});
						return update;
					});
				}
			}

			//clear input after submit
			inputs[index].value = '';

			//clear state from input state after submit
			setTagSearch(prevState => ({
				...prevState,
				[item.id]: '',
			}));
		},
		[tagSearch, list, setList, filteredRobots],
	);

	//sets search state on every single change of input
	const tagSetter = (e, item) => {
		setTagSearch(prevState => ({
			...prevState,
			[item.id]: e.target.value,
		}));
	};

	//tag deleter on click function
	const deletetag = (e, items, index, id) => {
		e.stopPropagation();
		e.preventDefault();
		//creating a new list with the tags removed within the nested array :)
		let newList = [...list];

		newList.forEach(robot => {
			if (robot.id === id) {
				console.log(id);
				console.log(robot.id);

				robot.tags.splice(index, 1);
			}
		});

		setList(newList);
	};

	if (list.length === 0 || !list) {
		return (
			<div className='loadingText'>
				<LoaderSpinner />
			</div>
		);
	} else {
		return filteredRobots.map((item, index) => {
			return (
				<div className='RoboFrame' key={item.id}>
					<div className='portpic'>
						<img src={item.pic} alt='Robopic' />
					</div>
					<div className='details'>
						<div className='name'>
							{item.firstName.toUpperCase()}{' '}
							{item.lastName.toUpperCase()}
						</div>

						<div className='minordetails'>
							<div className='email'>Email: {item.email}</div>
							<div className='company'>
								Company: {item.company}
							</div>
							<div className='skill'>Skill: {item.skill}</div>
							<div className='average'>
								Average: {averageFinder(item.grades)}%
							</div>
							<TagList
								item={item}
								index={index}
								deletetag={deletetag}
							/>
							<form onSubmit={e => handleSubmit(e, item, index)}>
								<input
									onChange={e => tagSetter(e, item)}
									className='tagsearch'
									type='text'
									placeholder='Add a tag'></input>
							</form>
							<div className='allTests'>
								{item.grades.map((test, index2) => {
									return (
										<Collapse
											initialStyle={{
												marginBottom: 0,
											}}
											isOpened={activeIndex[item.id]}
											key={index2}>
											<div className={`totals`}>
												<div className='test'>{`Test ${index2 +
													1}:`}</div>
												<div className='score'>{`${test}%`}</div>
											</div>
										</Collapse>
									);
								})}
							</div>
						</div>
					</div>
					<div className='plusButton'>
						<div className='innerBox'>
							<input
								type='checkbox'
								onClick={() => showtest(item)}
							/>
							<button>
								<span></span>
								<span></span>
							</button>
						</div>
					</div>
				</div>
			);
		});
	}
};
export default RobotList;
