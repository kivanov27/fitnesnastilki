'use client'

import { useState } from "react";
import Image from "next/image";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useSwipeable } from "react-swipeable";

interface SliderProps {
    slides: {
        image: string,
        text: string
    }[]
}

const Slider = ({ slides }: SliderProps) => {
    const [index, setIndex] = useState<number>(0);

    const nextImage = () => {
        setIndex(i => {
            if (i === slides.length - 1) return 0;
            return i + 1;
        });
    };

    const prevImage = () => {
        setIndex(i => {
            if (i === 0) return slides.length - 1;
            return i - 1;
        });
    };

    const handleSwipe = (delta: number) => {
        if (delta > 0) {
            prevImage();
        }
        else if (delta < 0) {
            nextImage();
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleSwipe(-1),
        onSwipedRight: () => handleSwipe(1),
        trackMouse: true,
    });

    return (
        <section
            aria-label="Image Slider"
            className="w-full h-full relative"
        >
            <div {...swipeHandlers} className="w-full h-full flex overflow-hidden">
                {slides.map(({ image, text}, i) => (
                    <div 
                        key={i}
                        style={{
                            transform: `translateX(${-100 * index}%)`,
                            transition: "transform 0.3s ease-in-out",
                            minWidth: "100%",
                            position: "relative",
                        }}
                    >
                        <Image
                            key={text}
                            src={image}
                            alt={text}
                            width={1920}
                            height={600}
                            aria-hidden={index !== i}
                            className="slider-img object-cover w-full h-full block shrink-0 grow-0"
                            draggable="false"
                            // style={{ translate: `${-100 * index}%` }}
                        />         
                        <p 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center
                            p-1 lg:p-3 text-sm lg:text-xl text-white bg-black bg-opacity-40 rounded-md lg:rounded-lg"
                        >
                            {text}
                        </p>
                    </div>
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

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
                {slides.map((_, i) => (
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
