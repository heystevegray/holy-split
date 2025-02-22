- [Spleeter Docker Setup](#spleeter-docker-setup)
  - [Prerequisites](#prerequisites)
  - [Building the Docker Image](#building-the-docker-image)
  - [Running the Docker Container](#running-the-docker-container)
    - [Explanation](#explanation)
  - [Usage Example](#usage-example)

# Spleeter Docker Setup

This project provides a Docker setup for using Spleeter, a tool for separating audio files into individual stems.

## Prerequisites

- Install [Docker](https://www.docker.com/) on your machine.

## Building the Docker Image

To build the Docker image, navigate to the project directory and run the following command:

```bash
docker build -t spleeter-docker .
```

## Running the Docker Container

After building the image, you can run the container with the following command:

```bash
docker run --rm -v $(pwd):/app spleeter-docker /app/input_file.mp3 .
```

### Explanation

- `docker run` - This command is used to run a Docker container.

- `--rm` - This option tells Docker to automatically remove the container when it exits. This helps to keep your system clean by not leaving stopped containers behind.

- `-v $(pwd):/app` - This option mounts the current directory ($- (pwd)) on your host machine to the /app directory inside the Docker container. This allows the container to access files from your host system.

- `spleeter-docker` - This is the name of the Docker image you - built. It contains the Spleeter tool and all its dependencies.

- `/app/input_file.mp3` - This is the path to the input audio - file inside the Docker container. You should replace `input_file.mp3` with the actual name of your audio file.

- `.` - This specifies the output directory inside the Docker - container where the separated audio stems will be saved. In this case, `.` refers to the current directory, which is /app inside the container.

## Usage Example

- Place your audio file in the current directory.
- Run the Docker command as shown above.
- The separated audio stems will be saved in the current directory if you use `.` as the last argument.
