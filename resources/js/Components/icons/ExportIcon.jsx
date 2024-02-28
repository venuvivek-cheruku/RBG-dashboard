import React from "react";

export default function ExportIcon({ color }) {
    return (
        <svg
            fill={color}
            width="23px"
            height="23px"
            viewBox="0 0 36 36"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <title>export-line</title>
            <path
                d="M6,13.61h7.61V6H24v8.38h2V6a2,2,0,0,0-2-2H10.87L4,10.87V30a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2H6Zm0-1.92L11.69,6H12v6H6Z"
                className="clr-i-outline clr-i-outline-path-1"
            ></path>
            <path
                d="M28.32,16.35a1,1,0,0,0-1.41,1.41L30.16,21H18a1,1,0,0,0,0,2H30.19l-3.28,3.28a1,1,0,1,0,1.41,1.41L34,22Z"
                className="clr-i-outline clr-i-outline-path-2"
            ></path>
            <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
        </svg>
    );
}
