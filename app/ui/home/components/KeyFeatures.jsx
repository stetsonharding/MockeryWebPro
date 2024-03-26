import React from "react";
import Image from "next/image";
import clsx from "clsx";

function KeyFeatures(props) {
  return (
    <div
      className={clsx("flex flex-col md:flex-row", {
        "md:flex-row-reverse": props.even === "yes",
        "bg-gray-100": props.even === "yes"
      })}
    >
      {/* Image and title */}
      <div className="flex justify-center items-center flex-col md:w-1/2">
        <Image
          src={props.imgSrc}
          alt="Creativity"
          width={400}
          height={400}
          className="object-contain"
        />
        <p className="text-home-orange font-bold text-[20px] tracking-wider p-3">
          {props.imageTitle}
        </p>
      </div>
      {/* Feature description */}
      <div className="flex justify-center items-center md:w-1/2">
        <p className="text-blue-700 w-1/2 font-mono font-semibold text-sm m-5 md:text-lg">
          {props.featureDescription}
        </p>
      </div>
    </div>
  );
}

export default KeyFeatures;
