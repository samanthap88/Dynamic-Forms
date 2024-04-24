import React, { useState } from 'react';
import html2canvas from 'html2canvas';

function FormPreview({ formId, onSave }) {
    const [formData, setFormData] = useState(/* Initial form data */);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const capturePreview = () => {
        html2canvas(document.getElementById(formId)).then(canvas => {
            const imageData = canvas.toDataURL('image/png');
            setFormData(prevData => ({
                ...prevData,
                previewImage: imageData
            }));
            onSave(formData); // Save the form data including the preview image
        });
    };

    return (
        <div>
            <h2>Dynamic Form</h2>
            <form id={formId}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleChange} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} />
                {/* Add more form fields here */}
            </form>
            <button onClick={capturePreview}>Capture Preview</button>
        </div>
    );
}

export default FormPreview;
