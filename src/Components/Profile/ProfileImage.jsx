import { useState } from "react";
import profileAvatar from "../../assets/image/user.png";
import { BASE_URL } from "../../../public/config";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const ProfileImage = ({ profileData }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userEmail = user?.data?.email;
  const [edit, setEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
  
    if (selectedImage !== null) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("userEmail", userEmail);

      try {
        let url = BASE_URL + "profileImageInsert.php";
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          // Handle success
          Swal.fire({
            title: "Success!",
            text: "Image Updated Successfully",
            icon: "success",
          });
        } else {
          // Handle error
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image", error);
      }

      setEdit(false);
    } else {
      Swal.fire({
        title: "No Image Selected!",
        text: "Please Select a image first",
        icon: "warning",
      });
    }
  };

  return (
    <div>
      <div className="border rounded p-3">
        {preview ? (
          <img
            className="w-full h-96 rounded"
            src={preview}
            style={{ objectFit: "contain" }}
            alt="Preview avatar"
          />
        ) : (
          <img
            className="w-full h-96 rounded"
            // eslint-disable-next-line react/prop-types
            src={BASE_URL + profileData[0]?.image || profileAvatar}
            style={{ objectFit: "contain" }}
            // eslint-disable-next-line react/prop-types
            alt={profileData[0]?.name}
          />
        )}
      </div>
      <div className="flex flex-col justify-center mt-10">
        {edit && <input type="file" onChange={handleImageChange} required />}
        <button
          className="btn bg-green-600 text-white w-full py-3 rounded-lg mt-5"
          onClick={edit ? handleSubmit : () => setEdit(true)}
        >
          {edit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
