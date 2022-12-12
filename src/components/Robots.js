import React, { useEffect, useState } from 'react';
import fetchApi from '../apis/fetchApi';
import './Robots.css';
import SearchBox from './SearchBox';
import RobotList from './RobotList';

function Robots() {
	const [list, setList] = useState([]);
	const [searchWord, setSearchWord] = useState('');
	const [searchwordTag, setSearchwordTag] = useState('');
	const [activeIndex, setActiveIndex] = useState({});

	//fetching list of Robot Canidates
	useEffect(() => {
		const fetchlist = async () => {
			const res = await fetchApi.get();
			if (res.status !== 200) {
				throw new Error('Error, fetching the data');
			}

			let list = res.data.students;

			//premptively creating tag array within each object
			// can remove if refactor handleSubmit to create arrays then
			list.forEach(item => {
				item.tags = [];
			});

			setList(list);
		};

		//intentional timeout to show loader
		//! REMOVE DURING PRODUCTION
		setTimeout(() => {
			fetchlist();
		}, 1500);
	}, []);

	// controlled component for search input
	const onSearchChange = event => {
		setSearchWord(event.target.value);
	};

	// controlled component for tag search inpuit
	const onTagChange = event => {
		setSearchwordTag(event.target.value);
	};

	// filtering based on multiple parameters

	const filteredRobots = list.filter(function(item) {
		let fullname = `${item.firstName} ${item.lastName}`;
		let tagList = item.tags.toString();
		let uplist =
			(item.firstName
				.toLowerCase()
				.trim()
				.includes(searchWord.toLowerCase()) ||
				item.lastName
					.toLowerCase()
					.includes(searchWord.toLowerCase()) ||
				fullname
					.toLowerCase()
					.trim()
					.includes(searchWord.toLowerCase())) &&
			tagList.includes(searchwordTag.toLowerCase());

		return uplist;
	});

	return (
		<div className='wrapper'>
			<div className='RoboList'>
				<div className='searchboxesWrapper'>
					<SearchBox
						searchChange={onSearchChange}
						searchWord={searchWord}
						placeholder={'Search by name'}
					/>
					<SearchBox
						searchChange={onTagChange}
						searchWord={searchwordTag}
						placeholder={'Search by tag'}
					/>
				</div>

				{
					<RobotList
						list={list}
						setList={setList}
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
						searchwordTag={searchwordTag}
						filteredRobots={filteredRobots}
					/>
				}
			</div>
		</div>
	);
}

export default Robots;
