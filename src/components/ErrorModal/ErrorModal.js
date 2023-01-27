import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { MembersContext } from '../../contexts/members-context';
import './ErrorModal.css';

function ErrorModal(props) {
	const portalTarget = document.getElementById('modal-root');
	// const portalTarget = document.getElementsById('root');
	const modalContent = (
		<div onClick={props.errorModalHandler} className="overlay">
			<div onClick={e => e.stopPropagation()} className="err-modal">
				<h3 className="err-modal__title">Error</h3>
				<p className="err-modal__description">{props.errorMessage}</p>
				<button onClick={props.errorModalHandler} className="err-modal__btn">
					Close
				</button>
			</div>
		</div>
	);

	return <>{ReactDOM.createPortal(modalContent, portalTarget)}</>;
}

export default ErrorModal;
