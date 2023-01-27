import React from 'react';
import './SimpleButton.css';

function SimpleButton(props) {
	return <button className="btn btn__simple">{props.children}</button>;
}

export default SimpleButton;
