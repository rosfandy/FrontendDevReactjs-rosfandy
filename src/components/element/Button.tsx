interface ButtonProps {
    isActive?: boolean;
    onClick?: () => void;
    label: string;
    className?: string;
}

export function Button(props: ButtonProps) {
    const { isActive = true, label, onClick, className = '' } = props;
    return (
        <button
            onClick={onClick}
            className={`${isActive ? 'bg-blue-950 text-white cursor-pointer hover:bg-blue-900' : 'text-gray-500 cursor-default'} border px-8 py-2 rounded uppercase w-full ${className}`}
        >
            {label}
        </button>
    );
}