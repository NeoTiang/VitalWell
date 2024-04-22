function performOCR() {
    const image = document.getElementById('imageInput').files[0];
    const output = document.getElementById('ocrResult');
    const fs = require('fs');

    if (image) {
        Tesseract.recognize(
            image,
            'eng', // Specify the language
            {
                logger: m => console.log(m) // Logs progress
            }
        ).then(({ data: { text } }) => {
            output.textContent = text;
            fs.writeFile('output.txt', text.toString(), (err) => {
                if (err) throw err;
                console.log('The value has been saved!');
            });
            // localStorage.setItem('ocrText', text);
        }).catch(error => {
            console.error(error);
            output.textContent = 'Error: ' + error.message;
        });
    } else {
        output.textContent = 'Please upload an image first.';
    }
}
