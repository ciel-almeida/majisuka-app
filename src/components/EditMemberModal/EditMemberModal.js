import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { MembersContext } from '../../contexts/members-context';
import ErrorModal from '../ErrorModal/ErrorModal';
import './EditMemberModal.css';

function EditMemberModal(props) {
	const MembersCtx = useContext(MembersContext);
	const { member } = props;
	const [fullName, setFullName] = useState(member.fullName);
	const [image, setImage] = useState(member.image);
	const [description, setDescription] = useState(member.description);
	const [age, setAge] = useState(member.age);

	const [errorModal, setErrorModal] = useState({ isActive: false, message: '' });
	function errorModalHandler() {
		setErrorModal({ isActive: false, message: '' });
	}

	function fullNameHandler(event) {
		setFullName(event.target.value);
	}

	function imageHandler(event) {
		setImage(event.target.value);
	}

	function descriptionHandler(event) {
		setDescription(event.target.value);
	}

	function ageHandler(event) {
		setAge(event.target.value);
	}

	function formSubmitHandler(e) {
		e.preventDefault();

		// Validations
		if (fullName === '') {
			setErrorModal({
				isActive: true,
				message: 'The name of the new member is missing. Write the full name and try again.',
			});
			return;
		}
		if (image === '') {
			setErrorModal({
				isActive: true,
				message:
					'The profile picture is missing. Insert a image link of the new member and try again.',
			});
			return;
		}
		if (description === '') {
			setErrorModal({
				isActive: true,
				message:
					'The description is missing. Write a description for the new member and try again.',
			});
			return;
		}
		if (age === '' || age < 0) {
			setErrorModal({
				isActive: true,
				message:
					age === ''
						? 'The age is missing. Insert the correct age of the new member and try again.'
						: 'The age can not be negative. Insert the correct age of the new member and try again.',
			});
			return;
		}

		const memberUpdatedData = {
			id: member.id,
			fullName,
			image,
			description,
			age,
		};
		console.log(memberUpdatedData);
		MembersCtx.editMember(memberUpdatedData);
		props.closeEditMemberModal();
	}

	const portalTarget = document.getElementById('modal-root');
	const modalContent = (
		<div onClick={props.closeEditMemberModal} className="overlay">
			<div
				onClick={e => e.stopPropagation()}
				className="mb-form__container mb-form__container--edit"
			>
				<form className={'mb-form__form'}>
					<h2 className="mb-form__title">Edit Member</h2>
					<div className="mb-form__input-wrapper">
						<label className="mb-form__label" htmlFor="fullName">
							Full Name:
						</label>
						<input
							onChange={fullNameHandler}
							value={fullName}
							className="mb-form__input"
							type="text"
							name="fullName"
							id="fullName"
							placeholder="Full name"
						/>
					</div>
					<div className="mb-form__input-wrapper">
						<label className="mb-form__label" htmlFor="imageLink">
							Member Image:
						</label>
						<input
							onChange={imageHandler}
							value={image}
							className="mb-form__input"
							type="text"
							name="imageLink"
							id="imageLink"
							placeholder="Image link"
						/>
					</div>
					<div className="mb-form__input-wrapper">
						<label className="mb-form__label" htmlFor="description">
							Description:
						</label>
						<textarea
							onChange={descriptionHandler}
							value={description}
							className="mb-form__input"
							type="description"
							name="description"
							id="description"
							placeholder="Member description"
						></textarea>
					</div>
					<div className="mb-form__input-wrapper">
						<label className="mb-form__label" htmlFor="age">
							Age:
						</label>
						<input
							onChange={ageHandler}
							value={age}
							className="mb-form__input"
							type="number"
							name="age"
							id="age"
							placeholder="Member age"
						/>
					</div>
					<div className="mb-form__btn-wrapper">
						<button
							className="mb-form__btn mb-form__btn--add"
							type="submit"
							onClick={formSubmitHandler}
						>
							Save
						</button>
						<button
							className="mb-form__btn mb-form__btn--close"
							onClick={props.closeEditMemberModal}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
			{errorModal.isActive && (
				<ErrorModal errorModalHandler={errorModalHandler} errorMessage={errorModal.message} />
			)}
		</div>
	);

	return <>{ReactDOM.createPortal(modalContent, portalTarget)}</>;
}

export default EditMemberModal;
