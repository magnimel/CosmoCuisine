import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const ImageUploaderTest = ({ addIngredientFromImage }) => {
    const [image, setImage] = useState("");
    const [openAIResponse, setOpenAIResponse] = useState("");
    const [showModal, setShowModal] = useState(false);

    const fileInputRef = useRef(null);

    function handleFileChange(event) {
        if (event.target.files === null) {
            window.alert("No file selected. Choose a file.")
            return;
        }
        const file = event.target.files[0];

        // Convert the users file (locally on their computer) to a base64 string
        // FileReader
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            // reader.result -> base64 string ("ENTIRESTRING" -> :))
            if (typeof reader.result === "string") {
                console.log(reader.result);
                setImage(reader.result);
            }
        }

        reader.onerror = (error) => {
            console.log("error: " + error);
        }

    }

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const analyseImage = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = () => {
        addIngredientFromImage();
        setShowModal(false);
    };

    return (
        <div>
            {
                image ? (
                    <img src={image} alt="Uploaded Image"
                        style={{ width: '180px', height: '180px' }} />
                ) : (
                    null)
            }
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e)}
            />
            <div>
                <button onClick={openFileDialog}>
                    <FontAwesomeIcon icon={faUpload} /> Select your ingredient image
                </button>
                <button onClick={analyseImage}>
                    Analyse Ingredients
                </button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>There are 3 oranges. Would you like to add it to your ingredient list?</p>
                        <span>
                            <button onClick={handleSubmit}>Yes</button>
                            <button onClick={handleCloseModal}>No</button>
                        </span>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageUploaderTest;