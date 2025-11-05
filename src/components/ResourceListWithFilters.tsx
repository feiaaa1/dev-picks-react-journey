import useResources from "../hooks/useResources";

// 演示竞争条件修复的测试组件
export default function ResourceListWithFilters() {
	const { resources, loading, error, fetchResources } = useResources();
	
	// 模拟不同的筛选条件
	const handleFilter = async (filter: string) => {
		console.log(`应用筛选条件: ${filter}`);
		
		// 这里可以添加不同的 API 参数来模拟筛选
		// 为了演示，我们只是调用同一个 fetchResources
		await fetchResources();
	};
	
	return (
		<div style={{ padding: '20px' }}>
			<h1>Resource List (防竞争条件测试)</h1>
			
			{/* 筛选按钮 */}
			<div style={{ marginBottom: '20px' }}>
				<h3>筛选条件 (快速点击多个按钮测试防竞争条件):</h3>
				<button 
					onClick={() => handleFilter('recent')} 
					style={{ marginRight: '10px', padding: '5px 10px' }}
				>
					最新
				</button>
				<button 
					onClick={() => handleFilter('popular')} 
					style={{ marginRight: '10px', padding: '5px 10px' }}
				>
					热门
				</button>
				<button 
					onClick={() => handleFilter('category')} 
					style={{ marginRight: '10px', padding: '5px 10px' }}
				>
					分类
				</button>
				<button 
					onClick={() => handleFilter('search')} 
					style={{ marginRight: '10px', padding: '5px 10px' }}
				>
					搜索
				</button>
			</div>
			
			{/* 加载状态 */}
			{loading && <p>正在加载数据...</p>}
			{error && <p style={{ color: 'red' }}>错误: {error}</p>}
			
			{/* 资源列表 */}
			<ul>
				{resources.map((resource) => (
					<li key={resource.id}>
						{resource.title} - {resource.url}
					</li>
				))}
			</ul>
		</div>
	);
}