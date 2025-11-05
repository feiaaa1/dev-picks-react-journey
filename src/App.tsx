import { useState } from "react";
import "./App.css";
import ResourceList from "./components/ResourceList";

function App() {
	const [count, setCount] = useState(0);

	const initialResources = [
		{ id: 1, title: "React Docs", url: "react.dev" },
		{ id: 2, title: "TypeScript Docs", url: "typescriptlang.org" },
		{
			id: 3,
			title: "Tailwind Docs",
			url: "tailwindcss.com",
		},
		{ id: 4, title: "Vite Docs", url: "vitejs.dev" },
		{ id: 5, title: "React Docs", url: "react.dev" },
	];

	return (
		<>
			<div>
				<ResourceList initialResources={initialResources} />
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
