import {Button} from "../components/Button";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const Users = () =>{
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() =>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
            setUsers(response.data.user)
        })
    }, [filter]);

    return(
        <div>
            <div className="font-bold text-lg">Users</div>
            <div className="my-2">
                <input onChange={(e) =>{
                    setFilter(e.target.value);
                }} type="text" placeholder="Search users..." className="w-full border px-2 py-1 border-slate-200"></input>
            </div>
            <div>
                {users.map(user => <User user = {user} key={user._id} />)}
            </div>
        </div>
    );
};

function User({user}){
    const navigate = useNavigate();

    return(
        <div className="flex justify-between mt-1">
            <div className="flex">
                <div className="rounded-full bg-slate-200 w-11 h-11 flex justify-center">
                    <div className="flex flex-col justify-center h-full text-xl"> {user.firstName[0]} </div>
                </div>
                <div className="flex flex-col justify-center h-full ml-2">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="h-full flex flex-col">
                <Button onclick={() =>{
                    navigate("/send?id=" + user._id + "&name=" + user.firstName);
                }} label={"Send Money"}/>
            </div>
        </div>
    );
}
