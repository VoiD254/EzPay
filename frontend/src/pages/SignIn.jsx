import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-slate-200 h-screen">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg w-80 text-center h-max p-2 px-4">
          <Heading title={"Sign In"} />
          <SubHeading text={"Enter your credentials to access your account"} />
          <InputBox
            onchange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeholder={"Eg. xyz@gmail.com"}
          />
          <InputBox onchange={(e) =>{
            setPassword(e.target.value);
          }} label={"Password"} placeholder={"Eg. 12345"} type= {"password"} />
          <div className="pt-4">
            <Button
              onclick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username,
                    password
                  } 
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign In"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account ?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
