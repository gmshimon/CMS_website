import React, { useState } from 'react';
import EditProfileModal from '../../Component/EditProfileModal/EditProfileModal';
import ChangePasswordModal from '../../Component/ChangePasswordModal/ChangePasswordModal';

const Profile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    
    // Sample user data - replace with actual data from your backend
    const userData = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        location: 'New York, USA',
        institution: 'University of Technology',
        department: 'Computer Science',
        position: 'Associate Professor',
        researchArea: 'Artificial Intelligence'
    };
    return (
        <section className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
            {/* Hero Section with Profile Picture */}
            <div className="hero bg-base-100 rounded-lg shadow-xl p-6 mb-8">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="avatar">
                        <div className="w-48 h-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="text-center lg:text-left lg:ml-8">
                        <h1 className="text-4xl font-bold">John Doe</h1>
                        <p className="text-xl text-gray-600">Conference Presenter</p>
                        <div className="mt-4 flex gap-4">
                            <button 
                                className="btn btn-primary"
                                onClick={() => setIsEditModalOpen(true)}
                            >
                                Edit Profile
                            </button>
                            <button 
                                className="btn btn-outline"
                                onClick={() => setIsPasswordModalOpen(true)}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Information Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Personal Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 font-semibold min-w-[120px]">Full Name:</span>
                                <span>John Doe</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 font-semibold min-w-[120px]">Email:</span>
                                <span>john.doe@example.com</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 font-semibold min-w-[120px]">Phone:</span>
                                <span>+1 234 567 8900</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 font-semibold min-w-[120px]">Location:</span>
                                <span>New York, USA</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Information Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Professional Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 font-semibold min-w-[120px]">Institution:</span>
                                <span>University of Technology</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 font-semibold min-w-[120px]">Department:</span>
                                <span>Computer Science</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 font-semibold min-w-[120px]">Position:</span>
                                <span>Associate Professor</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 font-semibold min-w-[120px]">Research Area:</span>
                                <span>Artificial Intelligence</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Publications Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Recent Publications</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer">
                                <h3 className="font-semibold">Machine Learning in Healthcare</h3>
                                <p className="text-sm text-gray-600">Published in International Journal of AI, 2023</p>
                            </div>
                            <div className="p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer">
                                <h3 className="font-semibold">Deep Learning Applications</h3>
                                <p className="text-sm text-gray-600">IEEE Conference on AI, 2022</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conference History Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Conference History</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-base-200 rounded-lg">
                                <h3 className="font-semibold">International AI Summit 2023</h3>
                                <p className="text-sm text-gray-600">Presenter - Keynote Speaker</p>
                                <span className="badge badge-primary mt-2">Completed</span>
                            </div>
                            <div className="p-4 bg-base-200 rounded-lg">
                                <h3 className="font-semibold">Tech Conference 2022</h3>
                                <p className="text-sm text-gray-600">Session Chair</p>
                                <span className="badge badge-primary mt-2">Completed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modals */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userData={userData}
            />
            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
        </section>
    );
};

export default Profile;