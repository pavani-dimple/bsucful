import React, { useState } from 'react';
import { ArrowLeft, Save, Camera, Mail, Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Content strategist with over 5 years of experience in digital marketing and editorial planning.',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    twitterHandle: '@username',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  
  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };
  
  // Save profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      addNotification('success', 'Profile updated successfully');
    }, 1000);
  };
  
  // Change password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification('error', 'Passwords do not match');
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      addNotification('success', 'Password changed successfully');
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1000);
  };
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailComments: true,
    emailMentions: true,
    emailUpdates: false,
    emailNewsletter: true,
    browserNotifications: true,
  });
  
  // Handle notification toggle
  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };
  
  // Save notification settings
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      addNotification('success', 'Notification settings updated successfully');
    }, 1000);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-primary-500 focus:outline-none"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden">
            <div className="bg-primary-500 h-24"></div>
            <div className="p-4 flex flex-col items-center -mt-12">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg?auto=compress&cs=tinysrgb&w=256'}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-gray-500">{user?.role}</p>
              
              <div className="relative mt-2 group">
                <button className="text-primary-600 text-sm hover:text-primary-700 font-medium">
                  <Camera size={16} className="inline-block mr-1" />
                  Change Photo
                </button>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-4">
              <nav className="space-y-1">
                <button
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <Mail size={16} className="inline-block mr-2" />
                  Profile Information
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'security'
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('security')}
                >
                  <Lock size={16} className="inline-block mr-2" />
                  Security
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Shield size={16} className="inline-block mr-2" />
                  Notifications
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Profile tab */}
          {activeTab === 'profile' && (
            <div className="card overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your personal information and public profile details
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="form-input mt-1"
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="form-input mt-1"
                      />
                    </div>
                    
                    <div className="sm:col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        className="form-textarea mt-1"
                        placeholder="Write a few sentences about yourself"
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        className="form-input mt-1"
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        value={profileData.website}
                        onChange={handleProfileChange}
                        className="form-input mt-1"
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="twitterHandle" className="block text-sm font-medium text-gray-700">
                        Twitter
                      </label>
                      <input
                        type="text"
                        name="twitterHandle"
                        id="twitterHandle"
                        value={profileData.twitterHandle}
                        onChange={handleProfileChange}
                        className="form-input mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <Save size={16} className="mr-2" />
                      )}
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Security tab */}
          {activeTab === 'security' && (
            <div className="card overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your password and security preferences
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="form-input mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="form-input mt-1"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="form-input mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <Lock size={16} className="mr-2" />
                      )}
                      Change Password
                    </button>
                  </div>
                </form>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Status: <span className="text-red-600">Not Enabled</span></p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline"
                    >
                      Enable
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Active Sessions</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your active sessions across devices
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Current Session</p>
                        <p className="text-xs text-gray-500">Chrome on macOS - San Francisco, CA</p>
                        <p className="text-xs text-gray-500">Started 2 hours ago</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Current
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Mobile App</p>
                        <p className="text-xs text-gray-500">iOS App - San Francisco, CA</p>
                        <p className="text-xs text-gray-500">Started 3 days ago</p>
                      </div>
                      <button className="btn btn-sm btn-outline text-red-500 border-red-300 hover:bg-red-50">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications tab */}
          {activeTab === 'notifications' && (
            <div className="card overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage how and when you receive notifications
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSaveNotifications} className="space-y-6">
                  <div className="space-y-6">
                    <fieldset>
                      <legend className="text-base font-medium text-gray-900">Email Notifications</legend>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="emailComments"
                              name="emailComments"
                              type="checkbox"
                              checked={notifications.emailComments}
                              onChange={() => handleNotificationToggle('emailComments')}
                              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="emailComments" className="font-medium text-gray-700">Comments</label>
                            <p className="text-gray-500">Get notified when someone comments on your content.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="emailMentions"
                              name="emailMentions"
                              type="checkbox"
                              checked={notifications.emailMentions}
                              onChange={() => handleNotificationToggle('emailMentions')}
                              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="emailMentions" className="font-medium text-gray-700">Mentions</label>
                            <p className="text-gray-500">Get notified when someone mentions you.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="emailUpdates"
                              name="emailUpdates"
                              type="checkbox"
                              checked={notifications.emailUpdates}
                              onChange={() => handleNotificationToggle('emailUpdates')}
                              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="emailUpdates" className="font-medium text-gray-700">System Updates</label>
                            <p className="text-gray-500">Get notified about system updates and new features.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="emailNewsletter"
                              name="emailNewsletter"
                              type="checkbox"
                              checked={notifications.emailNewsletter}
                              onChange={() => handleNotificationToggle('emailNewsletter')}
                              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="emailNewsletter" className="font-medium text-gray-700">Newsletter</label>
                            <p className="text-gray-500">Receive our monthly newsletter with tips and best practices.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    
                    <fieldset>
                      <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="browserNotifications"
                              name="browserNotifications"
                              type="checkbox"
                              checked={notifications.browserNotifications}
                              onChange={() => handleNotificationToggle('browserNotifications')}
                              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="browserNotifications" className="font-medium text-gray-700">Browser Notifications</label>
                            <p className="text-gray-500">Receive browser notifications for important updates.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <Save size={16} className="mr-2" />
                      )}
                      Save Preferences
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;