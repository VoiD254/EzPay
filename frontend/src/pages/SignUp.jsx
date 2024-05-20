import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-slate-200 h-screen">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg w-80 text-center h-max p-2 px-4">
          <Heading title={"Sign Up"} />
          <SubHeading text={"Enter your information to create an account"} />
          <InputBox
            onchange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"Eg. John"}
          />
          <InputBox 
            label={"Last Name"} 
            placeholder={"Eg. Doe"} 
            onchange={(e) =>{
                setLastName(e.target.value);
            }} 
          />
          <InputBox label={"Email"} placeholder={"Eg. xyz@gmail.com"} 
            onchange = {(e) =>{
                setUsername(e.target.value); 
            }}
          />
          <InputBox label={"Password"} placeholder={"Min. 7 characters"} type={"password"}
            onchange = {(e) =>{
                setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button 
                onclick = {async () =>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username,
                        firstName,
                        lastName,
                        password
                    });
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                }} 
                label={"Sign Up"} 
            />
          </div>
          <BottomWarning
            label={"Already have an account ?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
