import React, { useState } from 'react';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }
        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            // Here you would typically make an API call to update the password
            console.log('Password Update Data:', formData);
            onClose();
        } else {
            setErrors(newErrors);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className={`mt-1 block w-full border border-black rounded-md p-2 ${errors.currentPassword ? 'border-red-500' : ''}`}
                            placeholder='Current Password'
                        />
                        {errors.currentPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className={`mt-1 block w-full border border-black rounded-md p-2 ${errors.newPassword ? 'border-red-500' : ''}`}
                            placeholder='New Password'
                        />
                        {errors.newPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`mt-1 block w-full border border-black rounded-md p-2 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            placeholder='Confirm Password'
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-outline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;