import Image from "next/image";
import React from "react";

type ProfileImageProps = Partial<{
  src: string;
  className: string;
}>;

const ProfileImage = ({ src, className = "" }: ProfileImageProps) => {
  return (
    <div
      className={`${className} relative h-12 w-12 overflow-hidden rounded-full`}
    >
      {src === null ? null : (
        <Image quality={100} src={src!} alt="Image Profile" fill />
      )}
    </div>
  );
};

export default ProfileImage;
