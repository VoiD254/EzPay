import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () =>{
    const [balance, setBalance] = useState(0);

    useEffect(() =>{
        async function fetch(){
            const userId = localStorage.getItem("userId");
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                params: {
                    userId: userId
                }
            });

            const formattedBalance = parseFloat(response.data.balance).toFixed(2);

            setBalance(formattedBalance);
        }
        fetch();
    }, []);

    return(
        <div className="flex">
            <div className="font-bold text-lg ">
                Your Balance
            </div>
            <div className="text-lg font-semibold ml-4"> Rs {balance} </div>
        </div>
    );
};
