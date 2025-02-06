function Button({ text, ...props }) {
    return (
        <button {...props} className={`px-4 py-2 rounded-md ${props.className || ""}`}>
            {text}
        </button>
    );
}

export default Button;
