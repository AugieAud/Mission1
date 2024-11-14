// Import necessary React and axios libraries
import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  // Define state for storing the selected image file
  const [image, setImage] = useState(null);
  // Define state for storing the result of the prediction
  const [result, setResult] = useState("");

  // Handle the event when a file is selected by the user
  const handleFileChange = (e) => {
    // Set the selected image file in the state
    setImage(e.target.files[0]);
  };

  // Handle the form submission event when the user submits an image for recognition
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Log environment variables to ensure they are loaded correctly
    console.log("Custom Vision URL:", process.env.VITE_CUSTOM_VISION_URL);
    console.log("Custom Vision Key:", process.env.VITE_CUSTOM_VISION_KEY);

    // If no image is selected, alert the user and stop the function
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    // Prepare the image file for sending by creating a FormData object
    //FormData is used to create a "package" that holds the image in a format suitable for web requests
    const formData = new FormData();
    // Append the selected file to the form data with the key "file"
    //append attaches the actual file to this package, ready to be sent over to Azure in the API call
    formData.append("file", image);

    try {
      // Send the image to the Azure Custom Vision API using axios
      const response = await axios.post(
        "/predict/customvision/v3.0/Prediction/f93ce5d7-1045-4d24-99fd-9bd69f91b1ad/classify/iterations/Iteration3/image", // Proxy URL for Custom Vision API
        formData, // Image data to be sent
        {
          headers: {
            "Prediction-Key": process.env.VITE_CUSTOM_VISION_KEY, // API key from environment variables
            "Content-Type": "application/octet-stream", // Set content type for file upload
          },
        }
      );

      // Extract the prediction results from the response
      const predictions = response.data.predictions;
      // Get the top prediction (the one with the highest confidence)
      const topPrediction = predictions[0];

      // Set the result state with the top prediction's tag (vehicle type) and confidence level
      setResult(
        `Vehicle Type: ${topPrediction.tagName} (Confidence: ${
          topPrediction.probability.toFixed(2) * 100
        }%)`
      );
    } catch (error) {
      // Log any errors to the console and show an error message in the UI
      console.error("Error sending image:", error);
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload an Image of a Vehicle</h2>
      {/* Form for uploading an image file */}
      <form onSubmit={handleSubmit}>
        {/* File input for selecting an image, calls handleFileChange on change */}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {/* Submit button to start the image recognition process */}
        <button type="submit">Identify Vehicle Type</button>
      </form>
      {/* Display the result if it exists */}
      {result && <p>{result}</p>}
    </div>
  );
};

export default ImageUpload;
