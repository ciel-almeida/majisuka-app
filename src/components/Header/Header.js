import React, { useContext } from 'react';
import { MembersContext } from '../../contexts/members-context';

import SpecialButton from '../Buttons/SpecialButton';
import './Header.css';

function Header(props) {
	const membersCtx = useContext(MembersContext);

	return (
		<header className="p-header">
			<h1 className="p-header__title">Majisuka Gakuen</h1>
			<SpecialButton formHandler={props.formHandler}>Add Member</SpecialButton>
		</header>
	);
}

export default Header;
