import React from 'react';
import {withRouter} from "react-router";

class UploadImage extends React.Component {

  selectedFile = ''

   handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const selectedFile = file
     if (!selectedFile) return;
     const reader = new FileReader();
     reader.readAsDataURL(selectedFile);
     reader.onloadend = () => {
       console.log(reader.result)
     };
     reader.onerror = () => {
       console.error('Something going wrong');
     };
  };


  render() {
    return (
      <div>
        <h1 className="title">Upload an Image</h1>
        <form className="form">
          <input
            id="fileInput"
            type="file"
            name="image"
            className="form-input"
            onChange={this.handleFileInputChange}
          />
        </form>
      </div>
    )
  }
}

export default withRouter(UploadImage)
