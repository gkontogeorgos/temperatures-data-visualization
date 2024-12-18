import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <svg
          width="75px"
          height="75px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle cx="512" cy="512" r="512" fill="#c90000"></circle>
            <path
              transform="translate(-33.796 -64.797)"
              d="m545.8 845.8 71.9-404.6c68.6 0 90.2 7.5 93.3 38.2 0 0 46-17.2 69.2-52-90.5-41.9-181.5-43.8-181.5-43.8l-53.1 64.6h.1l-53.1-64.6s-91 1.9-181.5 43.8c23.2 34.8 69.2 52 69.2 52 3.1-30.7 24.7-38.2 92.8-38.3l72.7 404.7m0-480.9c73.2-.6 156.9 11.3 242.7 48.7 11.5-20.6 14.4-29.7 14.4-29.7-93.7-37.1-181.5-49.8-257.1-50.1-75.6.3-163.4 13-257.1 50.1 0 0 4.2 11.2 14.4 29.7 85.7-37.3 169.5-49.2 242.7-48.7"
              fill="#fff"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
