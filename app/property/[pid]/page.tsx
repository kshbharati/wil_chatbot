import Head from 'next/head'
import Image from "next/image";
import * as MaterialIcon from "@components/MaterialIcons";
import {
    Property,
    Address,
    PropertyImages,
    PropertyInformation,
    User,
    Contact
} from "@prisma/client";
import { notFound } from "next/navigation";
import { API_URI } from "@/constants/*";
import DefaultTags from 'app/DefaultTags';

const imageLoader = (src: string) => {
    return src;
};

interface FacingProperty extends Property {
    propertyInformation?: PropertyInformation;
    address: Address;
    propertyImages?: PropertyImages[];
    agent?: FacingUser;
}

interface FacingUser extends User{
    contact: Contact
}


export default async function IndividualPropertyPage({ params }) {
    let link = API_URI + "/api/property/" + params.pid;

    const res = await fetch(link);

    if (res.status === 404) notFound();

    let property: FacingProperty = await res.json();

    if (property) {
        return propertyView(property);
    }

    return notFound();
}

const Header = (props:any) =>{
    return (
        <Head>
            <DefaultTags />
            <title>{props.title} | Buy With Us</title>
        </Head>
    );
}


function propertyView(property: FacingProperty) {
    let propertyImg: PropertyImages = property.propertyImages[0];
    let address: Address = property.address;
    let propertyInfo: PropertyInformation = property.propertyInformation;
    let agent: FacingUser = property.agent;
    return (
        <>
            <Header title={property.name+" | Buy With Us"} />
            <div className="w-full flex flex-col min-w-full">
                <div className="information flex static w-full max-w-full">
                    <div className="shadow-inner w-full min-h-96 h-96 bg-slate-400 overflow-hidden">
                        <Image
                            src={propertyImg?.imageLink}
                            height={720}
                            width={1280}
                            alt={propertyImg?.imageDescription}
                            className="w-full h-96 object-cover"
                            placeholder='empty'
                        />
                    </div>
                    <div className="w-1/4 absolute right-0 bg-slate-600/75 h-96 shadow-2xl drop-shadow-2xl text-shadow-xl">
                        <div className="p-5 absolute bottom-0 flex flex-col space-y-4 text-white content-center">
                            <div>
                                <p className="text-4xl text-shadow-xl truncate overflow-hidden">
                                    {property.name}
                                </p>
                                <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">
                                    {propertyInfo.propertyListingType ===
                                    "LEASE"
                                        ? "LEASE"
                                        : "BUY"}
                                </span>
                            </div>
                            {address.addressLine1 && (
                                <div className="flex space-x-5">
                                    <div className="inline-flex">
                                        <MaterialIcon.HomeIcon color="secondary" />
                                    </div>
                                    <div className="inline-flex">
                                        <span>{address.addressLine1}</span>
                                    </div>
                                </div>
                            )}
                            <div className="flex space-x-5">
                                <div className="inline-flex">
                                    <MaterialIcon.LocationCityRoundedIcon color="primary" />
                                </div>
                                <div className="inline-flex">
                                    <span className="">
                                        {address.suburb +
                                            " " +
                                            address.state +
                                            " " +
                                            address.postCode}
                                    </span>
                                </div>
                            </div>
                            {agent && Agent(agent)}

                        </div>
                    </div>
                </div>

                {PropertyPageAccordion(property)}
            </div>
        </>
    );
}

