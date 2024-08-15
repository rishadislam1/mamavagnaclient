import { useEffect, useState } from "react";
import ProfileEdit from "../../Components/Profile/ProfileEdit";
import ProfileImage from "../../Components/Profile/ProfileImage";
import { ProfileApi } from "../../apiRequest/ProfileApi";

const ProfilePage = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userEmail = user?.data?.email;
    const data = { userEmail: userEmail };
    const [profileData, setProfileData] = useState([]);
  
    useEffect(() => {
      const callProfileApi = async () => {
        try {
          const response = await ProfileApi(data);
          setProfileData(response);
        } catch (error) {
          console.error('Error calling ProfileApi', error);
        }
      };
      callProfileApi();
    }, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center mt-20 gap-10">
      <div>
        <ProfileImage profileData={profileData} />
      </div>
      <div>
        <ProfileEdit profileData={profileData} userEmail={userEmail} />
      </div>
    </div>
  );
};

export default ProfilePage;
