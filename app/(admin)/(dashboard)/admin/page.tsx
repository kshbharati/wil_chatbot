"use client";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useEffect, useState} from "react";
import {User, Contact, ChatbotEnquiry, Property} from '@prisma/client'
import { API_URI } from "@/constants/*";
import Link from "next/link";
import Button from '@mui/material/Button'
interface UserData extends User{
    contact:Contact;
}

interface EnquiryData extends ChatbotEnquiry{
    property:Property
}


const HomeContent =(user:UserData)=>{
    return (
        <>
            <div className="flex flex-col w-11/12">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-xl font-sans text-gray-900">
                                            {user?.name}
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Email
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user?.email}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            User classNameification
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user?.userType}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Landline
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user?.contact?.landline
                                                ? user?.contact?.landline
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Mobile
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user?.contact?.mobile
                                                ? user?.contact?.mobile
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Instagram
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user?.contact?.instagram
                                                ? user?.contact?.instagram
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Twitter
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user?.contact?.twitter
                                                ? user?.contact?.twitter
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Facebook
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user?.contact?.facebook
                                                ? user?.contact?.facebook
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Facebook
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user?.contact?.facebook
                                                ? user?.contact?.facebook
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Website
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user?.contact?.facebook
                                                ? user?.contact?.website
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            User Joined
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {new Date(
                                                user?.contact?.createdAt
                                            ).toLocaleDateString("en-AU")}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Profile Last Updated
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {new Date(
                                                user?.contact?.updatedAt
                                            ).toLocaleDateString("en-AU")}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const EnquiryContent = (enquiryData:EnquiryData[])=>
{
        const enquiryItems = [];
        let i=1;
        enquiryData?.map((enq: EnquiryData) => {
            enquiryItems.push(
                <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {i}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {enq.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {enq.email}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {enq.phoneNumber}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link target="_blank" href={
                            (enq.enquiryDescription.toLocaleLowerCase() ===
                        "property")
                            ? "/property"
                            : ("property/"+enq.enquiryDescription)
                        }>Property</Link>

                    </td>
                </tr>
            );
            i++;
        });

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Contact
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enquiryItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default function AdminHome() {
    const cookies = parseCookies();
    const router=useRouter();


    const [data, setData]=useState(null);
    useEffect(()=>{
        if (!cookies.loggedInUser) {
            router.refresh();
            router.push("/admin/login/");
        }

        if(!data)
        {
                    const id = cookies.loggedInUser;
                    const apiLink = API_URI + "/api/user/" + id;

                    fetch(apiLink)
                        .then((res) => res.json())
                        .then((data) => setData(data));
        }

    
    })

    
    if(!cookies.loggedInUser)
    {
        return (
            <>

            </>
        );
    }

    const userData:UserData=data?.user;
    const enquiryData=data?.enquiries;
    
    return (
        <div>
            <div className="flex absolute sticy top-10 right-10">
                <Button variant="contained" onClick={()=>{
                    destroyCookie({}, 'loggedInUser', {path:"/admin"});
                    let cookie=parseCookies();
                    router.refresh();
                }}>Log Out</Button>
            </div>
            <ul
                className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
                id="tabs-tab"
                role="tablist"
            >
                <li className="nav-item" role="presentation">
                    <a
                        href="#tabs-home"
                        className="
                nav-link
                block
                font-medium
                text-xs
                leading-tight
                uppercase
                border-x-0 border-t-0 border-b-2 border-transparent
                px-6
                py-3
                my-2
                hover:border-transparent hover:bg-gray-100
                focus:border-transparent
                active
                "
                        id="tabs-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#tabs-home"
                        role="tab"
                        aria-controls="tabs-home"
                        aria-selected="true"
                    >
                        Home
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        href="#tabs-profile"
                        className="
                nav-link
                block
                font-medium
                text-xs
                leading-tight
                uppercase
                border-x-0 border-t-0 border-b-2 border-transparent
                px-6
                py-3
                my-2
                hover:border-transparent hover:bg-gray-100
                focus:border-transparent
                "
                        id="tabs-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#tabs-profile"
                        role="tab"
                        aria-controls="tabs-profile"
                        aria-selected="false"
                    >
                        Enquiries
                    </a>
                </li>
            </ul>
            <div className="tab-content" id="tabs-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="tabs-home"
                    role="tabpanel"
                    aria-labelledby="tabs-home-tab"
                >
                    {HomeContent(userData)}
                </div>
                <div
                    className="tab-pane fade"
                    id="tabs-profile"
                    role="tabpanel"
                    aria-labelledby="tabs-profile-tab"
                >
                    {EnquiryContent(enquiryData)}
                </div>
            </div>
        </div>
    );
}

