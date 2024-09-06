use serde::Serialize;
use std::{env, process::Command};

// Define the Status enum
#[derive(Serialize)]
enum Status {
    Success,
    Error,
}

// Define the Response struct
#[derive(Serialize)]
struct Response {
    status: Status,
    message: String,
}

// Implement methods for Response
impl Response {
    fn success(message: String) -> Self {
        Response {
            status: Status::Success,
            message,
        }
    }

    fn error(message: String) -> Self {
        Response {
            status: Status::Error,
            message,
        }
    }
}

#[tauri::command]
fn run_spleeter(input_file: String, output_dir: String) -> Response {
    // Get the current working directory
    let current_dir = std::env::current_dir().unwrap();
    let current_dir_str = current_dir.to_str().unwrap();

    // Log the input and output directories
    println!("Input file: {}", input_file);
    println!("Output directory: {}", output_dir);

    // Construct the path to the Spleeter executable
    let spleeter_executable = if cfg!(target_os = "windows") {
        format!(
            "{}/src-python/dist/executable/spleeter.exe",
            current_dir_str
        )
    } else {
        format!("{}/src-python/dist/executable/spleeter", current_dir_str)
    };

    // Log the command
    println!("Running spleeter executable: {}", spleeter_executable);

    // Execute the Spleeter binary with the input and output arguments
    let output = Command::new(spleeter_executable)
        .arg(input_file)
        .arg(output_dir)
        .output();

    match output {
        Ok(output) => {
            if output.status.success() {
                Response::success(String::from_utf8_lossy(&output.stdout).to_string())
            } else {
                Response::error(String::from_utf8_lossy(&output.stderr).to_string())
            }
        }
        Err(err) => Response::error(format!("Failed to execute: {}", err)),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_spleeter])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
