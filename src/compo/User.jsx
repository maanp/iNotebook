import React, { useEffect, useContext } from 'react'
import contextValue from '../context/notes/noteContext'

const User = () => {
    
    const context = useContext(contextValue);
    let { getdetails, getdetail } = context;
    useEffect(() => {
        getdetails();
        // eslint-disable-next-line
    }, [])
    return (
        <div className="my-2 container">
            <h2 className="text-center">Your Account: </h2>
            <hr />
            <table className="table my-2 table-striped">
                <thead>
                    <tr className="my-2" > 
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="my-2" >
                        <th   scope="row">Name : </th>
                        <td  className="text-primary">{getdetail.name}</td>
                    </tr>
                    <tr  className="my-2">
                        <th   scope="row">Email Id: </th>
                        <td  >{getdetail.email}</td>
                    </tr>
                    <tr  className="my-2">
                        <th   scope="row">Account created on :</th>
                        <td className="text-success" colSpan="2">{getdetail.date}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default User
