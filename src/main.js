import { invoke } from '@tauri-apps/api/tauri'

document.getElementById('greet-btn').addEventListener('click', async () => {
    const name = document.getElementById('name-input').value
    const message = await invoke('greet', { name })
    document.getElementById('greeting-message').textContent = message
})