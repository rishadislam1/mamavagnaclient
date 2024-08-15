import axios from "axios";
import { BASE_URL } from "../../public/config";

export async function GetBuyerListWithId(id) {
    try {
        let url = `${BASE_URL}getBuyerById.php`;
        const response = await axios.get(url, {
            params: { id },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response?.data;
    } catch (e) {
        console.log('Error in GetBuyerListWithId API call', e);
    }
}
