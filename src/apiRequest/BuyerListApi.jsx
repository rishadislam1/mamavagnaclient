import axios from "axios";
import { BASE_URL } from "../../public/config";

export async function BuyerListApi(data){
    try{
        let url = await BASE_URL+'buyer-insert.php';
        const loginData = await axios.post(url,data,{
            headers: {
                'Content-Type': 'application/json'
              }
        })
        return loginData?.data;
    }catch(e){
        console.log('From Login Api', e)
    }
} 