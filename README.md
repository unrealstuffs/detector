# Detector

Detector is a React application that serves as an interface for controlling a vehicle detector. It provides features such as displaying live video streams, real-time data retrieval, and camera settings adjustment.

## Features

-   **Live Video Stream:** View live video feeds from the connected cameras.
-   **Real-time Data:** Retrieve data in real-time about detected vehicles or relevant metrics.
-   **Camera Settings:** Adjust camera settings such as resolution, frame rate, etc., to optimize performance.

## Installation

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/unrealstuffs/detector
    ```

2. Navigate to the project directory:

    ```
    cd detector
    ```

3. Install dependencies using npm:

    ```
    npm install
    ```

## Usage

1. Start the React development server:

    ```
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000` to access the Detector application.

## Configuration

-   **Application Configuration:** Modify the entire application configuration in the `app-config.json` file.

    Example `app-config.json`:

    ```json
    {
    	"restartCamera": true,
    	"videoQuality": true,
    	"focusAndZoomType": "STEP",
    	"servoSettings": true
    }
    ```

## Contributing

Contributions are welcome! If you would like to contribute to this project, feel free to fork the repository and submit pull requests with your changes.

## License

This project is licensed under the [MIT License](LICENSE).
