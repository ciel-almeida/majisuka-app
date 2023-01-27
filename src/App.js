import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MemberForm from './components/MemberForm/MemberForm';
import MembersList from './components/MembersList/MembersList';
import { MembersProvider } from './contexts/members-context';

function App() {
	const [isFormActive, setIsFormActive] = useState(false);

	function formHandler() {
		// e.preventDefault();
		setIsFormActive(prevState => {
			return !prevState;
		});
	}

	return (
		<div className="App">
			<MembersProvider>
				<Header isFormActive={isFormActive} formHandler={formHandler} />
				{isFormActive && <MemberForm formHandler={formHandler} />}
				<MembersList />
			</MembersProvider>
		</div>
	);
}

export default App;
