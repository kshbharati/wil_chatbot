/* eslint-disable @next/next/no-img-element */
'use client';

import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import styles from '../../styles/Slider.module.css'
import Link from 'next/link';

import BedRoundedIcon from "@mui/icons-material/BedRounded";
import BathtubRoundedIcon from "@mui/icons-material/BathtubRounded";
import TimeToLeaveRoundedIcon from "@mui/icons-material/TimeToLeaveRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

import {Property, Address, PropertyInformation, PropertyImages} from '@prisma/client'
import { API_URI } from '@/constants/*';

interface FacingProperty extends Property {
    propertyInformation?: PropertyInformation;
    address: Address;
    propertyImages?: PropertyImages[];
}

export default function SliderComponent(){
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        fetch(API_URI+"/api/property/featured")
        .then((res)=>res.json())
        .then((data)=>setData(data))
    })

    let properties:FacingProperty[] = data;
    if(!properties) return;

    return processCarousel(properties);

} 

function processCarousel(properties:FacingProperty[])
{
        let carouselItems = [];

        properties.map((property:FacingProperty)=>{
                        let address = property.address;
                        let propInformation = property.propertyInformation;
                        let propertyImages = property.propertyImages;

                        let fullAddress =
                            (address.addressLine1
                                ? address.addressLine1
                                : '') +
                            ", " +
                            address.suburb +
                            ", " +
                            address.postCode +
                            ", " +
                            address.state;
                        let propertyName = property.name
                            ? property.name
                            : fullAddress;
                        let propertyLink = API_URI + "/property/" + property.id;

                        let desc = (
                            <Description
                                propertyName={propertyName}
                                propertyLocation={fullAddress}
                                propertyLink={propertyLink}
                                propertyDescription={
                                    propInformation.propertyDescription
                                        ? propInformation.propertyDescription
                                        : ""
                                }
                                noOfBed={
                                    propInformation.quantityOfBedrooms
                                        ? propInformation.quantityOfBedrooms
                                        : 0
                                }
                                noOfBath={
                                    propInformation.quantityOfBedrooms
                                        ? propInformation.quantityOfBathrooms
                                        : 0
                                }
                                noOfParking={
                                    propInformation.quantityOfParking
                                        ? propInformation.quantityOfParking
                                        : 0
                                }
                                propertyListingType={
                                    propInformation.propertyListingType
                                }
                            />
                        );

                        let imageLink =
                            propertyImages[0] && propertyImages[0].imageLink
                                ? propertyImages[0].imageLink
                                : "";
                        let imageDesc =
                            propertyImages[0] &&
                            propertyImages[0].imageDescription
                                ? propertyImages[0].imageDescription
                                : "";
                        carouselItems.push(
                            <div key={property.id} className="w-full">
                                <img
                                    className="w-fit object-cover h-180"
                                    src={imageLink}
                                    alt={imageDesc}
                                    placeholder="empty"
                                />
                                {desc}
                            </div>
                        );
        });

        return (
            <div className="slider relative top-0 w-full m-height-screen">
                <Carousel showThumbs={false} autoPlay={true} interval={5000}>
                    {carouselItems}
                </Carousel>
            </div>
        );
}

async function getFeatured():Promise<FacingProperty[] | null>{
        let res = await fetch(API_URI + "/api/property/featured");
        if (res.status == 404) {
            return null;
        }

        return res.json();
}

interface CarouselItemProps{
    src:string,
    alt:string
    description?:Description
}


interface DescriptionProps{
    propertyName?:string;
    propertyLink?:string;
    propertyLocation: string;
    propertyDescription?:string;
    noOfBed?:number;
    noOfBath?:number;
    noOfParking?:number;
    propertyType?:string;
    propertyListingType?:string
    price?:string;
}

class Description extends Component<DescriptionProps>{

    constructor(props:DescriptionProps){
        super(props)
    }

    render(): React.ReactNode {
        let price:string="";
        if (this.props.price) {
            price = "$" + this.props.price;
            
            if (this.props.propertyListingType) {
                if (
                    this.props.propertyListingType.toLocaleLowerCase() ===
                    "lease"
                ) {
                    price += " p/w";
                }
            }

        }


        return (
            <>
                {/*  */}
                <div className="flex text-white flex-col space-y-4 text-left w-full rounded-lg absolute bottom-0 left-0 p-10">
                    <div>
                        <Link
                            href={this.props.propertyLink}
                            className="uppercase font-sans text-2xl font-bold hover:underline hover:text-blue-300 text-shadow-xl underline-offset-8"
                        >
                            {this.props.propertyName
                                ? this.props.propertyName
                                : this.props.propertyLocation}
                        </Link>
                    </div>

                    {/*  */}
                    {this.props.propertyDescription && (
                        <div>
                            <span>
                                <p className="text-shadow-xl">
                                    {this.props.propertyDescription}
                                </p>
                            </span>
                        </div>
                    )}

                    {/*  */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-4">
                            <span className="drop-shadow-xl">
                                <LocationOnRoundedIcon color="primary" />
                            </span>
                            <span className="">
                                <p className="text-shadow-xl">
                                    {this.props.propertyLocation}
                                </p>
                            </span>
                        </div>

                        {/*  */}
                        <div className="flex space-x-20">
                            <div className="flex space-x-4 ">
                                <BedRoundedIcon color="primary" />
                                <p className="text-shadow-xl">
                                    {this.props.noOfBed
                                        ? this.props.noOfBed
                                        : 0}
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <BathtubRoundedIcon color="primary" />
                                <p className="text-shadow-xl">
                                    {this.props.noOfBath
                                        ? this.props.noOfBath
                                        : 0}
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <TimeToLeaveRoundedIcon color="primary" />
                                <p className="text-shadow-xl">
                                    {this.props.noOfParking
                                        ? this.props.noOfParking
                                        : 0}
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-10">
                            {this.props.propertyListingType && (
                                <div className="p-2 rounded-md  bg-sky-600 drop-shadow-2xl shadow-xl">
                                    <p className="uppercase font-sans">
                                        {this.props.propertyListingType}
                                    </p>
                                </div>
                            )}

                            {price && (
                                <div className="p-2 rounded-md  bg-sky-600 drop-shadow-2xl shadow-xl">
                                    <p className="font-sans">{price}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}