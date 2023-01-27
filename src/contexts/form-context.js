import React, { createContext, useState } from 'react';

// 1 Step - Creating a context with the default value
export const FormContext = createContext({});

export function FormContextProvider(props) {
	const [isFormActive, setIsFormActive] = useState(false);
	const [errorModal, setErrorModal] = useState({ isActive: false, message: '' });

	const [fullName, setFullName] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [age, setAge] = useState('');

	function formHandler() {
		setIsFormActive(prevState => {
			return !prevState;
		});
	}

	const errorModalHandler = () => {
		setErrorModal({ isActive: false, message: '' });
	};

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
		if (description === '') {
			setErrorModal({
				isActive: true,
				message:
					'The description is missing. Write a description for the new member and try again.',
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
		props.addMember(newMember);
		resetState();
		props.formHandler();
	}

	function resetState() {
		setFullName('');
		setDescription('');
		setAge('');
		setImage('');
	}
	return (
		<FormContextProvider.Provider value={formHandler}>
			{props.children}
		</FormContextProvider.Provider>
	);
}
