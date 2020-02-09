import React from 'react';
import logo from './logo.svg';
import './App.css';

import ZoomLensImage from './components/zoomLensImage';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<section className="content">
				<ZoomLensImage
          id="image-test"
          size="50px"
          width="600"
          height="400"
          imagename="https://www.scinexx.de/wp-content/uploads/0/1/01-34892-supernova.jpg"
          alttext="Supernova"
        >
        </ZoomLensImage>
			</section>
			<footer className="App-footer">
				(c) Copyright - Mike Ludemann
			</footer>
		</div>
	);
}

export default App;
