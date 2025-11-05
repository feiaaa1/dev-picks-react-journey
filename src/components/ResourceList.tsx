interface ResourceListItem {
	id: number;
	title: string;
	url: string;
}

import ResourceItem from "./ResourceItem";
import { useState } from "react";

export default function ResourceList() {
	const [initialResources, setInitialResources] = useState<ResourceListItem[]>([
		{ id: 1, title: "React Docs", url: "react.dev" },
		{ id: 2, title: "TypeScript Docs", url: "typescriptlang.org" },
		{
			id: 3,
			title: "Tailwind Docs",
			url: "tailwindcss.com",
		},
		{ id: 4, title: "Vite Docs", url: "vitejs.dev" },
		{ id: 5, title: "React Docs", url: "react.dev" },
	]);

	const [inputId, setInputId] = useState<string>("");

	return (
		<div>
			<h1>Resource List</h1>
			<ul>
				{initialResources.map((resource) => (
					<ResourceItem resource={resource} />
				))}
			</ul>
			<button
				onClick={() => {
					setInitialResources([
						...initialResources,
						{
							id: initialResources.length + 1,
							title: "New Resource",
							url: "newresource.com",
						},
					]);
				}}
			>
				添加
			</button>
			<input
				type="text"
				placeholder="请输入要删除的id"
				onInput={(e) => setInputId(e.target.value)}
				value={inputId}
			/>
			<button
				onClick={() => {
					setInitialResources(
						initialResources.filter((item) => item.id.toString() !== inputId)
					);
				}}
			>
				{" "}
				删除
			</button>
		</div>
	);
}
