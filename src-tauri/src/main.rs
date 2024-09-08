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
fn run_spleeter() -> Response {
    println!("About to start spleeter");
    // Response::success("nice".to_string());

    let input_file = env::var("INPUT_FILE").unwrap();
    let output_dir = env::var("OUTPUT_DIR").unwrap();
    println!("Input file: {}", input_file);
    println!("Output directory: {}", output_dir);

    // Get the current working directory
    let current_dir = std::env::current_dir().unwrap();
    let current_dir_str = current_dir.to_str().unwrap();
    println!("Current working directory: {}", current_dir_str);

    // Define the path to the spleeter executable
    let spleeter_relative_path = "/src/spleeter";
    let spleeter_path: String = current_dir_str.to_string() + "/" + spleeter_relative_path;
    println!("Spleeter path: {}", spleeter_path);

    // Run the spleeter command
    let output: Result<std::process::Output, std::io::Error> = Command::new(spleeter_path)
        .args(&[
            "separate",
            "-p",
            "spleeter:5stems",
            "-o",
            output_dir.as_str(),
            input_file.as_str(),
        ])
        .output();

    match output {
        Ok(output) => {
            if output.status.success() {
                println!("Spleeter finished successfully");
                Response::success(String::from_utf8_lossy(&output.stdout).to_string())
            } else {
                println!("Spleeter failed");
                println!("stderr: {}", String::from_utf8_lossy(&output.stderr));
                Response::error(String::from_utf8_lossy(&output.stderr).to_string())
            }
        }
        Err(err) => {
            println!("Error: {}", err);
            Response::error(format!("Failed to execute: {}", err))
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_spleeter])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
