import { useState } from "react"
import axios from 'axios'
import joi from 'joi'
export default function Register() {

    let [loadding, setLoading] = useState();
    let [erroraxios, setErrorAxios] = useState("");
    let [validatorerror, setValidatorError] = useState([]);


    let [user, setUser] = useState({
        userName: '',
        password: '',
        Email: '',
        role: "admin"
    })

    function getUser(e) {
        let MyUser = { ...user };
        MyUser[e.target.name] = (e.target.value).trim();
        setUser(MyUser);
        console.log(e.target.name);
        console.log(MyUser);
        console.log(user);
    }


    function validationForm() {
        const schema = joi.object({
            userName: joi.string().required().min(3).max(20),
            Email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
            password: joi.string().required(),
            role: joi.string().required()
        })
        return schema.validate(user, { abortEarly: false }) //show multible error not only one error 
    }

    async function RegisterSubmit(e) {
        e.preventDefault();
        console.log(user);

        let validationResult = validationForm();
        if (validationResult.error) {
            console.log(validationResult);

            const errorMessages = validationResult.error.details.map((e) => e.message);
            setValidatorError(errorMessages);
        }
        else {
            setValidatorError([]);
            try {
                let res;
                res = await axios.post("https://localhost:44377/api/Account/register", user);
                console.log(res);
                setErrorAxios(res.data.message);
            }
            catch (error) {
                console.log(error);
                setErrorAxios(error.response.data[0].description);
                console.log(error.response.data[0].description);
            }
        }
    }

    return <>

        {validatorerror.map((e, index) => {
            return <div>{validatorerror != [] ? <h1 key={index} className="alert alert-danger">{validatorerror[index]}</h1> : ''}</div>
        })}
        {erroraxios ? <h1 className={`alert ${erroraxios === "User registered successfully." ? 'alert-success' : 'alert-danger'}`}>{erroraxios} </h1> : ''}
        <form onSubmit={RegisterSubmit}>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-2 d-flex justify-content-center align-items-center">
                        <label className="text-primary fs-5">userName </label>
                    </div>
                    <div className="col-md-10">
                        <input className="border border-info form-control " name="userName" onChange={getUser} type="text" />
                    </div>
                </div>



                <div className="row mt-5" >
                    <div className="col-md-2 d-flex justify-content-center align-items-center">
                        <label className="text-primary fs-5">password </label>
                    </div>
                    <div className="col-md-10">
                        <input className="border border-info form-control " name="password" onChange={getUser} type="text" />
                    </div>
                </div>


                <div className="row mt-5">
                    <div className="col-md-2 d-flex justify-content-center align-items-center">
                        <label className="text-primary fs-5">Email </label>
                    </div>
                    <div className="col-md-10">
                        <input className="border border-info form-control " name="Email" onChange={getUser} type="text" />
                    </div>
                </div>



            </div>

            <button className="mt-5 btn btn-primary" type="submit">
                {loadding ? <i className='fa fa-spinner fa-spin'></i> : 'Register'}
            </button>
        </form>
    </>
}