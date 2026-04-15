export default function LoadingSpinner({ text = "Carregando...", size = "md", inline = false }) {
    return (
        <div className={`loading-spinner ${size} ${inline ? "inline" : ""}`}>
            <span className="spinner" aria-hidden="true"></span>
            {text ? <span>{text}</span> : null}
        </div>
    );
}