import React, { ChangeEvent, useState, FormEvent } from "react"

const ImageUploader = () => {
    const [image, setImage] = useState("");
    const [openAIResponse, setOpenAIResponse] = useState("");

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

    // const analyzeImage = async () => {
    //     const response = await fetch("http://localhost:3002/vision", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify({
    //             image: image // base64 image
    //         })
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //     return data.imageAnalysis;
    // };

    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     if (image === "") {
    //         alert("Upload an image.")
    //         return;
    //     }
    //     const imageAnalysis = await analyzeImage();
    //     setOpenAIResponse(imageAnalysis);
    // }

    return (
        <div>
            <div>
                <h2>Upload Ingredient Image</h2>
                {
                    image ? (
                        <img src={image} alt="Uploaded Image" />
                    ) : (
                        <p>Once you upload an image, you will see it here.</p>
                    )
                }
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="file"

                        onChange={(e) => handleFileChange(e)}
                    />
                    <button type="submit">
                        Ask ChatGPT To Analyze Your Image
                    </button>
                </form>
                {openAIResponse ?
                    <div >
                        <h2>AI Response</h2>
                        <p>{openAIResponse}</p>
                    </div>
                    :
                    null
                }
            </div>
        </div>

    )

}

export default ImageUploader;