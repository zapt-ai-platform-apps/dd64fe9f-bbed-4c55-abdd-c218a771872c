import React from 'react';

export default function ProfessionalConfirmationModal({ onConfirm, onDecline }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card-glass p-8 max-w-md w-full space-y-6 animate-slide-up">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-display font-bold text-white">Are you a Professional?</h2>
          <p className="text-gray-300">
            Please confirm if you're a service professional looking to manage your availability
          </p>
        </div>
        
        <div className="grid gap-4">
          <button
            onClick={onConfirm}
            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
          >
            Yes, I'm a Professional
          </button>
          <button
            onClick={onDecline}
            className="bg-surface hover:bg-surface/80 text-white w-full py-4 text-lg rounded-lg transition-colors"
          >
            No, I'm a Client
          </button>
        </div>
      </div>
    </div>
  );
}