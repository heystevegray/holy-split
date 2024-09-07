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
	source venv/bin/activate
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