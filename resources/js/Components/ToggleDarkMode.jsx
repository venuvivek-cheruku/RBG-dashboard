import React, { useState, useEffect } from "react";

export default function ToggleDarkMode() {
    const [darkMode, setDarkMode] = useState(() => {
        return (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
    });

    const toggleTheme = () => {
        const newTheme = darkMode ? "light" : "dark";
        setDarkMode(newTheme === "dark");
        localStorage.theme = newTheme;
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            setDarkMode(mediaQuery.matches);
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            setDarkMode(localStorage.theme === "dark");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        }
    }, [darkMode]);

    return (
        <button onClick={toggleTheme}>
            {" "}
            {darkMode ? (
                <svg
                    version="1.0"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="25px"
                    height="25px"
                    viewBox="0 0 64 64"
                    enableBackground="new 0 0 64 64"
                    xmlSpace="preserve"
                >
                    <g>
                        <circle
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9ca3af"
                            cx="32.003"
                            cy="32.005"
                            r="16.001"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9ca3af"
                            d="M12.001,31.997c0-2.211-1.789-4-4-4H4c-2.211,0-4,1.789-4,4
		s1.789,4,4,4h4C10.212,35.997,12.001,34.208,12.001,31.997z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9ca3af"
                            d="M12.204,46.139l-2.832,2.833c-1.563,1.562-1.563,4.094,0,5.656
		c1.562,1.562,4.094,1.562,5.657,0l2.833-2.832c1.562-1.562,1.562-4.095,0-5.657C16.298,44.576,13.767,44.576,12.204,46.139z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9ca3af"
                            d="M32.003,51.999c-2.211,0-4,1.789-4,4V60c0,2.211,1.789,4,4,4
		s4-1.789,4-4l-0.004-4.001C36.003,53.788,34.21,51.999,32.003,51.999z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9ca3af"
                            d="M51.798,46.143c-1.559-1.566-4.091-1.566-5.653-0.004
		s-1.562,4.095,0,5.657l2.829,2.828c1.562,1.57,4.094,1.562,5.656,0s1.566-4.09,0-5.656L51.798,46.143z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9ca3af"
                            d="M60.006,27.997l-4.009,0.008
		c-2.203-0.008-3.992,1.781-3.992,3.992c-0.008,2.211,1.789,4,3.992,4h4.001c2.219,0.008,4-1.789,4-4
		C64.002,29.79,62.217,27.997,60.006,27.997z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9ca3af"
                            d="M51.798,17.859l2.828-2.829c1.574-1.566,1.562-4.094,0-5.657
		c-1.559-1.567-4.09-1.567-5.652-0.004l-2.829,2.836c-1.562,1.555-1.562,4.086,0,5.649C47.699,19.426,50.239,19.418,51.798,17.859z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9ca3af"
                            d="M32.003,11.995c2.207,0.016,4-1.789,4-3.992v-4
		c0-2.219-1.789-4-4-4c-2.211-0.008-4,1.781-4,3.993l0.008,4.008C28.003,10.206,29.792,11.995,32.003,11.995z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9ca3af"
                            d="M12.212,17.855c1.555,1.562,4.079,1.562,5.646-0.004
		c1.574-1.551,1.566-4.09,0.008-5.649l-2.829-2.828c-1.57-1.571-4.094-1.559-5.657,0c-1.575,1.559-1.575,4.09-0.012,5.653
		L12.212,17.855z"
                        />
                    </g>
                </svg>
            ) : (
                <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z"
                        fill="#1C274C"
                    />
                    <path
                        d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z"
                        fill="#1C274C"
                    />
                    <path
                        opacity="0.5"
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="#1C274C"
                    />
                </svg>
            )}
        </button>
    );
}
