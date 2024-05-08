"use client";
import { Photo } from "@/types/photo";
import { cn } from "@/utils/class-helper";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Slider from "./Slider";
export default function ProductPhotoCard({
  photos,
  alt,
  hasBackground,
  filterInputName,
}: {
  photos: Photo[];
  alt: string;
  hasBackground?: boolean;
  filterInputName?: string;
}) {
  const form = useFormContext();
  const selectedFilterInput = form.watch(filterInputName);
  const customColor = form.watch("customColor");
  const [customColorValue, setCustomColorValue] = useState<string | null>(null);
  const filteredPhotos = filterInputName
    ? photos.filter((photo) => photo.group === selectedFilterInput)
    : photos;

  useEffect(() => {
    setCustomColorValue(null);
  }, [selectedFilterInput]);

  useEffect(() => {
    if (customColor) {
      setCustomColorValue(customColor);
    }
  }, [customColor]);

  return (
    <div
      className={cn(
        "h-[400px] w-[400px] p-10",
        hasBackground ? "bg-white rounded-br-[100px]" : ""
      )}
    >
      <div className=" overflow-hidden ">
        {customColorValue ? (
          <img
            src={"/images/ev-charger/seffaf.png"}
            alt={alt}
            className="  w-fit max-h-[450px] mx-auto h-full object-contain"
            style={{
              backgroundColor: customColorValue,
            }}
          />
        ) : filteredPhotos.length > 0 ? (
          <Slider slides={filteredPhotos} />
        ) : (
          <Slider slides={photos} />
        )}
      </div>
      <div className="flex gap-2.5 pt-5 justify-center">
        {/* {!customColorValue &&
          filteredPhotos?.map((photo) => (
            <button
              type="button"
              key={photo.url}
              onClick={() => handlePhotoChange(photo.order)}
              className={clsx(
                "w-2.5 h-2.5 rounded-[50%]",
                filteredPhotos?.[index]
                  ? index === photo.order - 1
                    ? "bg-[#2a50fe]"
                    : "bg-[#9fa1a7]"
                  : 0 == photo.order - 1
                  ? "bg-[#2a50fe]"
                  : "bg-[#9fa1a7]"
              )}
            ></button>
          ))} */}
      </div>
    </div>
  );
}
