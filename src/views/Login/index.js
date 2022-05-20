import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonCircle, IoLockClosed } from "react-icons/io5";

import { userAdded } from "../../store/userSlice";
import { device } from "../../styles/breakingPoints";


function Login() {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  // const [email, setEmail] = useState("sam@phantom");
  // const [password, setPassword] = useState("222");

  // const signIn = (e) => {
  //   e.preventDefault();
  //   if (email && password) {
  //     dispatch(userAdded({ data: { email: email, password: password } }));
      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 2000);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Username is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: (values) => {
      dispatch(userAdded({ data: values }));
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
    },
  });
  return (
      <Styles>
        <div className="content">
          <div className="text">
            <h1>Log In</h1>
            <br />
            <h5>Please enter your credentials to continue.</h5>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <IoPersonCircle
                style={{ position: "absolute", bottom: "14px", left: "1rem" }}
                size={20}
              />
              <input
                placeholder="Enter Your Username"
                id="username"
                type="text"
                {...formik.getFieldProps("username")}
              />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="error">
                <p>{formik.errors.username}</p>
              </div>
            ) : null}
            <div className="field">
              <IoLockClosed
                style={{ position: "absolute", bottom: "14px", left: "1rem" }}
                size={20}
              />
              <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                {...formik.getFieldProps("password")}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">
                <p>{formik.errors.password}</p>
              </div>
            ) : null}
            <div className="forgot-pass">
              <Link to="coming-soon">Forgot Password?</Link>
            </div>
            <button type="submit">Login</button>
            <div className="signup">
              Not a member?
              <Link to="/signUp"> Register now</Link>
            </div>
          </form>
        </div>
      </Styles>
  );
}

export default Login;

const Styles = styled.div`
  display: flex;
  justify-content: center;
  background: #00B4DB;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0083B0, #00B4DB);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0083B0, #00B4DB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-height: 100vh;
  
  .content {
    width: 25rem;
    height:65vh;
    background: #ffff;
    border-radius: 8px;
    padding: 40px 30px;
    box-shadow: 0 22px 40px rgba(0, 0, 0, .5);
    margin-top: 5rem;
    @media ${device.tablet} { 
      max-width: 18rem;
      height:50vh;
      margin-top:10rem;
    }
  }
  .text {
    text-align: center;
    text-transform: uppercase;
    padding-bottom: 0.5rem;
    h1 {
      font-size: 22px;
      font-weight: bold;
    }
    h3 {
      font-size: 18px;
      font-weight: bold;
    }
    p {
      font-size: 10px;
    }
  }
  .field {
    height: 50px;
    width: 100%;
    display: flex;
    position: relative;
    input {
      height: 100%;
      width: 100%;
      padding-left: 45px;
      font-size: 18px;
      outline: none;
      border: none;
      color: #595959;
      background: #dde1e7;
      border-radius: 8px;
      box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
      &:focus ~ label {
        box-shadow: inset 2px 2px 5px #babecc, inset -1px -1px 2px #ffffff73;
      }
    }

    &:nth-child(2) {
      margin-top: 20px;
    }

    span {
      position: absolute;
      width: 50px;
      line-height: 50px;
      color: #595959;
    }

    label {
      position: absolute;
      top: 50%;
      left: 45px;
      pointer-events: none;
      color: #666666;
      transform: translateY(-50%);
    }

    .field input:focus ~ label {
      opacity: 0;
    }
  }

  .forgot-pass {
    text-align: left;
    margin: 10px 0 10px 5px;
    a {
      font-size: 16px;
      color: #3498db;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  button {
    margin: 15px 0;
    width: 100%;
    height: 50px;
    color: #000;
    font-size: 18px;
    font-weight: 600;
    background: #dde1e7;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 2px 2px 5px #babecc, -5px -5px 10px #ffffff73;

    &:focus {
      color: #3498db;
      box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
    }
  }

  .signup {
    font-size: 16px;
    color: #595959;
    margin: 10px 0;
    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        color: #000;
      }
    }
  }
  .error{
    p{
      text-align:center;
      color:tomato;
    }
  }
`;
