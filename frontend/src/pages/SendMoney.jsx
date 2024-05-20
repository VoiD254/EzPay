import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SendMoney = () =>{
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate("");

    return(
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="flex flex-col justify-center h-full">
                <div className="border h-min max-w-md bg-white shadow-lg rounded-lg w-96 space-y-8 p-4">
                    <div className="flex justify-center p-6">
                        <h2 className="font-bold text-3xl">Send Money</h2>
                    </div>
                    <div className="p-3">
                        <div className="flex items-center space-x-4">
                            <div className="flex rounded-full items-center justify-center h-12 w-12 bg-green-500">
                                <span className="text-2xl text-white"> {name[0].toUpperCase} </span>
                            </div>
                            <h3 className="font-semibold text-2xl">{name}</h3>
                        </div>
                        <div className="space-y-4 p-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Amount (in Rs.)
                                </label>
                                <input
                                    onChange={(e) =>{
                                        setAmount(e.target.value);
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter Amount"
                                />
                            </div>
                            <button onClick={async () =>{
                                await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                    to:id,
                                    amount
                                },{
                                    headers:{
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                })
                                navigate("/dashboard");
                                console.log("Transfer Successful");
                            }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
