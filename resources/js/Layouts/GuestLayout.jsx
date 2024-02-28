import ApplicationLogo from "@/Components/ApplicationLogo";
import ToggleDarkMode from "@/Components/ToggleDarkMode";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <>
            <nav className="bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="w-full  bg-white overflow-hidden ">{children}</div>;
        </>
    );
}
