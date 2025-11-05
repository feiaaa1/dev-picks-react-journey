export type ResourceItemProps = {
	resource: { id: number; title: string; url: string };
};

export default function ResourceItem({ resource }: ResourceItemProps) {
	return (
		<div>
			<li key={resource.id}>
				<a
					href={`https://${resource.url}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					{resource.title}
				</a>
			</li>
		</div>
	);
}
