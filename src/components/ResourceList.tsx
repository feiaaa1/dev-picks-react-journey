interface ResourceListItem {
	id: number;
	title: string;
	url: string;
}

import ResourceItem from "./ResourceItem";
import useResources from "../hooks/useResources";
import { useState } from "react";

export default function ResourceList() {
	const { resources, loading, error, fetchResources, deleteResource } = useResources();
	
	// 添加资源相关的状态
	const [newTitle, setNewTitle] = useState<string>("");
	const [newUrl, setNewUrl] = useState<string>("");

	// 添加资源
	const handleAdd = () => {
		if (!newTitle.trim() || !newUrl.trim()) {
			alert("请输入标题和URL");
			return;
		}

		const newResource: ResourceListItem = {
			id: Math.max(...resources.map(r => r.id)) + 1,
			title: newTitle.trim(),
			url: newUrl.trim()
		};

		// 这里可以调用 API 添加资源，然后刷新列表
		// 暂时直接更新本地状态
		// setResources([...resources, newResource]);
		fetchResources(); // 重新获取数据来刷新列表
		setNewTitle("");
		setNewUrl("");
	};

	return (
		<div style={{ padding: '20px' }}>
			<h1>Resource List</h1>
			
			{/* 加载状态 */}
			{loading && <p>正在加载数据...</p>}
			{error && <p style={{ color: 'red' }}>错误: {error}</p>}
			
			{/* 添加资源表单 */}
			<div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
				<h3>添加新资源</h3>
				<input
					type="text"
					placeholder="请输入标题"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					style={{ marginRight: '10px', padding: '5px' }}
				/>
				<input
					type="text"
					placeholder="请输入URL"
					value={newUrl}
					onChange={(e) => setNewUrl(e.target.value)}
					style={{ marginRight: '10px', padding: '5px' }}
				/>
				<button onClick={handleAdd} style={{ padding: '5px 10px' }}>
					添加资源
				</button>
			</div>

			{/* 删除资源 */}
			<div style={{ marginBottom: '20px' }}>
				{resources.map((resource) => (
					<div key={resource.id} style={{ marginBottom: '5px' }}>
						<span style={{ marginRight: '10px' }}>{resource.title}</span>
						<button 
							onClick={() => deleteResource(resource.id)}
							style={{ padding: '2px 5px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '3px' }}
						>
							删除
						</button>
					</div>
				))}
			</div>

			{/* 资源列表 */}
			<ul>
				{resources.map((resource) => (
					<ResourceItem key={resource.id} resource={resource} />
				))}
			</ul>

			{/* 操作按钮 */}
			<div style={{ marginTop: '20px' }}>
				<button 
					onClick={fetchResources}
					disabled={loading}
					style={{ marginRight: '10px', padding: '5px 10px' }}
				>
					{loading ? '刷新中...' : '刷新数据'}
				</button>
			</div>
		</div>
	);
}
