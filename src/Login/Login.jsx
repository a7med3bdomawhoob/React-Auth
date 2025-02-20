import joi from "joi";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";


export function Login({setUserData}) {

    let [validateError, setValidateError] = useState([]);
    let [erroraxios, setErroraxios] = useState([]);
    let [loginInfo, setLoginInfo] = useState({
        Email: "",
        Password: ""
    });


    function validationForm() {
        const schema = joi.object({
            Email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
            Password: joi.string().required(),
        })
        return schema.validate(loginInfo, { abortEarly: false }) //show multible error not only last error 
    }


    function fetchData(e) {
        let deep = { ...loginInfo };  //Deep Copy 
        deep[e.target.name] = e.target.value;
        setLoginInfo(deep);
        console.log(loginInfo)
    }


    async function Login(e) {
        e.preventDefault();
        let validateResult = validationForm();
        if (validateResult.error) {
            console.log(validateResult.error.details);
            // setValidateError(validateResult.error.details);
            const errorMessages = validateResult.error.details.map((e) => e.message);
            setValidateError(errorMessages);
            console.log(typeof (errorMessages));
            console.log(typeof (validateResult.error.details));
        }
        else {
            setValidateError("");
            console.log("Successfully");
            axios.post("https://localhost:44377/api/Account/login", loginInfo)
                .then((res) => {
                    console.log(res);
                    console.log("Success Axios");
                    setErroraxios("Success Login");
                    console.log(res.data.token);
                    localStorage.setItem("token",res.data.token);
                    setUserData();
                })
                .catch((error) => {
                    console.log(error.message);
                    console.log("Failed Axios");
                    setErroraxios(error.message);
                });
        }

    }

    useEffect(() => {
        setValidateError(null);
        setErroraxios(null);

    }, [])


    return <>

        {validateError ? <h1 className="alert alert-danger">{validateError.map((e, index) => {
            return <div key={index}>
                <h3>{e}</h3>
            </div>
        })}</h1> : ''}

        {erroraxios ? (
            <div className={`alert ${erroraxios === "Success Login" ? 'alert-success' : 'alert-danger'}`}>
                {erroraxios}
            </div>
        ) : null}



        <form onSubmit={Login}>
            <div className="row mt-5">
                <div className=" d-flex justify-content-center align-items-center">
                    <div className="col-md-2">
                        <label className="text-primary fs-5">password </label>

                    </div>
                    <div className="col-md-10">
                        <input onChange={fetchData} className="border border-info form-control " name="Password" type="text" />
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-2">
                    <label className="text-primary fs-5">Email </label>
                </div>
                <div className="col-md-10">
                    <input onChange={fetchData} className="border border-info form-control " name="Email" type="text" />
                </div>
            </div>
            <button className="mt-5 btn btn-info ">Login</button>
        </form>
    </>
}