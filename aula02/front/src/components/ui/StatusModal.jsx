import { FiCheckCircle, FiAlertTriangle, FiInfo } from "react-icons/fi";

const iconByType = {
    success: FiCheckCircle,
    error: FiAlertTriangle,
    info: FiInfo
};

export default function StatusModal({
    open,
    type = "info",
    title,
    message,
    onClose,
    actionLabel = "Fechar"
}) {
    if (!open) {
        return null;
    }

    const Icon = iconByType[type] || iconByType.info;

    return (
        <div className="status-modal-backdrop" onClick={onClose}>
            <div
                className={`status-modal ${type}`}
                role="dialog"
                aria-modal="true"
                aria-live="assertive"
                onClick={(event) => event.stopPropagation()}
            >
                <p className="status-modal-icon"><Icon /></p>
                <h3>{title}</h3>
                <p>{message}</p>
                <button type="button" onClick={onClose}>{actionLabel}</button>
            </div>
        </div>
    );
}