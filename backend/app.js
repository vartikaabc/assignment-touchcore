document.getElementById('subtitle-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const apiUrl = 'http://localhost:5000/api/subtitles'; // Modify this URL
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Subtitle added successfully');
        } else {
            console.error('Subtitle addition failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
