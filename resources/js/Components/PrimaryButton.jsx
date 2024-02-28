export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                ` bg-gray-100 dark:bg-gray-300 px-6 py-2 rounded-md text-gray-600 dark:text-gray-600 uppercase text-base hover:text-gray-800 hover:bg-gray-400 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
