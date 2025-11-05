import { useState } from "react";
import "./App.css";
import ResourceList from "./components/ResourceList";
import ResourceListWithFilters from "./components/ResourceListWithFilters";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<ResourceList />
				<ResourceListWithFilters />
			</div>
			<h1 className="text-amber-300">Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
