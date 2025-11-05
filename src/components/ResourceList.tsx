interface ResourceListProps {
	initialResources: {
		id: number;
		title: string;
		url: string;
	}[];
}

import ResourceItem from "./ResourceItem";

export default function ResourceList({ initialResources }: ResourceListProps) {
	return (
		<div>
			<h1>Resource List</h1>
			<ul>
				{initialResources.map((resource) => (
					<ResourceItem resource={resource} />
				))}
			</ul>
		</div>
	);
}
