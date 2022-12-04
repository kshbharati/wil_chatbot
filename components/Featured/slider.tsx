'use client'
import { useEffect } from "react";

export default function SliderComponent(){
    // useEffect(()=>{
    //     console.log("Test");
    //     setTimeout(function () {
    //         nextSlide();

    //     }, 3000);
    // })
    return (
        <div className="relative">
            <div className="slider-element slider-active absolute inset-0 w-screen max-h-96 bg-pink-500 text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-0 slide">
                Hello
            </div>
            <div className="slider-element absolute inset-0 w-screen max-h-96 bg-purple-500 text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-full slide">
                There
            </div>
            <div className="slider-element absolute inset-0 w-screen max-h-96 bg-teal-500 text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-full slide">
                Booya!
            </div>

            <div
                onClick={nextSlide}
                className="fixed bottom-0 right-0 bg-white w-16 h-16 flex items-center justify-center text-black"
            >
                &#x276F;
            </div>
            <div
                onClick={previousSlide}
                className="fixed  bottom-0 right-0 bg-white w-16 h-16 mr-16 border-r border-gray-400 flex items-center justify-center text-black"
            >
                &#x276E;
            </div>
        </div>
    );
}

function nextSlide() {
    let slides = document.querySelectorAll('.slider-element');
    let activeSlide:Element=slides[0];

    // if(activeSlide.classList.contains('slider-active'))
    // {
    //     translate(activeSlide, slides[1]);
    //     return;
    // }

    let i=0;
    slides.forEach((element)=>{
        if(element.classList.contains('slider-active')){
            activeSlide=element;
            return;
        }
        i++;
    });

    if((i+1)>=slides.length){
        translate(activeSlide,slides[0])
    }

    let nextSlide=slides[i+1];
    translate(activeSlide,nextSlide);
}

function translate(activeSlide:Element, nextSlide:Element){
    activeSlide.classList.remove("translate-x-0");
    activeSlide.classList.add("-translate-x-full");

    nextSlide.classList.remove("translate-x-full");
    nextSlide.classList.add("translate-x-0");
}
function previousSlide() {
    let activeSlide = document.querySelector(".slide.translate-x-0");
    if (activeSlide) {
        activeSlide.classList.remove("translate-x-0");
        activeSlide.classList.add("-translate-x-full");

        let previousSlide = activeSlide.previousElementSibling;

        if (previousSlide) {
            previousSlide.classList.remove("translate-x-full");
            previousSlide.classList.add("translate-x-0");
        }
    }
}