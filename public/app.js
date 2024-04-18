function performOCR() {
    const image = document.getElementById('imageInput').files[0];
    const output = document.getElementById('ocrResult');

    if (image) {
        Tesseract.recognize(
            image,
            'eng', // Specify the language
            {
                logger: m => console.log(m) // Logs progress
            }
        ).then(({ data: { text } }) => {
            output.textContent = text;
            localStorage.setItem('ocrText', text);
        }).catch(error => {
            console.error(error);
            output.textContent = 'Error: ' + error.message;
        });
    } else {
        output.textContent = 'Please upload an image first.';
    }
}
