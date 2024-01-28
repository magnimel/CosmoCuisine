import React, { Component } from 'react';
import cameraIcon from "./assets/camera.svg";
 

class Upload extends Component {

  state = {
    progress: 0,   //上传进度
    isUploading: false, // 是否正在上传
    result: null  //上传结果数据
  };
 
  uploadFile = (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('file', file);
    // 向服务器发送Ajax请求，上传文件
    fetch('https://your-upload-api-url.com/upload', {
      method: 'POST',
      body: data,
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor(loaded / total * 100);
        this.setState({ progress: percent });
      }
    })

      .then(res => res.json())
      .then(data => this.setState({ isUploading: false, result: data }))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}> {/* Center the button */}
        {/* Hidden file input */}
        <input 
          type="file" 
          id="file-input" 
          onChange={this.uploadFile} 
          style={{ display: 'none' }} 
          ref={fileInput => this.fileInput = fileInput} 
        />
        {/* Camera icon button that triggers file input */}
        <button 
          type="button" 
          onClick={() => this.fileInput.click()} // Triggers file input click
          style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
          disabled={this.state.isUploading}
        >
          <img src={cameraIcon} alt="Upload" style={{ width: '50px', height: '50px' }} />
        </button>
      </div>
    );
  }
}

export default Upload;