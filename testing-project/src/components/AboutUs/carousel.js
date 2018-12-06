import React, { Component } from 'react';
import styled from 'styled-components'

let percent;
const styles = { transition: 'all 1s linear' }

function resp(){
	if(window.innerWidth <= 500){
		percent = 90
	}else{
		percent = 70
	}
}

resp()

window.onresize=function(){ resp() }


// styled carousel

const CarouselContainer = styled.div`
  width: 960px;
  max-width: 100%;
  margin: 10px auto;
  padding-bottom: 60%; 
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`

const ContainerItem = styled.div`
  position: relative;
  display: flex;
  width: 3200px;
  max-width: 333.3%;
  padding: 5px;
  box-sizing: border-box;
  @media screen and (max-width: 500px){
    max-width: unset;
    width: 1000%;
  }
`

const ListItem = styled.div`
  padding: 20px;
  box-sizing: border-box;
  width: 10%;
  position: relative;
  text-align: center;
  font-size: 1.2em;
  padding: 0 10px 0 10px;
`

const Cont = styled.div`
  box-shadow: 0px 0px 10px #000000;
  padding: 5px;
  box-sizing: border-box;
`

const ImgContent = styled.div`
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
`
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`
const ArrowContent = styled.div`text-align: center;`

const Arrow = styled.span`
  display: inline-block;
  margin: 15px;
  padding: 8px 12px;
  background: red;
  color:#ffffff;
  cursor: pointer;
  border-radius: 4px;
`

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
			],
			translate : 0
		}
	}

	componentDidMount () {
		setInterval(() => {
			this.setState({ translate : this.state.translate === -percent ? 0 : this.state.translate - 10 })
		},10000)
	}

	ToLeft () {
		this.setState({ translate : this.state.translate === 0 ? -percent : this.state.translate + 10 })
	}	

	ToRight () {
		this.setState({ translate : this.state.translate === -percent ? 0 : this.state.translate - 10 })
	}

	render(){
		return (
			<div>
				<ArrowContent className="arrows">
					<Arrow onClick={this.ToLeft.bind(this)}>Left</Arrow>
					<Arrow onClick={this.ToRight.bind(this)}>Right</Arrow>
				</ArrowContent>
				<CarouselContainer>
					<ContainerItem style={{ ...styles, transform: `translateX(${this.state.translate}%)` }}>
					{
						this.state.comments.map( (item, index) => {
							return (
								<ListItem key={index}>
									<Cont>
										<ImgContent>
											<Image src={item.image} />
										</ImgContent>
										<h2>{item.name}</h2>
										<p>{item.description}</p>
									</Cont>
								</ListItem>
							);
						} )
					}
					</ContainerItem>
				</CarouselContainer>
			</div>
		);
	}
}