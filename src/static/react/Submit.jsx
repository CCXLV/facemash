import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/styles.css';
import '../css/submit.css';


const App = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [inputValue, setPersonName] = useState('');

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };
    

    const displayFileName = (event) => {
        const fileInput = event.target;
        const fileName = fileInput.parentElement.querySelector('.file-upload-span');
    
        fileName.innerHTML = fileInput.files[0].name;
        fileName.style.fontSize = '14px';
        fileName.style.color = '#454d55';
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setSelectedImage(file);
    };

    const twoFunctionsOnChange = (event) => {
        displayFileName(event);
        handleImageChange(event);
    };

    function readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                const dataURL = event.target.result;
                const imageFile = {
                    name: file.name,
                    data: dataURL,
                };
                resolve(imageFile);
            };
            reader.readAsDataURL(file);
        });
    }

    const formSubmit = (event) => {
        const formData = new FormData();
        formData.append('image', selectedImage);

        readFile(selectedImage)
        .then(image => {
            const data = {
                image: image,
                name: inputValue,
            }
            fetch('/image_submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({data}),
            })
            .then((response) => {
                if (response.status === 400) {
                    console.error('Error submitting image:', response);
                }
            });
        })
    };
      

    return (
        <div className='parent-div'>
            <div className='main-header'>
                <a href='/' className='main-header-p'>FACEMASH</a>
            </div>
            <div className='main-div'>
                <form method="post" onSubmit={formSubmit}>
                    <div className='form-header'>
                        <p className='form-header-p'>Submit an Image</p>
                    </div>
                    <div className='form-file-div'>
                        <label htmlFor="file-upload">
                            <span className='file-upload-span'>Upload Image</span>
                        </label>
                        <input type="file" id='file-upload' name="image" onChange={twoFunctionsOnChange}  className='form-file-input' />
                        <input type="text" value={inputValue} onChange={handleChange} placeholder='Name of the Person' className='name-input' required/>
                    </div>
                    <div className='submit-button-div'>
                        <button type='submit' className='submit-button'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

createRoot(document.getElementById('main-container')).render(<App />);