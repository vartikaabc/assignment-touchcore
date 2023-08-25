// Import the axios library for making HTTP requests
import axios from 'axios';

// Function to handle the form submission
async function handleSubmit(event) {
    event.preventDefault();

    // Get the selected video file and subtitle text from the form
    const videoFile = document.getElementById('videoFile').files[0];
    const subtitleText = document.getElementById('subtitleText').value;

    // Create a FormData object to send data as a multipart/form-data request
    const formData = new FormData();
    formData.append('videoFile', videoFile);
    formData.append('subtitleText', subtitleText);

    // Send a POST request to the Flask API to upload video and subtitle
    try {
        await axios.post('http://localhost:5000/api/subtitles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set proper content type
            }
        });
        console.log('Video and subtitle uploaded successfully.');
        // Clear the form after successful upload
        document.getElementById('videoFile').value = '';
        document.getElementById('subtitleText').value = '';
        // Fetch and display subtitles after successful upload
        fetchAndDisplaySubtitles();
    } catch (error) {
        console.error('Error uploading video and subtitle:', error);
    }
}

// Function to fetch and display subtitles
async function fetchAndDisplaySubtitles() {
    const apiUrl = 'http://localhost:5000/api/subtitles'; // Modify this URL
    try {
        const response = await axios.get(apiUrl);
        const subtitles = response.data;

        // Display subtitles on the page
        const subtitlesContainer = document.getElementById('subtitles-container');
        subtitlesContainer.innerHTML = ''; // Clear previous content

        subtitles.forEach(subtitle => {
            const subtitleElement = document.createElement('div');
            subtitleElement.textContent = `${subtitle.timestamp}: ${subtitle.text}`;
            subtitlesContainer.appendChild(subtitleElement);
        });
    } catch (error) {
        console.error('Error fetching subtitles:', error);
    }
}

// Attach the form submission handler to the form
const form = document.getElementById('subtitle-form');
form.addEventListener('submit', handleSubmit);

// Call the function to fetch and display subtitles when the page loads
fetchAndDisplaySubtitles();

