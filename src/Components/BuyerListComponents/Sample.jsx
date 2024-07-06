import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../public/config';

const Sample = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
    let url =  BASE_URL+'sample.php';
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append('file', file);
const formData = {
  file: file
}
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Sample;
