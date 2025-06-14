// Tauri APIのモック
window.__TAURI__ = {
  tauri: {
    invoke: vi.fn(),
  },
}

// グローバルなテストユーティリティ
global.mockTauriInvoke = (command, response) => {
  window.__TAURI__.tauri.invoke.mockImplementation((cmd) => {
    if (cmd === command) {
      return Promise.resolve(response)
    }
    return Promise.reject(new Error(`Unknown command: ${cmd}`))
  })
}