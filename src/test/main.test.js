import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Greet機能', () => {
  let greetBtn
  let nameInput
  let greetingMessage

  beforeEach(async () => {
    // DOMのセットアップ
    document.body.innerHTML = `
      <div id="app">
        <input type="text" id="name-input" />
        <button id="greet-btn">Greet</button>
        <p id="greeting-message"></p>
      </div>
    `
    
    // Tauri invokeのモックをリセット
    vi.clearAllMocks()
    
    // DOMContentLoadedイベントをトリガーしてからmain.jsを読み込み
    const event = new Event('DOMContentLoaded')
    document.dispatchEvent(event)
    
    // main.jsを動的にインポート
    await import('../main.js')
    
    // DOMイベントの処理を待つ
    await new Promise(resolve => setTimeout(resolve, 50))
    
    greetBtn = document.getElementById('greet-btn')
    nameInput = document.getElementById('name-input')
    greetingMessage = document.getElementById('greeting-message')
  })

  it('ボタンクリック時にgreetコマンドが呼ばれること', async () => {
    // Arrange
    const testName = 'テスト太郎'
    nameInput.value = testName
    mockTauriInvoke('greet', `Hello, ${testName}! Welcome to vup!`)

    // Act
    greetBtn.click()
    await new Promise(resolve => setTimeout(resolve, 50)) // Promiseの解決を待つ

    // Assert
    expect(window.__TAURI__.tauri.invoke).toHaveBeenCalledWith('greet', { name: testName })
  })

  it('greetコマンドの結果がメッセージ要素に表示されること', async () => {
    // Arrange
    const testName = 'テスト花子'
    const expectedMessage = `Hello, ${testName}! Welcome to vup!`
    nameInput.value = testName
    mockTauriInvoke('greet', expectedMessage)

    // Act
    greetBtn.click()
    await new Promise(resolve => setTimeout(resolve, 50)) // Promiseの解決を待つ

    // Assert
    expect(greetingMessage.textContent).toBe(expectedMessage)
  })

  it('空の名前でもgreetコマンドが呼ばれること', async () => {
    // Arrange
    nameInput.value = ''
    mockTauriInvoke('greet', 'Hello, ! Welcome to vup!')

    // Act
    greetBtn.click()
    await new Promise(resolve => setTimeout(resolve, 50))

    // Assert
    expect(window.__TAURI__.tauri.invoke).toHaveBeenCalledWith('greet', { name: '' })
  })
})