// Import necessary React and axios libraries
import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  // Define state for storing the selected image file
  const [image, setImage] = useState(null);
  // Define state for storing the result of the prediction
  const [result, setResult] = useState("");
  //define state for storing the image preview URL
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle the event when a file is selected by the user
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the selected image file in the state
      setImage(file);
      // Create a preview URL for the selected image
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle the form submission event when the user submits an image for recognition
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // If no image is selected, alert the user and stop the function
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    try {
      // Send the image to the Azure Custom Vision API using axios
      const response = await axios.post(
        import.meta.env.VITE_CUSTOM_VISION_URL, // Using environment variable for Custom Vision API URL
        image, // Send image file directly as binary data
        {
          headers: {
            "Prediction-Key": import.meta.env.VITE_CUSTOM_VISION_KEY, // API key from environment variables
            "Content-Type": "application/octet-stream", // Set content type for binary data
          },
        }
      );

      // Extract the prediction results from the response
      const predictions = response.data.predictions;
      // Get the top prediction (the one with the highest confidence)
      const topPrediction = predictions[0];

      // Set the result state with the top prediction's tag (vehicle type) and confidence level
      setResult(
        `Vehicle Type: ${topPrediction.tagName} (Confidence: ${(
          topPrediction.probability * 100
        ).toFixed(2)}%)`
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
      {/* Display the image preview if a file is selected */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ maxWidth: "100%", marginTop: "20px" }}
        />
      )}
      {/* Display the result if it exists */}
      {result && <p>{result}</p>}
    </div>
  );
};

export default ImageUpload;
