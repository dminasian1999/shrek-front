import React from "react";

export default function ConfirmModal({
                                       title = "Are you sure?",
                                       show,
                                       onConfirm,
                                       onCancel,
                                       children,
                                     }: {
  title?: string;
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}) {
  if (!show) return null;
  return (
    <div className="modal d-block" tabIndex={-1} role="dialog" aria-modal="true">
      <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onCancel} />
          </div>
          <div className="modal-body">{children ?? <p>Confirm this action.</p>}</div>
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
            <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </div>
  );
}
