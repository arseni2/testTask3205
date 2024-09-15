import Form, {formDataType} from "./components/Form.tsx";
import UsersList from "./components/UsersList.tsx";
import {useState} from "react";

function App() {
	const [users, setUsers] = useState<formDataType[]>([])
	return (
		<>
			<div>
				<Form setUsers={setUsers}/>
				<UsersList users={users} />
			</div>
		</>
	)
}

export default App
