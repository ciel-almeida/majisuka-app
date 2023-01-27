import React, { useContext, useState } from 'react';
import { MembersContext } from '../../contexts/members-context';
import SimpleButton from '../Buttons/SimpleButton';
import ErrorModal from '../ErrorModal/ErrorModal';
import './MemberForm.css';

function MemberForm(props) {
	const membersCtx = useContext(MembersContext);
	const [errorModal, setErrorModal] = useState({ isActive: false, message: '' });

	const [fullName, setFullName] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [age, setAge] = useState('');

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

	function resetState() {
		setFullName('');
		setDescription('');
		setAge('');
		setImage('');
	}

	function submitHandler(event) {
		event.preventDefault();

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

		const newMember = {
			fullName,
			image,
			description,
			age,
		};
		membersCtx.addMemberHandler(newMember);
		resetState();
		props.formHandler();
	}

	return (
		<section className={'mb-form__container'}>
			<form className={'mb-form__form'} onSubmit={submitHandler}>
				<h2 className="mb-form__title">New member</h2>
				<div className="mb-form__input-wrapper">
					<label className="mb-form__label" htmlFor="fullName">
						Full Name:
					</label>
					<input
						onChange={fullNameHandler}
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
						className="mb-form__input"
						type="number"
						name="age"
						id="age"
						placeholder="Member age"
					/>
				</div>
				<div className="mb-form__btn-wrapper">
					<button className="mb-form__btn mb-form__btn--add" type="submit">
						Add
					</button>
					<button className="mb-form__btn mb-form__btn--close" onClick={props.formHandler}>
						Close
					</button>
				</div>
			</form>
			{errorModal.isActive && (
				<ErrorModal errorModalHandler={errorModalHandler} errorMessage={errorModal.message} />
			)}
		</section>
	);
}

export default MemberForm;
