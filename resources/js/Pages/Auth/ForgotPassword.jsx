import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8  min-h-[90vh] flex flex-col justify-center items-center">
                <div className="mt-6 text-center">
                    <h1 className="text-gray-800 text-2xl font-extrabold uppercase">
                        Forgot your password?
                    </h1>
                    <p className="text-base mt-2 font-medium text-gray-400 max-w-xl mb-4">
                        No problem. Just let us know your email address and we
                        will email you a password reset link that will allow you
                        to choose a new one.
                    </p>
                </div>
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                </form>
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
    );
}
