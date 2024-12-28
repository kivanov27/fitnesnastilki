'use client'

import { useState } from "react";
import Image from "next/image";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { RadioButtonChecked } from "@mui/icons-material";

interface SliderProps {
    images: {
        url: string
        alt: string
    }[]
}

const Slider = ({ images }: SliderProps) => {
    const [index, setIndex] = useState<number>(0);

    const nextImage = () => {
        setIndex(i => {
            if (i === images.length - 1) return 0;
            return i + 1;
        });
    };

    const prevImage = () => {
        setIndex(i => {
            if (i === 0) return images.length - 1;
            return i - 1;
        });
    };

    return (
        <section
            aria-label="Image Slider"
            className="w-full h-full relative"
        >
            <div className="w-full h-full flex overflow-hidden">
                {images.map(({ url, alt}, i) => (
                    <Image
                        // key={url}
                        key={i}
                        src={url}
                        alt={alt}
                        aria-hidden={index !== i}
                        className="object-cover w-full h-full block shrink-0 grow-0"
                        style={{ translate: `${-100 * index}%` }}
                    />         
                ))}
            </div>

            <button
                onClick={prevImage}
                className="slider-btn left-0"
                aria-label="View Previous Image"
            >
                <ArrowCircleLeftIcon aria-hidden />
            </button>

            <button
                onClick={nextImage}
                className="slider-btn right-0"
                aria-label="View Next Image"
            >
                <ArrowCircleRightIcon aria-hidden />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                {images.map((_, i) => (
                    <button 
                        key={i}
                        className="slider-dot"
                        aria-label={`View Image ${i+1}`}
                        onClick={() => setIndex(i)}
                    >
                        {i === index ? (
                            <RadioButtonCheckedIcon aria-hidden />
                        ) : (
                            <RadioButtonUncheckedIcon aria-hidden />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Slider;
