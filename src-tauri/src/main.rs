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

// #[tauri::command]
// fn run_spleeter(input_file: String, output_dir: String) -> Response {
//     // Log the input and output directories
//     println!("Input file: {}", input_file);
//     println!("Output directory: {}", output_dir);

//     Response::success(
//         "Input file: ".to_string() + &input_file + " Output directory: " + &output_dir,
//     )
// }

#[tauri::command]
fn run_spleeter(input_file: String, output_dir: String) -> Response {
    // Get the current working directory
    let current_dir = std::env::current_dir().unwrap();
    let current_dir_str = current_dir.to_str().unwrap();

    println!("Current working directory: {}", current_dir_str);
    println!("Input file: {}", input_file);
    println!("Output directory: {}", output_dir);

    // Join the input file and the working dir
    let input_path = current_dir.join(&input_file);
    let output_path = current_dir.join(&output_dir);

    println!("Input file path: {:?}", input_path);
    println!("Output directory path: {:?}", output_path);

    // spleeter separate -o audio_output -p spleeter:5stems-16kHz audio_example.mp3
    let output: Result<std::process::Output, std::io::Error> = Command::new("spleeter")
        .args(&[
            "separate",
            "-o",
            output_dir.as_str(),
            "-p",
            "spleeter:5stems-16kHz",
            input_file.as_str(),
        ])
        .current_dir(current_dir_str)
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
