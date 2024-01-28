import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import styles from './ImageUploaderTest.module.css';

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
        console.log("click analyse ingredients btn");
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
        <div className={styles.layout}>
            {
                image ? (
                    <img src={image} alt="Uploaded Image"
                        className={styles.image} />
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
                <button onClick={openFileDialog} className={styles.btn}>
                    <FontAwesomeIcon icon={faUpload} /> Select Image
                </button>
                <button onClick={analyseImage} className={styles.btn}>
                    Analyse Ingredients
                </button>
            </div>
            {showModal && (
                <div className={styles.modal}>
                    <div>
                        <p>There are 3 oranges. Would you like to add it to your ingredient list?</p>
                        <div className={styles.yesnobtns}>

                            <button onClick={handleSubmit} className={styles.btn2}>Yes</button>
                            <button onClick={handleCloseModal} className={styles.btn2}>No</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageUploaderTest;