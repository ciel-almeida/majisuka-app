import React, { useContext, useState } from 'react';
import { MembersContext } from '../../contexts/members-context';
import MemberCard from '../MemberCard/MemberCard';
import './MembersList.css';

function MembersList() {
	const membersCtx = useContext(MembersContext);

	return (
		<section className="mb-list">
			<h2 className="mb-list__title">Members</h2>

			{/* Control Buttons */}
			<div className="mb-list__buttons-wrapper">
				<button className="mb-list__btn" onClick={membersCtx.saveInStorage}>
					<i className="fa-sharp fa-solid fa-floppy-disk"></i> Save in Storage
				</button>
				<button className="mb-list__btn" onClick={membersCtx.clearStorage}>
					<i className="fa-solid fa-eraser"></i> Clear Storage
				</button>
				<button className="mb-list__btn" onClick={membersCtx.clearAllMembers}>
					<i className="fa-solid fa-trash"></i> Delete All
				</button>
				<button className="mb-list__btn" onClick={membersCtx.loadDemoMembers}>
					<i className="fa-sharp fa-solid fa-list"></i> Demo Data
				</button>
				<button
					// className="mb-list__btn mb-list__btn--active"
					className={`${
						membersCtx.isAscendingActive ? 'mb-list__btn mb-list__btn--active' : 'mb-list__btn'
					}`}
					onClick={() => membersCtx.ascendingListHandler(true)}
					// onClick={() => membersCtx.setIsAscendingActive(true)}
				>
					<i className="fa-solid fa-arrow-up"></i>
				</button>
				<button
					// className="mb-list__btn"
					className={
						membersCtx.isAscendingActive ? 'mb-list__btn' : 'mb-list__btn mb-list__btn--active'
					}
					onClick={() => membersCtx.ascendingListHandler(false)}
					// onClick={() => membersCtx.setIsAscendingActive(false)}
				>
					<i className="fa-solid fa-arrow-down"></i>
				</button>
			</div>

			{/* Members Cards Section */}
			{membersCtx.members?.map(member => (
				<MemberCard
					key={member.id}
					member={member}
					editMember={membersCtx.editMember}
					deleteMember={membersCtx.deleteMember}
				/>
			))}
		</section>
	);
}

export default MembersList;
