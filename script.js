document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    try {
        const response = await fetch('http://localhost:5500/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
});