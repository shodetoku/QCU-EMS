import React from 'react';

interface LogoutConfirmationModalProps {
  /** Function to call when the user confirms they want to log out. */
  onConfirm: () => void;
  /** Function to call when the user cancels the log out (closes the modal). */
  onCancel: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    // Backdrop/Overlay
    <div
      // Using a slightly darker backdrop for visual pop
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70"
      onClick={onCancel}
    >
      {/* Modal Content (using subtle gray border for definition) */}
      <div
        className="relative w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Main Content - Text is now left-aligned */}
        <div className="text-left">
          {/* Matching the font weight and size from the image */}
          <h3 className="text-base font-semibold text-gray-900">
            Are you sure you want to sign out?
          </h3>
          {/* Removed the secondary paragraph and icons */}
        </div>

        {/* Actions/Buttons - Aligned to the right, spaced at the top */}
        <div className="mt-8 flex justify-end gap-3">
          {/* CANCEL Button: Light gray/white background, subtle hover */}
          <button
            type="button"
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          {/* SIGN OUT Button: Bright purple/indigo background, strong hover */}
          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            onClick={onConfirm}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;