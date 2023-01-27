import React, { createContext, useState } from 'react';
import mgMembers from '../data/mgMembers';

// 1 Step - Creating a context with the default value
// 2 Step - Provider of the context that will wrapp the components that need the state
// 3 Step - State that will be shared

export const MembersContext = createContext({}); // Step 1

export function MembersProvider(props) {
	// Step 3
	const storedMembers = localStorage.getItem('savedMembers');
	const membersArray = JSON.parse(storedMembers);

	const [members, setMembers] = useState(membersArray ? [...membersArray] : []);
	const [isAscendingActive, setIsAscendingActive] = useState(true);

	function ascendingListHandler(conditional) {
		if (conditional) {
			setMembers(prevList => {
				const membersData = [...prevList];
				return membersData.sort((a, b) => a.id - b.id);
			});
			setIsAscendingActive(true);
		} else {
			setMembers(prevList => {
				const membersData = [...prevList];
				return membersData.sort((a, b) => b.id - a.id);
			});
			setIsAscendingActive(false);
		}
	}

	function addMemberHandler(member) {
		member.id = members.length + 1;
		setMembers(prevState => {
			if (isAscendingActive) {
				return [...prevState, member];
			}
			return [member, ...prevState];
		});
	}

	function loadDemoMembers() {
		setMembers(prevState => {
			if (members.length === 0) {
				return [...mgMembers];
			} else {
				const tam = members.length;
				const membersWithUpdatedId = mgMembers.map((member, index) => {
					const id = +tam + index + 1;
					const memberData = Object.assign({}, member);
					memberData.id = id;
					return memberData;
				});
				return [...prevState, ...membersWithUpdatedId];
			}
		});
		ascendingListHandler(isAscendingActive);
	}

	function editMember(memberUpdatedData) {
		const memberId = memberUpdatedData.id;
		setMembers(prevState => {
			const updatedMembers = prevState.map(member => {
				if (member.id === memberId) {
					member.fullName = memberUpdatedData.fullName;
					member.image = memberUpdatedData.image;
					member.description = memberUpdatedData.description;
					member.age = memberUpdatedData.age;
				}
				return member;
			});
			return updatedMembers;
		});
	}

	function getMemberData(id) {
		const memberData = members.filter(member => {
			return member.id === id;
		});
		return memberData;
	}

	function deleteMember(id) {
		setMembers(prevState => {
			return prevState.filter(member => {
				return member.id !== id;
			});
		});
	}

	function clearAllMembers() {
		setMembers([]);
	}

	function saveInStorage() {
		localStorage.setItem('savedMembers', JSON.stringify(members));
	}

	function clearStorage() {
		localStorage.removeItem('savedMembers');
		// clearAllMembers();
	}

	return (
		// Step 2
		<MembersContext.Provider
			value={{
				members,
				// setMembers,
				addMemberHandler,
				loadDemoMembers,
				editMember,
				deleteMember,
				clearAllMembers,
				getMemberData,
				isAscendingActive,
				ascendingListHandler,
				saveInStorage,
				clearStorage,
			}}
		>
			{props.children}
		</MembersContext.Provider>
	);
}
