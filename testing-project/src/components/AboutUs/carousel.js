import React, { Component } from 'react';

export default class Carousel extends Component {
	constructor(props){
		super(props);

		this.state = {
			comments : [
				{
					image: "https://images.pexels.com/photos/213117/pexels-photo-213117.jpeg?cs=srgb&dl=businessman-fashion-man-213117.jpg&fm=jpg",
					name: "Lorem Ipsum 1",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
				},
				{
					image: "https://st2.depositphotos.com/2018581/9129/i/950/depositphotos_91292758-stock-photo-serious-businessman-giving-hand-for.jpg",
					name: "Lorem Ipsum 1",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
				},
				{
					image: "https://image.shutterstock.com/mosaic_250/0/0/1016723143.jpg",
					name: "Lorem Ipsum 1",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
				},
				{
					image: "https://img.freepik.com/fotos-gratis/retrato-de-jovem-homem-negocios-apontar-algo-olhar_23-2147847521.jpg?size=338&ext=jpg",
					name: "Lorem Ipsum 1",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
				},
				{
					image: "https://ak2.picdn.net/shutterstock/videos/10547162/thumb/1.jpg",
					name: "Lorem Ipsum 1",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
				},
				{
					image: "https://cdn1.thr.com/sites/default/files/2015/03/chris_daughtry.jpg",
					name: "Lorem Ipsum 1",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
				},
				{
					image: "https://www.mclh.co.uk/media/4920/key-people-profile-philip-cheevers.jpg",
					name: "Lorem Ipsum 1",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
				},
				{
					image: "https://www.csail.mit.edu/sites/default/files/styles/headshot/public/images/migration/weitzner.jpg?h=5636fc5d&itok=X7Ya8VXU",
					name: "Lorem Ipsum 1",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
				},
				{
					image: "https://www.csail.mit.edu/sites/default/files/styles/headshot/public/images/people/profile/Gerald%20Sussman.jpg?h=672a6d71&itok=BrGf0GcQ",
					name: "Lorem Ipsum 1",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
				},
				{
					image: "https://www.csail.mit.edu/sites/default/files/styles/headshot/public/images/migration/abelson.jpg?h=5636fc5d&itok=ttD7eWss",
					name: "Lorem Ipsum 1",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
				}
			]
		}
	}

	ToLeft () {

	}	

	ToRight () {

	}

	render(){
		return (
			<div>
				<div className="arrows">
					<span onClick={() => this.ToLeft}>Left</span>
					<span onClick={() => this.ToRight}>Right</span>
				</div>
				<div className="container">
					<div className="container-item">
					{
						this.state.comments.map( (item, index) => {
							return (
								<div key={index} className="list-item">
									<div className="cont">
										<div className="img-content">
											<img src={item.image} />
										</div>
										<h2>{item.name}</h2>
										<p>
											{item.description} 
										</p>
									</div>
								</div>
							);
						} )
					}
					</div>
				</div>
			</div>
		);
	}
}