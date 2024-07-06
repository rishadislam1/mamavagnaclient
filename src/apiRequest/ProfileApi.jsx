

import { BASE_URL } from "../../public/config";

export async function ProfileApi(data){
    try{
        let url = BASE_URL+'get-profile.php';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
        
          const result = await response.json();
          return result;
    }catch(e){
        console.log('From Login Api', e)
    }
}
