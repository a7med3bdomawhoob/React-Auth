import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function Navbar({ logindata,logOut }) {



    useEffect((res) => {
        console.log(logindata);
    }, [])
    return <>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand text-primary" href="#">Auth</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {logindata ? (
                            <>
                                <li className="nav-item">
                                    <Link className='m-2' to='home'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='m-2' to='about'>About</Link>
                                </li>
                            </>
                        ) : ''}
                        <li className="nav-item">
                            <Link className='m-2' to='register'>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='m-2' to='login'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <a onClick={logOut}>LogOut</a>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>


    </>
}