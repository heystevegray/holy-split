# Install spleeter

> 💡 View the repo here: https://github.com/deezer/spleeter


## Run these commands in your terminal

1. Change directories to src-python
	
	```bash
	cd src-tauri/src-python/
	```
2. Create a virtual environment
	
	```bash
	python3.8 -m venv .venv
	```
3. Activate the virtual environment (macOS/Linux)
	
	```bash
	source .venv/bin/activate
	```
4. Install the compatible version of protobuf
   
   ```bash
   pip install protobuf==3.20.1
   ```
5. Install the `.whl` file that can be downloaded from this issue: [[Bug] Illegal hardware instruction #607](https://github.com/deezer/spleeter/issues/607#issuecomment-1021669444). The `spleeter-2.3.0b0-cp38-cp38-macosx_11_0_x86_64.whl` file is already included in this folder.
	
	```bash
	python3 -m pip install --upgrade spleeter-2.3.0b0-cp38-cp38-macosx_11_0_x86_64.whl
	```
6. Test the command with the provided `Mummy.wav` file. In this example `-o .` means output in the current directory (`.`).
	
	```bash
	spleeter separate -p spleeter:5stems -o . Mummy.wav
	```

	You should see output like this:

	```bash
	spleeter separate -p spleeter:5stems -o . Mummy.wav
	INFO:spleeter:Downloading model archive https://github.com/deezer/spleeter/releases/download/v1.4.0/5stems.tar.gz
	INFO:spleeter:Validating archive checksum
	INFO:spleeter:Extracting downloaded 5stems archive
	INFO:spleeter:5stems model file(s) extracted
	Metal device set to: AMD Radeon Pro 5300M

	systemMemory: 32.00 GB
	maxCacheSize: 1.99 GB

	INFO:spleeter:File ./Mummy/piano.wav written succesfully
	INFO:spleeter:File ./Mummy/bass.wav written succesfully
	INFO:spleeter:File ./Mummy/other.wav written succesfully
	INFO:spleeter:File ./Mummy/drums.wav written succesfully
	INFO:spleeter:File ./Mummy/vocals.wav written succesfully
	```
7. I then copied the python package from `.vevn/bin/spleeter` and moved it to a directory where my `main.rs` file was located `/src-tauri/src/spleeter`. My goal was to be able to call the `spleeter` from a child process like this:
	
	```rust
	let output: Result<std::process::Output, std::io::Error> = Command::new("spleeter")
        .args(&[
            "separate",
            "-p",
            "spleeter:5stems",
            "-o",
            "path-to-repository/src-tauri/src-python/output",
            "path-to-repository/src-tauri/src-python/Mummy.wav",
        ])
        .output();
	```

	I needed to get the path to the `spleeter` package like this:

	```rust
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
			"path-to-repository/src-tauri/src-python/output",
            "path-to-repository/src-tauri/src-python/Mummy.wav",
        ])
        .output();
	```