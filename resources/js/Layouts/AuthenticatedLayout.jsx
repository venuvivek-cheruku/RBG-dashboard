import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Head, Link } from "@inertiajs/react";
import ToggleDarkMode from "@/Components/ToggleDarkMode";
import DashboardIcon from "@/Components/icons/DashboardIcon";
import UserGroupIcon from "@/Components/icons/UserGroupIcon";
import SettingsIcon from "@/Components/icons/SettingsIcon";
import MessagesIcon from "@/Components/icons/MessagesIcon";
import ProfileEditIcon from "@/Components/icons/ProfileEditIcon";
import LogoutIcon from "@/Components/icons/LogoutIcon";

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <Head title={header} />

            <div className="bg-gray-300 dark:bg-gray-900 fixed w-full z-[9999]">
                <div className="py-6 px-8 sm:px-10 lg:px-14 bg-white dark:bg-gray-800 shadow flex justify-between items-center">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 bg-gray-300 dark:text-gray-200" />
                    </Link>
                    {header && (
                        <header>
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight text-center">
                                {header}
                            </h2>
                        </header>
                    )}

                    <div className="flex flex-nowrap gap-2 items-center bg-gray-300 dark:bg-gray-700 px-3 py-2 rounded-lg">
                        <ToggleDarkMode />

                        <div className="hidden sm:flex sm:items-center  ">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center  border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-400  hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            <span>
                                                {" "}
                                                <ProfileEditIcon
                                                    color={"#9ca3af"}
                                                />
                                            </span>{" "}
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            <span>
                                                {" "}
                                                <LogoutIcon color={"#9ca3af"} />
                                            </span>{" "}
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-nowrap">
                <nav className="bg-gray-300 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 h-screen min-w-[250px] pt-8 fixed mt-[88px] z-[9998]">
                    <div className="flex flex-col">
                        <div className="hidden mt-8 gap-10 sm:flex flex-col  px-4 sm:px-6 lg:px-8">
                            <NavLink
                                href="/"
                                active={window.location.pathname === "/"}
                            >
                                <span>
                                    <DashboardIcon color={"#9ca3af"} />
                                </span>
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route("material_quantities")}
                                active={route().current("material_quantities")}
                            >
                                <span>
                                    <svg
                                        width="23px"
                                        height="23px"
                                        viewBox="0 0 1024 1024"
                                        className="icon"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M149.861452 92.025796l724.277096 0 0 910.671936-724.277096 0 0-910.671936Z"
                                            fill="transparent"
                                        />
                                        <path
                                            d="M835.155398 113.328063a17.680882 17.680882 0 0 1 17.680882 17.680882v832.492615a17.680882 17.680882 0 0 1-17.680882 17.680882H188.844602a17.680882 17.680882 0 0 1-17.680882-17.680882V131.008945a17.680882 17.680882 0 0 1 17.680882-17.680882h646.310796m0-42.604535H188.844602A60.285417 60.285417 0 0 0 128.559185 131.008945v832.492615a60.285417 60.285417 0 0 0 60.285417 60.285417h646.310796A60.285417 60.285417 0 0 0 895.440815 963.50156V131.008945a60.285417 60.285417 0 0 0-60.285417-60.285417z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M320.279592 21.302268l383.440816 0 0 127.813605-383.440816 0 0-127.813605Z"
                                            fill="#1f2937"
                                        />
                                        <path
                                            d="M678.796755 42.604535a3.621385 3.621385 0 0 1 3.621385 3.621386v77.966299a3.621385 3.621385 0 0 1-3.621385 3.621385H345.203245a3.621385 3.621385 0 0 1-3.621385-3.621385V46.225921a3.621385 3.621385 0 0 1 3.621385-3.621386h333.59351m0-42.604535H345.203245A46.225921 46.225921 0 0 0 298.977325 46.225921v77.966299A46.225921 46.225921 0 0 0 345.203245 170.41814h333.59351A46.225921 46.225921 0 0 0 725.022675 124.19222V46.225921A46.225921 46.225921 0 0 0 678.796755 0z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M353.51113 386.636156l412.624922 0 0 63.906802-412.624922 0 0-63.906802Z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M353.51113 547.255253l412.624922 0 0 63.906802-412.624922 0 0-63.906802Z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M353.51113 707.87435l412.624922 0 0 63.906802-412.624922 0 0-63.906802Z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M257.650926 386.636156l63.906802 0 0 63.906802-63.906802 0 0-63.906802Z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M257.650926 547.255253l63.906802 0 0 63.906802-63.906802 0 0-63.906802Z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M257.650926 707.87435l63.906802 0 0 63.906802-63.906802 0 0-63.906802Z"
                                            fill="#9ca3af"
                                        />
                                    </svg>
                                </span>
                                Material Quantities
                            </NavLink>
                            <NavLink
                                href={route("sustainability_impact")}
                                active={route().current(
                                    "sustainability_impact"
                                )}
                            >
                                <span>
                                    <svg
                                        width="20px"
                                        height="20px"
                                        viewBox="0 0 30 30"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            id="grid"
                                            transform="translate(-435 -1)"
                                        >
                                            <rect
                                                id="Rectangle_12"
                                                data-name="Rectangle 12"
                                                width="12"
                                                height="12"
                                                transform="translate(436 2)"
                                                fill="none"
                                                stroke="#9ca3af"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            />
                                            <rect
                                                id="Rectangle_13"
                                                data-name="Rectangle 13"
                                                width="12"
                                                height="12"
                                                transform="translate(452 2)"
                                                fill="none"
                                                stroke="#9ca3af"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            />
                                            <rect
                                                id="Rectangle_14"
                                                data-name="Rectangle 14"
                                                width="12"
                                                height="12"
                                                transform="translate(436 18)"
                                                fill="none"
                                                stroke="#9ca3af"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            />
                                            <rect
                                                id="Rectangle_15"
                                                data-name="Rectangle 15"
                                                width="12"
                                                height="12"
                                                transform="translate(452 18)"
                                                fill="none"
                                                stroke="#9ca3af"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                Sustainability Impact
                            </NavLink>
                            <NavLink
                                href={route("project_metrics")}
                                active={route().current("project_metrics")}
                            >
                                <span>
                                    <svg
                                        width="23px"
                                        height="23px"
                                        viewBox="0 -12 1048 1048"
                                        className="icon"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1030.447595 997.346554c0-79.160734-222.645117-143.319385-497.289836-143.319385S35.880615 918.185821 35.880615 997.346554z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M54.626872 949.83996h939.127813v37.492514H54.626872z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M1021.220426 1024H26.653446a26.653446 26.653446 0 0 1-26.653446-26.653446c0-28.696877 17.070897-54.880714 50.768468-77.815369 27.389588-18.657412 65.808627-35.19524 114.229053-49.143877 96.257015-27.744968 223.762023-43.026277 359.021914-43.026277s262.726822 15.23054 359.021914 43.026277c48.395042 13.961329 86.81408 30.461081 114.229053 49.143877 33.659494 22.934655 50.768468 49.118493 50.768468 77.815369a26.653446 26.653446 0 0 1-26.653446 26.653446z m-950.08111-53.306891h905.582548c-19.330094-15.89053-54.791869-33.596034-108.542984-49.080417-91.599008-26.399603-213.849479-40.932077-344.24829-40.932077s-252.661973 14.532474-344.24829 40.932077c-53.738423 15.484383-89.21289 33.189886-108.530292 49.080417z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M81.914923 952.340307a26.653446 26.653446 0 0 1-26.653446-26.653445V167.142489a26.653446 26.653446 0 0 1 26.653446-26.653446h178.628855V26.653446a26.653446 26.653446 0 0 1 26.653446-26.653446h379.722756a26.653446 26.653446 0 0 1 26.653446 26.653446v827.373723a26.653446 26.653446 0 0 1-53.306892 0V53.306891H313.850669v113.835598a26.653446 26.653446 0 0 1-26.653445 26.653446H108.568369v731.890927a26.653446 26.653446 0 0 1-26.653446 26.653445zM993.792762 976.493406a26.653446 26.653446 0 0 1-26.653446-26.653446V238.205652H820.723054v626.241745a26.653446 26.653446 0 0 1-53.306891 0V211.552206a26.653446 26.653446 0 0 1 26.653445-26.653445H993.792762a26.653446 26.653446 0 0 1 26.653445 26.653445v738.287754a26.653446 26.653446 0 0 1-26.653445 26.653446z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M244.48825 430.833912H155.732276A13.326723 13.326723 0 0 1 142.405553 417.570649V251.456222a13.326723 13.326723 0 0 1 13.326723-13.326723h88.755974a13.326723 13.326723 0 0 1 13.326723 13.326723V417.570649a13.326723 13.326723 0 0 1-13.326723 13.263263z m-75.429251-26.653446h62.102528V264.782945H169.058999zM244.48825 675.817154H155.732276A13.326723 13.326723 0 0 1 142.405553 662.528508V496.426772a13.326723 13.326723 0 0 1 13.326723-13.326722h88.755974a13.326723 13.326723 0 0 1 13.326723 13.326722V662.528508a13.326723 13.326723 0 0 1-13.326723 13.288646z m-75.429251-26.653446h62.102528V509.753495H169.058999zM452.1059 221.274368h-100.42003a13.326723 13.326723 0 0 1-13.326723-13.326723V107.514923a13.326723 13.326723 0 0 1 13.326723-13.326723h100.432722a13.326723 13.326723 0 0 1 13.326723 13.326723v100.42003a13.326723 13.326723 0 0 1-13.339415 13.339415z m-87.093307-26.653446h73.779276V120.841646h-73.779276zM599.740605 221.274368h-100.42003a13.326723 13.326723 0 0 1-13.326723-13.326723V107.514923a13.326723 13.326723 0 0 1 13.326723-13.326723h100.432722A13.326723 13.326723 0 0 1 613.029251 107.514923v100.42003a13.326723 13.326723 0 0 1-13.288646 13.339415z m-87.093307-26.653446H586.375806V120.841646h-73.728508zM452.1059 408.686168h-100.42003a13.326723 13.326723 0 0 1-13.326723-13.326723v-100.369262a13.326723 13.326723 0 0 1 13.326723-13.326722h100.432722a13.326723 13.326723 0 0 1 13.326723 13.326722v100.42003A13.326723 13.326723 0 0 1 452.1059 408.686168z m-87.093307-26.653446h73.779276v-73.715816h-73.779276zM599.740605 408.686168h-100.42003a13.326723 13.326723 0 0 1-13.326723-13.326723v-100.369262a13.326723 13.326723 0 0 1 13.326723-13.326722h100.432722a13.326723 13.326723 0 0 1 13.326723 13.326722v100.42003A13.326723 13.326723 0 0 1 599.740605 408.686168z m-87.093307-26.653446H586.375806v-73.715816h-73.728508zM452.1059 783.687457h-100.42003a13.326723 13.326723 0 0 1-13.326723-13.326723v-100.432722a13.326723 13.326723 0 0 1 13.326723-13.326723h100.432722a13.326723 13.326723 0 0 1 13.326723 13.326723V770.411502a13.326723 13.326723 0 0 1-13.339415 13.275955z m-87.093307-26.653446h73.779276v-73.779276h-73.779276zM599.740605 783.687457h-100.42003a13.326723 13.326723 0 0 1-13.326723-13.326723v-100.432722a13.326723 13.326723 0 0 1 13.326723-13.326723h100.432722a13.326723 13.326723 0 0 1 13.326723 13.326723V770.411502a13.326723 13.326723 0 0 1-13.339415 13.275955z m-87.093307-26.653446H586.375806v-73.779276h-73.728508zM452.1059 596.212196h-100.42003a13.326723 13.326723 0 0 1-13.326723-13.326723v-100.420029a13.326723 13.326723 0 0 1 13.326723-13.326723h100.432722a13.326723 13.326723 0 0 1 13.326723 13.326723v100.420029a13.326723 13.326723 0 0 1-13.339415 13.326723z m-87.093307-26.653445h73.779276v-73.766584h-73.779276zM599.740605 596.212196h-100.42003a13.326723 13.326723 0 0 1-13.326723-13.326723v-100.420029a13.326723 13.326723 0 0 1 13.326723-13.326723h100.432722a13.326723 13.326723 0 0 1 13.326723 13.326723v100.420029a13.326723 13.326723 0 0 1-13.339415 13.326723z m-87.093307-26.653445H586.375806v-73.766584h-73.728508zM920.10233 509.753495h-57.647595a13.326723 13.326723 0 0 1-13.326723-13.326723V298.721666a13.326723 13.326723 0 0 1 13.326723-13.326723h57.660287a13.326723 13.326723 0 0 1 13.326723 13.326723v197.705106a13.326723 13.326723 0 0 1-13.339415 13.326723z m-44.333565-26.653445h31.006842V312.048389H875.756073zM920.10233 787.406247h-57.647595a13.326723 13.326723 0 0 1-13.326723-13.326723V576.374417a13.326723 13.326723 0 0 1 13.326723-13.326722h57.660287a13.326723 13.326723 0 0 1 13.326723 13.326722v197.705107a13.326723 13.326723 0 0 1-13.339415 13.326723z m-44.333565-26.653446h31.006842V589.70114H875.756073zM222.112048 886.861676a13.326723 13.326723 0 0 1-13.161726-11.295984c-6.587209-42.950124-48.56004-78.335746-48.978879-78.691126a13.326723 13.326723 0 1 1 17.058205-20.472385 206.741894 206.741894 0 0 1 36.807139 42.366287c5.076847-17.312048 13.542489-28.582647 25.384234-33.596034a13.326723 13.326723 0 0 1 10.458305 24.584631c-11.740208 4.962618-15.82707 39.739018-14.26594 62.927516a13.326723 13.326723 0 0 1-11.841745 14.151711 13.466336 13.466336 0 0 1-1.459593 0.025384z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M222.175508 890.808924a13.326723 13.326723 0 0 1-12.984036-10.369459c-3.909172-17.172434-38.406346-25.320773-54.49995-26.577293a13.326723 13.326723 0 0 1 2.068815-26.577293c7.044125 0.545761 69.146653 6.549132 78.411899 47.227367a13.339415 13.339415 0 0 1-13.00942 16.296678z"
                                            fill="#9ca3af"
                                        />
                                        <path
                                            d="M666.91998 932.781755H354.110064a13.326723 13.326723 0 0 1 0-26.653446h312.809916a13.326723 13.326723 0 0 1 0 26.653446z"
                                            fill="#9ca3af"
                                        />
                                    </svg>
                                </span>
                                Project Metrics
                            </NavLink>
                            <NavLink
                                href={route("users_rights")}
                                active={route().current("users_rights")}
                                onClick="return false;"
                                className="opacity-40 pointer-events-none"
                            >
                                <span>
                                    <UserGroupIcon color={"#9ca3af"} />
                                </span>
                                Users & Rights
                            </NavLink>
                            <NavLink
                                href={route("users_rights")}
                                active={route().current("users_rights")}
                                onClick="return false;"
                                className="opacity-40 pointer-events-none"
                            >
                                <span>
                                    <MessagesIcon color={"#9ca3af"} />
                                </span>
                                Messages
                            </NavLink>
                            <NavLink
                                href={route("users_rights")}
                                active={route().current("users_rights")}
                                onClick="return false;"
                                className="opacity-40 pointer-events-none"
                            >
                                <span>
                                    <SettingsIcon color={"#9ca3af"} />
                                </span>
                                Settings
                            </NavLink>
                        </div>
                    </div>
                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href="/"
                                active={window.location.pathname === "/"}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-700">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="w-full h-full p-4 ml-[250px] mt-[90px]">
                    {" "}
                    {children}
                    <div className="credits text-center mt-4">
                        <p>
                            © Developed by{" "}
                            <span className="underline text-yellow-600  hover:text-gray-600 font-medium underline-offset-2">
                                <a href="mailto:venuvivek.cheruku@outlook.com">
                                    Venu Vivek Cheruku
                                </a>
                            </span>
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
