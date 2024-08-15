import axios from "axios";
import { BASE_URL } from "../../public/config";

export async function MonthBaseBuyerListApi(monthName,year){
    try{
        let url = BASE_URL+`getBuyerDataMonthly.php?monthName=${monthName}&yearName=${year}`;
        const buyerListInMonth = await axios.get(url)
        return buyerListInMonth?.data;
    }catch(e){
        console.log('From Login Api', e)
    }
}  
