import "./App.scss";
import Header from "./components/Header";
import TableCategory from "./components/TableCategory";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<>
			<div className="min-h-screen bg-gray-100">
				<Header />
				<div className="container p-4 mx-auto">
					<TableCategory />
				</div>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</div>
		</>
	);
}

export default App;
