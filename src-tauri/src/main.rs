#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to vup!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_greet_with_name() {
        let result = greet("Rust");
        assert_eq!(result, "Hello, Rust! Welcome to vup!");
    }

    #[test]
    fn test_greet_with_empty_name() {
        let result = greet("");
        assert_eq!(result, "Hello, ! Welcome to vup!");
    }

    #[test]
    fn test_greet_with_japanese_name() {
        let result = greet("太郎");
        assert_eq!(result, "Hello, 太郎! Welcome to vup!");
    }

    #[test]
    fn test_greet_with_special_characters() {
        let result = greet("<script>alert('xss')</script>");
        assert_eq!(result, "Hello, <script>alert('xss')</script>! Welcome to vup!");
    }
}