import {Property, Address} from 'prisma'
import Image from 'next/image'
import { PropertyImages, PropertyInformation } from '@prisma/client';

const imageLoader=(src:string)=>{
    return src;
}

export default async function Page({params}) {
    let link="http://localhost:3000/api/property/"+params.pid;

    const res = await fetch(link);
    let property:Property= await res.json();
    if(property){
        let propertyImg:PropertyImages=property.propertyImages[0];
        let address:Address=property.address;
        let propertyInfo:PropertyInformation= property.propertyInformation;

        return (
            <>
                <div>
                    <p>{property.id}</p>
                    <p>{property.name}</p>
                    <p>{property.createdAt}</p>
                    <p>{property.updatedAt}</p>
                </div>

                <Image
                    src={imageLoader(propertyImg.imageLink)}
                    alt={propertyImg.imageDescription}
                    height="500"
                    width="500"
                />
                <div>
                    <p>Address</p>
                    <p>{address.suburb}</p>
                    <p>{address.postcode}</p>
                </div>

                <div>
                    <p>Information</p>
                    <p>{propertyInfo.propertyType}</p>
                    <p>{property.floorSize} m3</p>
                </div>
            </>
        );
    }

    return(
        <>
            {params.pid}
        </>
    );


}

export async function getProperty(pid:any){
    let link="http://localhost:3000/api/property/";
    if(pid){
        link+=pid;
    }
    try {
        const res = await fetch(link);
        return (await res.json());
    } catch (error) {
        console.trace(error);
        return error;
    }


}