import React, { Component } from 'react';
import src from '../../images/is.jpg';

export default class AllTests extends Component {
	render(){
		const languages = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		return (
			<div className="container-fluid">
				<div className="searching">
					<select className="searchingSelect">
						<option classname="hidden" value="">All Types</option>
						{languages.map( item => <option key={item} value={item}>{item}</option> )}
					</select>
					<input type="text" className="search" placeholder="Search" />
					<span>8/200</span>
				</div>
				<div className="content-grid">
					<div className="grid">
						<img src={src} alt="Type test" />
						<div className="grid-info">
							<p className="blue">Javascript - JS Foundation</p>
							<p className="yellow">PicsArt</p>
							<p><span>Passes: </span><span className="blue">1850</span></p>
							<p><span>DeadLine: </span><span className="blue">08/12/2018</span></p>
							<botton className="addButton"><span >Add</span> <span className='add'>></span></botton>
						</div>
					</div>
					<div className="grid">
						<img src={src} alt="Type test" />
						<div className="grid-info">
							<p className="blue">Javascript - JS Foundation</p>
							<p className="yellow">PicsArt</p>
							<p><span>Passes: </span><span className="blue">1850</span></p>
							<p><span>DeadLine: </span><span className="blue">08/12/2018</span></p>
							<botton className="addButton"><span >Add</span> <span className='add'>></span></botton>
						</div>
					</div>
					<div className="grid">
						<img src={src} alt="Type test" />
						<div className="grid-info">
							<p className="blue">Javascript - JS Foundation</p>
							<p className="yellow">PicsArt</p>
							<p><span>Passes: </span><span className="blue">1850</span></p>
							<p><span>DeadLine: </span><span className="blue">08/12/2018</span></p>
							<botton className="addButton"><span >Add</span> <span className='add'>></span></botton>
						</div>
					</div>
					<div className="grid">
						<img src={src} alt="Type test" />
						<div className="grid-info">
							<p className="blue">Javascript - JS Foundation</p>
							<p className="yellow">PicsArt</p>
							<p><span>Passes: </span><span className="blue">1850</span></p>
							<p><span>DeadLine: </span><span className="blue">08/12/2018</span></p>
							<botton className="addButton"><span >Add</span> <span className='add'>></span></botton>
						</div>
					</div>
					<div className="grid">
						<img src={src} alt="Type test" />
						<div className="grid-info">
							<p className="blue">Javascript - JS Foundation</p>
							<p className="yellow">PicsArt</p>
							<p><span>Passes: </span><span className="blue">1850</span></p>
							<p><span>DeadLine: </span><span className="blue">08/12/2018</span></p>
							<botton className="addButton"><span >Add</span> <span className='add'>></span></botton>
						</div>
					</div>
					<div className="grid">
						<img src={src} alt="Type test" />
						<div className="grid-info">
							<p className="blue">Javascript - JS Foundation</p>
							<p className="yellow">PicsArt</p>
							<p><span>Passes: </span><span className="blue">1850</span></p>
							<p><span>DeadLine: </span><span className="blue">08/12/2018</span></p>
							<botton className="addButton"><span >Add</span> <span className='add'>></span></botton>
						</div>
					</div>
					<div className="grid">
						<img src={src} alt="Type test" />
						<div className="grid-info">
							<p className="blue">Javascript - JS Foundation</p>
							<p className="yellow">PicsArt</p>
							<p><span>Passes: </span><span className="blue">1850</span></p>
							<p><span>DeadLine: </span><span className="blue">08/12/2018</span></p>
							<botton className="addButton"><span >Add</span> <span className='add'>></span></botton>
						</div>
					</div>
					<div className="grid">
						<img src={src} alt="Type test" />
						<div className="grid-info">
							<p className="blue">Javascript - JS Foundation</p>
							<p className="yellow">PicsArt</p>
							<p><span>Passes: </span><span className="blue">1850</span></p>
							<p><span>DeadLine: </span><span className="blue">08/12/2018</span></p>
							<botton className="addButton"><span >Add</span> <span className='add'>></span></botton>
						</div>
					</div>
				</div>
			</div>
		);
	}
}