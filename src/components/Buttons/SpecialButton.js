import React from 'react';
import './SpecialButton.css';

function SpecialButton(props) {
	return (
		<button className="btn btn__special" onClick={props.formHandler}>
			{props.children}
		</button>
	);
}

export default SpecialButton;
