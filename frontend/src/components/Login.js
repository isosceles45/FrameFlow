import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import bgimg from "../assets/backgroundimg.png";
import logo from "../assets/FrameFlowLogoTransparentWhite.png";
import { client } from "../client";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    var decodedHeader = jwt_decode(response.credential);
    console.log(decodedHeader);

    localStorage.setItem('user', JSON.stringify(decodedHeader));


    const { name, sub, picture } = decodedHeader;


    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <img
          src={bgimg}
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0">
          <div className="p-5">
            <img src={logo} width="150px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={responseGoogle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
