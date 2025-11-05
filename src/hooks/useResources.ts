import { useEffect, useState, useRef } from "react";

interface ResourceListItem {
	id: number;
	title: string;
	url: string;
}

export default function useResources() {
	const [resources, setResources] = useState<ResourceListItem[]>([
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

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// 用于防止竞争条件的状态
	const isMountedRef = useRef<boolean>(true);
	const currentRequestIdRef = useRef<number>(0);
	const abortControllerRef = useRef<AbortController | null>(null);

	// 获取远程数据
	const fetchResources = async () => {
		// 生成请求ID，用于识别最新的请求
		const requestId = ++currentRequestIdRef.current;
		
		// 取消之前的请求（如果有）
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		
		// 创建新的 AbortController
		abortControllerRef.current = new AbortController();
		
		setLoading(true);
		setError(null);
		
		try {
			const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
				signal: abortControllerRef.current.signal
			});
			
			// 检查是否是最新请求的结果，且组件是否仍然挂载
			if (requestId !== currentRequestIdRef.current || !isMountedRef.current) {
				return; // 忽略过期请求的结果
			}
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const data = await response.json();
			
			// 检查组件是否仍然挂载
			if (!isMountedRef.current) {
				return;
			}
			
			// 将获取的数据转换为 ResourceListItem 格式
			const remoteResources: ResourceListItem[] = data.slice(0, 5).map((item: any) => ({
				id: item.id,
				title: item.title,
				url: `post-${item.id}.com`
			}));
			
			setResources(remoteResources);
		} catch (err) {
			// 检查是否是 abort 错误，如果不是才设置错误状态
			if (err instanceof Error && err.name !== 'AbortError' && isMountedRef.current) {
				setError(err.message);
				console.error("Error fetching resources:", err);
			}
		} finally {
			// 只有当前请求是最新请求时才设置 loading 为 false
			if (requestId === currentRequestIdRef.current && isMountedRef.current) {
				setLoading(false);
			}
		}
	};

	// 删除资源
	const deleteResource = async (id: number) => {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/posts/${id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// 从本地状态中移除该项，实现即时UI更新
			setResources((currentResources) =>
				currentResources.filter((resource) => resource.id !== id)
			);
		} catch (err) {
			setError(err instanceof Error ? err.message : "删除资源失败");
			console.error("Error deleting resource:", err);
		}
	};

	// 使用useEffect在组件挂载时获取数据
	useEffect(() => {
		isMountedRef.current = true;
		fetchResources();
		
		// 清理函数
		return () => {
			isMountedRef.current = false;
			// 取消正在进行的请求
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	return {
		resources,
		loading,
		error,
		fetchResources,
		deleteResource,
	};
}
