import React, { Component, CSSProperties } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./carousel.scss";
const arrowStyles: CSSProperties = {
	position: "absolute",
	zIndex: 2,
	top: "calc(50% - 50px)",
	width: 50,
	height: 50,
	cursor: "pointer",
	border: "none",
	fontSize: "5rem",
	backgroundColor: "transparent",
	color: "white",
};
function MainCarousel() {
	return (
		<div className='main-carousel'>
			<Carousel
				showIndicators={false}
				showThumbs={true}
				showArrows={false}
				swipeable={true}
				showStatus={false}
				renderArrowPrev={(onClickHandler, hasPrev, label) =>
					hasPrev && (
						<button
							type='button'
							id='prevArrow'
							onClick={onClickHandler}
							title={label}
							style={{ ...arrowStyles, left: 15 }}>
							&#8249;
						</button>
					)
				}
				renderArrowNext={(onClickHandler, hasNext, label) =>
					hasNext && (
						<button
							type='button'
							id='nextArrow'
							onClick={onClickHandler}
							title={label}
							style={{ ...arrowStyles, right: 15 }}>
							&#8250;
						</button>
					)
				}>
				<div>
					<img
						alt='main'
						src='https://s3.eu-north-1.amazonaws.com/semantix-com/content-images/_articleHeroBelow/medical-translations-1920x860.jpg?mtime=20200109140116&focal=none&tmtime=20200826145613'
					/>
					<p
						style={{ backgroundColor: "red" }}
						className='legend mb-5'>
						Legend 1
					</p>
				</div>
				<div>
					<img
						alt='main'
						src='https://s3.eu-north-1.amazonaws.com/semantix-com/content-images/_articleHeroBelow/medical-translations-1920x860.jpg?mtime=20200109140116&focal=none&tmtime=20200826145613'
					/>
					<p className='legend'>Legend 2</p>
				</div>
				<div>
					<img
						alt='main'
						src='https://s3.eu-north-1.amazonaws.com/semantix-com/content-images/_articleHeroBelow/medical-translations-1920x860.jpg?mtime=20200109140116&focal=none&tmtime=20200826145613'
					/>
					<p className='legend'>Legend 3</p>
				</div>
			</Carousel>
		</div>
	);
}

export default MainCarousel;
