import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


export default function ProRoutes({logindata}){
    return (
        <>
            {logindata ? <Outlet /> : < Navigate to='login' />}
        </>
    )
}