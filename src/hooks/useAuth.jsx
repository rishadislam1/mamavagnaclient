

export default function useAuth(){

    const auth = JSON.parse(localStorage.getItem("user"))
 

    if(auth?.data?.email){
        return true;
    }
    else{
        return false;
    }
}