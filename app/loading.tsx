'use client';
import React from 'react';
import ReactLoading from 'react-loading'

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <ReactLoading color='#000' type='balls' height='20%' width='20%'/>
        </div>
    );
}
