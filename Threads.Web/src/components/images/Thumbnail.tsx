import { Image } from "react-bootstrap";
import { API_URL, PROFILE } from "../../routes/endpoints";
import { Styles } from "@fortawesome/fontawesome-svg-core";
import React from "react";

type ThumbnailProps = {
  username: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
};

const Thumbnail = ({ username, width, height, style }: ThumbnailProps) => {
  return (
    <Image
      className="thumbnail"
      src={API_URL + PROFILE.GET_THUMBNAIL + username}
      roundedCircle
      loading="lazy"
      style={style}
      width={width ?? 50}
      height={height ?? 50}
    />
  );
};

export default Thumbnail;
