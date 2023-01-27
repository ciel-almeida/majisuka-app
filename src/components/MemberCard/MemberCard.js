import React, { useState } from 'react';
import EditMemberModal from '../EditMemberModal/EditMemberModal';
import './MemberCard.css';
// import deleteSvg from '../../assets/svgs/delete.svg';
// import editSvg from '../../assets/svgs/edit.svg';

function MemberCard(props) {
	const [isEditModalActive, setEditModalActive] = useState(false);
	const { member } = props;

	function deleteMember() {
		props.deleteMember(member.id);
	}

	function openEditMemberModal() {
		setEditModalActive(true);
	}
	function closeEditMemberModal() {
		setEditModalActive(false);
	}

	return (
		<li key={member.id} className="mb-list__item">
			<article className="mb-list__item-wrapper">
				<div className="mb-list__img-container">
					<img className="mb-list__img" src={member.image} alt={member.fullName} />
				</div>
				<div className="mb-list__info-container">
					<h3 className="mb-list__info-title">
						{member.fullName}, <span>{member.age}y</span>
					</h3>
					<p className="mb-list__description">{member.description}</p>
				</div>
				<div className="mb-list__btn-container">
					<button
						className="mb-list__card-btn mb-list__card-btn--edit"
						onClick={openEditMemberModal}
					>
						<i className="fa-solid fa-pen-to-square"></i>
					</button>
					<button className="mb-list__card-btn mb-list__card-btn--delete" onClick={deleteMember}>
						<i className="fa-solid fa-trash"></i>
					</button>
				</div>
			</article>
			{isEditModalActive && (
				<EditMemberModal closeEditMemberModal={closeEditMemberModal} member={member} />
			)}
		</li>
	);
}

export default MemberCard;