const Agent = (agent: FacingUser) => (
    <div className="flex flex-col rounded-xl p-4 bg-slate-700">
        <div className="mb-0 w-full">
            <h2 className="accordion-header text-xl underline">
                Contact Agent
            </h2>
        </div>
        {agent?.name && (
            <div className="">
                <span className="text-lg">{agent?.name}</span>
            </div>
        )}
        <div className="flex space-x-2">
            {agent?.contact?.landline && (
                <div className="flex space-x-4">
                    <div>
                        <MaterialIcon.LocalPhoneRoundedIcon color="primary" />
                    </div>
                    <div>
                        <span className="text-sm">
                            {agent?.contact?.landline}
                        </span>
                    </div>
                </div>
            )}

            {agent?.contact?.mobile && (
                <div className="flex space-x-4">
                    <div>
                        <MaterialIcon.PhoneAndroidRoundedIcon color="primary" />
                    </div>
                    <div>
                        <span className="text-sm">
                            {agent?.contact?.mobile}
                        </span>
                    </div>
                </div>
            )}
        </div>

        {agent?.email && (
            <div className="flex space-x-4">
                <div>
                    <MaterialIcon.EmailRoundedIcon color="primary" />
                </div>
                <div>
                    <span className="text-sm">{agent?.email}</span>
                </div>
            </div>
        )}
    </div>
);
const PropertyPageAccordion = (property:FacingProperty) =>(
        <div
            className="container accordion min-w-full place-content-center flex flex-col drop-shadow-2xl my-2"
            id="propertyPageAccordion"
        >
            {DetailedInfo(property.propertyInformation)}
            {ImageList(property.propertyImages)}
            {FloorSize(property.propertyInformation)}
        </div>    
);

const DetailedInfo = (propertyInfo: PropertyInformation) => (
    <div className="w-11/12 mx-auto accordion-item">
        <h2 className="accordion-header mb-0" id="headingOne">
            <button
                className="
                                accordion-button
                                relative
                                flex
                                items-center
                                w-full
                                py-4
                                px-5
                                text-base text-gray-800 text-left
                                bg-white
                                border-0
                                rounded-none
                                transition
                                focus:outline-none
                            "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
            >
                Detailed Information
            </button>
        </h2>

        <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#propertyPageAccordion"
        >
            <div className="accordion-body border-solid border-2 rounded-b-lg w-full p-2">
                {propertyInfo.propertyDescription}
            </div>
        </div>
    </div>
);

const ImageList = (propertyImages: PropertyImages[]) => (
    <div className="w-11/12 mx-auto accordion-item">
        <h2 className="accordion-header mb-0" id="headingTwo">
            <button
                className="
                                accordion-button
                                collapsed
                                relative
                                flex
                                items-center
                                w-full
                                py-4
                                px-5
                                text-base text-gray-800 text-left
                                bg-white
                                border-0
                                rounded-none
                                transition
                                focus:outline-none
                            "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
            >
                Images
            </button>
        </h2>

        <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#propertyPageAccordion"
        >
            <div className="accordion-body border-solid border-2 rounded-b-lg w-full p-2">
                <div className="flex flex-row flex-wrap w-full space-x-4">
                    {propertyImages &&
                        propertyImages.map((image: PropertyImages) => {
                            return (
                                <div
                                    className=""
                                    key={image.id}
                                >
                                    <Image
                                        className="rounded-xl w-48 h-36 drop-shadow-2xl hover:w-96 hover:h-80 hover:z-45"
                                        src={image.imageLink}
                                        alt={image.imageDescription}
                                        height={720}
                                        width={1280}
                                        placeholder="empty"
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    </div>
);

const FloorSize = (propertyInfo:PropertyInformation)=>(
        <div className="w-11/12 mx-auto accordion-item">
        <h2 className="accordion-header mb-0" id="headingThree">
            <button
                className="
                                accordion-button
                                collapsed
                                relative
                                flex
                                items-center
                                w-full
                                py-4
                                px-5
                                text-base text-gray-800 text-left
                                bg-white
                                border-0
                                rounded-none
                                transition
                                focus:outline-none
                            "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
            >
                Floor information
            </button>
        </h2>

        <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#propertyPageAccordion"
        >
            <div className="accordion-body border-solid border-2 rounded-b-lg w-full p-2">
                Pictures and Floor Size
            </div>
        </div>
    </div>
)

async function getProperty(pid: any) {
    let link = "http://localhost:3000/api/property/";
    if (pid) {
        link += pid;
    }
    try {
        const res = await fetch(link);
        return await res.json();
    } catch (error) {
        // console.trace(error);
        return null;
    }
}
