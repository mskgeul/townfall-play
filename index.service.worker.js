// 옛 오프라인 캐시 워커를 지우는 워커 (tools/deploy_web.sh). 캐시를 비우고 스스로 해제한 뒤 열린 페이지를 새로고침한다.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
	event.waitUntil((async () => {
		for (const k of await caches.keys()) {
			await caches.delete(k);
		}
		await self.registration.unregister();
		const clients = await self.clients.matchAll({ type: 'window' });
		clients.forEach((c) => c.navigate(c.url));
	})());
});
