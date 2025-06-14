// Tauri APIのインポート
let invoke;

if (typeof window !== 'undefined' && window.__TAURI__) {
  // テスト環境
  invoke = window.__TAURI__.tauri.invoke;
} else {
  // 本番環境
  import('@tauri-apps/api/tauri').then(module => {
    invoke = module.invoke;
  });
}

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', () => {
  const greetBtn = document.getElementById('greet-btn');
  
  if (greetBtn) {
    greetBtn.addEventListener('click', async () => {
      if (!invoke) {
        console.error('Tauri API not loaded');
        return;
      }
      
      const name = document.getElementById('name-input').value;
      try {
        const message = await invoke('greet', { name });
        document.getElementById('greeting-message').textContent = message;
      } catch (error) {
        console.error('Failed to invoke greet command:', error);
      }
    });
  }
});