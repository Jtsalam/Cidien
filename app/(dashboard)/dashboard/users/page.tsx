import React from "react";

const Page = () =>{
    return(
        <div>
            <h1>Dashboard Users</h1>

        <ul className="mt-10">
            <li><a href ="/dashboard/users/1">User1</a></li>
            <li><a href ="/dashboard/users/2">User2</a></li>
            <li><a href ="/dashboard/users/3">User3</a></li>
            <li><a href ="/dashboard/users/4">User4</a></li>
            

        </ul>
        </div>
    );
}

export default Page;