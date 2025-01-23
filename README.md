# Car Recognition Application for Turners Cars

## Overview

This application is a prototype developed for Turners Cars to demonstrate AI-powered vehicle recognition capabilities. The system allows users to upload car images and automatically identifies the vehicle type (e.g., sedan, SUV, truck) using cloud-based AI services. This information can be used to assist in calculating appropriate insurance premiums based on vehicle classifications.

## Features

- User-friendly web interface for image upload
- Cloud-based AI vehicle recognition
- Vehicle type classification (sedan, SUV, truck, etc.)
- Real-time processing and results display

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python with Flask/FastAPI
- Cloud Platform: Microsoft Azure/AWS/Google Cloud (AI Vision Services)
- Image Processing: Cloud Vision API

## Prerequisites

- JavaScript
- Node.js and npm (for frontend development)
- Cloud Platform Account (Azure/AWS/Google Cloud)
- API credentials for the chosen cloud service

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AugieAud/car-recognition-ai.git
cd car-recognition-app
```

2. Set up environment variables:
   Create a `.env` file in the root directory and add your cloud service credentials:

```
CLOUD_API_KEY=BfsNBi46SKBiJkOqh5PDN5DXtn409B93VFbdGfuVev37sr8Nq4c4JQQJ99AKACL93NaXJ3w3AAAIACOGFZe5
```

## Running the Application

1. Start the backend server:

```bash
python app.py
```

2. Open your web browser and navigate to:

```
http://localhost:5000
```

## Usage

1. Access the web interface through your browser
2. Click the "Upload Image" button to select a car image
3. Submit the image for processing
4. View the results showing the identified vehicle type

## Project Structure

```
car-recognition-app/
├── app.py              # Main application file
├── static/            # Static files (CSS, JS, images)
├── templates/         # HTML templates
├── requirements.txt   # Python dependencies
└── README.md         # Project documentation
```

## Security Considerations

- API keys and sensitive credentials should be stored securely
- Environment variables should be used for configuration
- Input validation is implemented for uploaded images

## Future Enhancements

- Extended vehicle recognition capabilities (brands, models)
- Integration with insurance premium calculation
- Enhanced user interface with additional features
- Performance optimization for larger scale deployment

## Contributing

This is a prototype project for Turners Cars. Please contact the development team for any contributions or suggestions.

## Acknowledgments

- Cloud Platform Documentation and Resources
- Mission Ready
