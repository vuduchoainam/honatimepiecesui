import "./App.scss";
import Header from "./components/Header";
import TableCategory from "./components/TableCategory";

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<Header />
			<div className="container p-4 mx-auto">
				<TableCategory />
			</div>
		</div>
	);
}

export default App;
