import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DashboardOverview from "./DashboardOverview";

export default function Welcome({ auth, status, canResetPassword }) {
    const welcomeImageUrl = "/images/welcome_ill.gif";
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title={auth.user ? "Dashboard" : "RBG Dashboard"} />

            {auth.user ? (
                <AuthenticatedLayout user={auth.user} header={"Dashboard"}>
                    <DashboardOverview auth={auth} />
                </AuthenticatedLayout>
            ) : (
                <GuestLayout>
                    <Head title="Log in" />

                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8  min-h-[90vh] flex flex-col justify-center items-center">
                        <div className="login-container flex flex-wrap justify-center items-center gap-14 ">
                            <div className="illustrator w-[500px]">
                                <img
                                    src={welcomeImageUrl}
                                    alt=" Login Illustrator"
                                />
                            </div>
                            <div className="login w-[500px] px-4">
                                <div className="mt-6 text-center">
                                    <h1 className="text-gray-800 text-4xl font-extrabold uppercase">
                                        Welcome,
                                    </h1>
                                    <p className="text-xl font-semibold text-gray-600">
                                        sign in to continue
                                    </p>
                                </div>
                                <form onSubmit={submit}>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email"
                                        className="text-gray-800"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />

                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />

                                    <div className="flex items-center justify-between mt-4">
                                        <label className="flex items-center ">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData(
                                                        "remember",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span className="ms-2 text-sm text-gray-700">
                                                Remember me
                                            </span>
                                        </label>
                                        {
                                            <Link
                                                href={route("password.request")}
                                                className="underline text-sm text-gray-700 dark:hover:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                            >
                                                Forgot your password?
                                            </Link>
                                        }
                                    </div>

                                    <PrimaryButton
                                        className="w-[250px] mx-auto mt-8 block"
                                        disabled={processing}
                                    >
                                        Log in
                                    </PrimaryButton>

                                    <div className="text-center mt-10 text-gray-400">
                                        <p>
                                            Don't have an account?{" "}
                                            <span className="text-gray-600">
                                                <Link href={route("register")}>
                                                    Register
                                                </Link>
                                            </span>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="credits text-center">
                        <p>
                            © Developed by{" "}
                            <span className="underline text-yellow-600 hover:text-gray-600 font-medium underline-offset-2">
                                <a href="mailto:venuvivek.cheruku@outlook.com">
                                    Venu Vivek Cheruku
                                </a>
                            </span>
                        </p>
                    </div>
                </GuestLayout>
            )}
        </>
    );
}
