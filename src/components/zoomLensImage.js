import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ZoomLensImage extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {

		var mainSize = this.props.size;

		function zoomLens(imageElement, resultElement) {

			var image,
				lens,
				result,
				coordinates_x,
				coordinates_y;

			image = document.querySelector(imageElement);
			result = document.querySelector(resultElement);

			lens = document.createElement("DIV");
			lens.style.border = "0.5px solid #000";
			lens.style.position = "absolute";
			lens.style.width = mainSize;
			lens.style.height = mainSize;

			image.parentElement.insertBefore(lens, image);

			coordinates_x = (result.offsetWidth / lens.offsetWidth) * 0.25;
			coordinates_y = (result.offsetHeight / lens.offsetHeight) * 0.25;

			result.style.backgroundImage = "url('" + image.src + "')";
			result.style.backgroundSize = (image.width * coordinates_x) + "px " + (image.height * coordinates_y) + "px";

			lens.addEventListener("mousemove", movingLens);
			image.addEventListener("mousemove", movingLens);

			lens.addEventListener("touchmove", movingLens);
			image.addEventListener("touchmove", movingLens);

			function movingLens(e) {

				var pos,
					x,
					y;

				e.preventDefault();

				pos = getCursorPosition(e, image);

				x = pos.x - (lens.offsetWidth / 2);
				y = pos.y - (lens.offsetHeight / 2);

				if (x > image.width - lens.offsetWidth) {

					x = image.width - lens.offsetWidth;

				}

				if (x < 0) {

					x = 0;

				}

				if (y > image.height - lens.offsetHeight) {

					y = image.height - lens.offsetHeight;

				}

				if (y < 0) {

					y = 0;

				}

				lens.style.left = x + "px";
				lens.style.top = y + "px";

				result.style.backgroundPosition = "-" + (x * coordinates_x) + "px -" + (y * coordinates_y) + "px";

			}

		}

		function zoomMagnifyingGlasses(imageElement, zoomLevel) {

			var image, 
				lens, 
				width, 
				height;

			image = document.querySelector(imageElement);

			lens = document.createElement("DIV");
			lens.style.position = "absolute";
			lens.style.border = "1px solid #000";
			lens.style.borderRadius = "25px";
			lens.style.cursor = "none";
			lens.style.width = mainSize;
			lens.style.height = mainSize;

			image.parentElement.insertBefore(lens, image);

			lens.style.backgroundImage = "url('" + image.src + "')";
			lens.style.backgroundRepeat = "no-repeat";
			lens.style.backgroundSize = (image.width * zoomLevel) + "px " + (image.height * zoomLevel) + "px";

			width = lens.offsetWidth / 2;
			height = lens.offsetHeight / 2;

			lens.addEventListener("mousemove", movingMagnifier);
			image.addEventListener("mousemove", movingMagnifier);

			lens.addEventListener("touchmove", movingMagnifier);
			image.addEventListener("touchmove", movingMagnifier);

			function movingMagnifier(e) {

				var pos, 
					x, 
					y;

				e.preventDefault();

				pos = getCursorPosition(e, image);

				x = pos.x;
				y = pos.y;

				if (x > image.width - (width / zoomLevel)) {

					x = image.width - (width / zoomLevel);

				}

				if (x < width / zoomLevel) {

					x = width / zoomLevel;

				}

				if (y > image.height - (height / zoomLevel)) {

					y = image.height - (height / zoomLevel);

				}

				if (y < height / zoomLevel) {

					y = height / zoomLevel;

				}

				lens.style.left = (x - width) + "px";
				lens.style.top = (y - height) + "px";

				lens.style.backgroundPosition = "-" + ((x * zoomLevel) - width) + "px -" + ((y * zoomLevel) - height) + "px";

			}

		}

		// Help functions

		function getCursorPosition(e, imageElement) {

			var image,
				position_x = 0,
				position_y = 0;

			e = e || window.event;

			image = imageElement.getBoundingClientRect();

			position_x = e.pageX - image.left;
			position_y = e.pageY - image.top;

			position_x = position_x - window.pageXOffset;
			position_y = position_y - window.pageYOffset;

			return { x: position_x, y: position_y };

		}

		//zoomLens("#" + this.props.id, ".zoom--lens--image--container");
		zoomMagnifyingGlasses("#" + this.props.id, this.props.zoomLevel);

	}

	render() {
		const container = {
			position: "relative"
		};
		return (
			<div className="zoom--lens--image--container" style={container}>
				<img id={this.props.id} className={this.props.class} src={this.props.imagename} width={this.props.width} height={this.props.height} alt={this.props.alttext}/>
			</div>
	);
	}
}

ZoomLensImage.propTypes = {
	width: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	imagename: PropTypes.string.isRequired,
	alttext: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	class: PropTypes.string,
	zoomLevel: PropTypes.number.isRequired
}
