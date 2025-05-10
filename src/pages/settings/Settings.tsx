import React, { useState } from 'react';
import { Save, Trash2, Lock, Globe, Database, Server, Mail } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import { useTheme } from '../../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { addNotification } = useNotification();
  
  const [activeTab, setActiveTab] = useState<'general' | 'account' | 'system' | 'email'>('general');
  const [isSaving, setIsSaving] = useState(false);
  
  // General settings form
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'PrismCMS',
    siteDescription: 'A professional content management system',
    siteUrl: 'https://prismcms.com',
    logoUrl: '',
    faviconUrl: '',
    defaultLanguage: 'en',
    timezone: 'UTC',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24',
  });
  
  // System settings form
  const [systemSettings, setSystemSettings] = useState({
    cacheEnabled: true,
    cacheDuration: '3600',
    debug: false,
    maintenanceMode: false,
    apiEnabled: true,
    maxUploadSize: '10',
    allowedFileTypes: 'jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx,zip',
    backupFrequency: 'daily',
  });
  
  // Email settings form
  const [emailSettings, setEmailSettings] = useState({
    emailProvider: 'smtp',
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'user@example.com',
    smtpPassword: '••••••••',
    smtpEncryption: 'tls',
    fromEmail: 'no-reply@prismcms.com',
    fromName: 'PrismCMS',
  });
  
  // Handle general settings changes
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings({ ...generalSettings, [name]: value });
  };
  
  // Handle system settings changes
  const handleSystemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setSystemSettings({ ...systemSettings, [name]: target.checked });
    } else {
      setSystemSettings({ ...systemSettings, [name]: value });
    }
  };
  
  // Handle email settings changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmailSettings({ ...emailSettings, [name]: value });
  };
  
  // Save settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      addNotification('success', 'Settings saved successfully');
    }, 1000);
  };
  
  // Handle sending test email
  const handleSendTestEmail = () => {
    addNotification('info', 'Sending test email...');
    
    // Simulate API call delay
    setTimeout(() => {
      addNotification('success', 'Test email sent successfully');
    }, 2000);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your system preferences and settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings navigation */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden">
            <nav className="space-y-1 p-4">
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'general'
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('general')}
              >
                <Globe size={16} className="inline-block mr-2" />
                General
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'account'
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('account')}
              >
                <Lock size={16} className="inline-block mr-2" />
                Account
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'system'
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('system')}
              >
                <Server size={16} className="inline-block mr-2" />
                System
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'email'
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('email')}
              >
                <Mail size={16} className="inline-block mr-2" />
                Email
              </button>
            </nav>
          </div>
        </div>
        
        {/* Settings content */}
        <div className="lg:col-span-3">
          {/* General settings */}
          {activeTab === 'general' && (
            <div className="card overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Configure basic information about your website
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                        Site Name
                      </label>
                      <input
                        type="text"
                        name="siteName"
                        id="siteName"
                        value={generalSettings.siteName}
                        onChange={handleGeneralChange}
                        className="form-input mt-1"
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700">
                        Site URL
                      </label>
                      <input
                        type="url"
                        name="siteUrl"
                        id="siteUrl"
                        value={generalSettings.siteUrl}
                        onChange={handleGeneralChange}
                        className="form-input mt-1"
                      />
                    </div>
                    
                    <div className="sm:col-span-6">
                      <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                        Site Description
                      </label>
                      <textarea
                        id="siteDescription"
                        name="siteDescription"
                        rows={3}
                        value={generalSettings.siteDescription}
                        onChange={handleGeneralChange}
                        className="form-textarea mt-1"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Brief description of your website. This may be used by search engines.
                      </p>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
                        Logo URL
                      </label>
                      <input
                        type="text"
                        name="logoUrl"
                        id="logoUrl"
                        value={generalSettings.logoUrl}
                        onChange={handleGeneralChange}
                        className="form-input mt-1"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="faviconUrl" className="block text-sm font-medium text-gray-700">
                        Favicon URL
                      </label>
                      <input
                        type="text"
                        name="faviconUrl"
                        id="faviconUrl"
                        value={generalSettings.faviconUrl}
                        onChange={handleGeneralChange}
                        className="form-input mt-1"
                        placeholder="https://example.com/favicon.ico"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700">
                        Default Language
                      </label>
                      <select
                        id="defaultLanguage"
                        name="defaultLanguage"
                        value={generalSettings.defaultLanguage}
                        onChange={handleGeneralChange}
                        className="form-select mt-1"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        name="timezone"
                        value={generalSettings.timezone}
                        onChange={handleGeneralChange}
                        className="form-select mt-1"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                        Date Format
                      </label>
                      <select
                        id="dateFormat"
                        name="dateFormat"
                        value={generalSettings.dateFormat}
                        onChange={handleGeneralChange}
                        className="form-select mt-1"
                      >
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MMMM D, YYYY">MMMM D, YYYY</option>
                      </select>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                        Theme
                      </label>
                      <select
                        id="theme"
                        name="theme"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as any)}
                        className="form-select mt-1"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </select>
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
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Account settings */}
          {activeTab === 'account' && (
            <div className="card overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage user account settings and security policies
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="space-y-6">
                    <fieldset className="space-y-4">
                      <legend className="text-base font-medium text-gray-900">User Registration</legend>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="allowRegistration"
                            name="allowRegistration"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="allowRegistration" className="font-medium text-gray-700">Allow user registration</label>
                          <p className="text-gray-500">When enabled, new users can register for an account.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="requireApproval"
                            name="requireApproval"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="requireApproval" className="font-medium text-gray-700">Require admin approval</label>
                          <p className="text-gray-500">New user accounts require administrator approval before activation.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="emailVerification"
                            name="emailVerification"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="emailVerification" className="font-medium text-gray-700">Require email verification</label>
                          <p className="text-gray-500">Users must verify their email address before they can log in.</p>
                        </div>
                      </div>
                    </fieldset>
                    
                    <fieldset className="space-y-4">
                      <legend className="text-base font-medium text-gray-900">Password Policy</legend>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="strongPassword"
                            name="strongPassword"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="strongPassword" className="font-medium text-gray-700">Require strong passwords</label>
                          <p className="text-gray-500">Passwords must be at least 8 characters and include uppercase, lowercase, numbers, and symbols.</p>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="passwordExpiration" className="block text-sm font-medium text-gray-700">
                          Password Expiration
                        </label>
                        <select
                          id="passwordExpiration"
                          name="passwordExpiration"
                          className="form-select mt-1"
                          defaultValue="90"
                        >
                          <option value="never">Never</option>
                          <option value="30">30 days</option>
                          <option value="60">60 days</option>
                          <option value="90">90 days</option>
                          <option value="180">180 days</option>
                        </select>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="lockoutEnabled"
                            name="lockoutEnabled"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="lockoutEnabled" className="font-medium text-gray-700">Enable account lockout</label>
                          <p className="text-gray-500">Lock account after 5 failed login attempts for 15 minutes.</p>
                        </div>
                      </div>
                    </fieldset>
                    
                    <fieldset className="space-y-4">
                      <legend className="text-base font-medium text-gray-900">User Roles</legend>
                      
                      <div className="space-y-2">
                        <div className="border rounded-md p-4">
                          <h4 className="font-medium text-gray-900">Administrator</h4>
                          <p className="text-sm text-gray-500">Full access to all features and settings.</p>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <h4 className="font-medium text-gray-900">Editor</h4>
                          <p className="text-sm text-gray-500">Can create and edit all content, but cannot modify system settings.</p>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <h4 className="font-medium text-gray-900">Author</h4>
                          <p className="text-sm text-gray-500">Can create and edit their own content only.</p>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <h4 className="font-medium text-gray-900">Viewer</h4>
                          <p className="text-sm text-gray-500">Can only view content, cannot make any changes.</p>
                        </div>
                      </div>
                      
                      <button type="button" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        + Manage custom roles
                      </button>
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
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* System settings */}
          {activeTab === 'system' && (
            <div className="card overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900">System Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Configure system performance and technical settings
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="cacheEnabled"
                            name="cacheEnabled"
                            type="checkbox"
                            checked={systemSettings.cacheEnabled}
                            onChange={handleSystemChange}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="cacheEnabled" className="font-medium text-gray-700">Enable Caching</label>
                          <p className="text-gray-500">Improve performance by caching frequently accessed data.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="cacheDuration" className="block text-sm font-medium text-gray-700">
                        Cache Duration (seconds)
                      </label>
                      <input
                        type="number"
                        name="cacheDuration"
                        id="cacheDuration"
                        value={systemSettings.cacheDuration}
                        onChange={handleSystemChange}
                        className="form-input mt-1"
                        disabled={!systemSettings.cacheEnabled}
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="debug"
                            name="debug"
                            type="checkbox"
                            checked={systemSettings.debug}
                            onChange={handleSystemChange}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="debug" className="font-medium text-gray-700">Debug Mode</label>
                          <p className="text-gray-500">Enable detailed error reporting and logging.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="maintenanceMode"
                            name="maintenanceMode"
                            type="checkbox"
                            checked={systemSettings.maintenanceMode}
                            onChange={handleSystemChange}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="maintenanceMode" className="font-medium text-gray-700">Maintenance Mode</label>
                          <p className="text-gray-500">Put the site into maintenance mode for all visitors.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="apiEnabled"
                            name="apiEnabled"
                            type="checkbox"
                            checked={systemSettings.apiEnabled}
                            onChange={handleSystemChange}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="apiEnabled" className="font-medium text-gray-700">Enable API</label>
                          <p className="text-gray-500">Allow API access to your content.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="maxUploadSize" className="block text-sm font-medium text-gray-700">
                        Max Upload Size (MB)
                      </label>
                      <input
                        type="number"
                        name="maxUploadSize"
                        id="maxUploadSize"
                        value={systemSettings.maxUploadSize}
                        onChange={handleSystemChange}
                        className="form-input mt-1"
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="allowedFileTypes" className="block text-sm font-medium text-gray-700">
                        Allowed File Types
                      </label>
                      <input
                        type="text"
                        name="allowedFileTypes"
                        id="allowedFileTypes"
                        value={systemSettings.allowedFileTypes}
                        onChange={handleSystemChange}
                        className="form-input mt-1"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Comma-separated list of allowed file extensions.
                      </p>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700">
                        Backup Frequency
                      </label>
                      <select
                        id="backupFrequency"
                        name="backupFrequency"
                        value={systemSettings.backupFrequency}
                        onChange={handleSystemChange}
                        className="form-select mt-1"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Database</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Database connection and maintenance options
                    </p>
                    
                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Database Configuration</p>
                            <p className="text-xs text-gray-500">PostgreSQL Database</p>
                            <p className="text-xs text-gray-500">Connected to: postgres@localhost</p>
                          </div>
                          <button
                            type="button"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            <Database size={16} className="inline-block mr-1" />
                            Test Connection
                          </button>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <button
                          type="button"
                          className="btn btn-outline"
                        >
                          Run Migrations
                        </button>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <button
                          type="button"
                          className="btn btn-outline text-accent-500 border-accent-300 hover:bg-accent-50"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Clear Cache
                        </button>
                      </div>
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
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Email settings */}
          {activeTab === 'email' && (
            <div className="card overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900">Email Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Configure email delivery settings and templates
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="emailProvider" className="block text-sm font-medium text-gray-700">
                        Email Provider
                      </label>
                      <select
                        id="emailProvider"
                        name="emailProvider"
                        value={emailSettings.emailProvider}
                        onChange={handleEmailChange}
                        className="form-select mt-1"
                      >
                        <option value="smtp">SMTP</option>
                        <option value="sendgrid">SendGrid</option>
                        <option value="mailgun">Mailgun</option>
                        <option value="ses">Amazon SES</option>
                      </select>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="fromEmail" className="block text-sm font-medium text-gray-700">
                        From Email
                      </label>
                      <input
                        type="email"
                        name="fromEmail"
                        id="fromEmail"
                        value={emailSettings.fromEmail}
                        onChange={handleEmailChange}
                        className="form-input mt-1"
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="fromName" className="block text-sm font-medium text-gray-700">
                        From Name
                      </label>
                      <input
                        type="text"
                        name="fromName"
                        id="fromName"
                        value={emailSettings.fromName}
                        onChange={handleEmailChange}
                        className="form-input mt-1"
                      />
                    </div>
                    
                    {emailSettings.emailProvider === 'smtp' && (
                      <>
                        <div className="sm:col-span-3">
                          <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-700">
                            SMTP Host
                          </label>
                          <input
                            type="text"
                            name="smtpHost"
                            id="smtpHost"
                            value={emailSettings.smtpHost}
                            onChange={handleEmailChange}
                            className="form-input mt-1"
                          />
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700">
                            SMTP Port
                          </label>
                          <input
                            type="text"
                            name="smtpPort"
                            id="smtpPort"
                            value={emailSettings.smtpPort}
                            onChange={handleEmailChange}
                            className="form-input mt-1"
                          />
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor="smtpUsername" className="block text-sm font-medium text-gray-700">
                            SMTP Username
                          </label>
                          <input
                            type="text"
                            name="smtpUsername"
                            id="smtpUsername"
                            value={emailSettings.smtpUsername}
                            onChange={handleEmailChange}
                            className="form-input mt-1"
                          />
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-700">
                            SMTP Password
                          </label>
                          <input
                            type="password"
                            name="smtpPassword"
                            id="smtpPassword"
                            value={emailSettings.smtpPassword}
                            onChange={handleEmailChange}
                            className="form-input mt-1"
                          />
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor="smtpEncryption" className="block text-sm font-medium text-gray-700">
                            Encryption
                          </label>
                          <select
                            id="smtpEncryption"
                            name="smtpEncryption"
                            value={emailSettings.smtpEncryption}
                            onChange={handleEmailChange}
                            className="form-select mt-1"
                          >
                            <option value="none">None</option>
                            <option value="ssl">SSL</option>
                            <option value="tls">TLS</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Email Templates</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Configure the email templates for various system notifications
                    </p>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 hover:border-primary-500 cursor-pointer transition-colors">
                        <h4 className="font-medium text-gray-900">Welcome Email</h4>
                        <p className="text-sm text-gray-500 mt-1">Sent to new users upon registration</p>
                      </div>
                      
                      <div className="border rounded-md p-4 hover:border-primary-500 cursor-pointer transition-colors">
                        <h4 className="font-medium text-gray-900">Password Reset</h4>
                        <p className="text-sm text-gray-500 mt-1">Sent when a user requests a password reset</p>
                      </div>
                      
                      <div className="border rounded-md p-4 hover:border-primary-500 cursor-pointer transition-colors">
                        <h4 className="font-medium text-gray-900">Email Verification</h4>
                        <p className="text-sm text-gray-500 mt-1">Sent to verify user email addresses</p>
                      </div>
                      
                      <div className="border rounded-md p-4 hover:border-primary-500 cursor-pointer transition-colors">
                        <h4 className="font-medium text-gray-900">Comment Notification</h4>
                        <p className="text-sm text-gray-500 mt-1">Sent when someone comments on your content</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleSendTestEmail}
                    >
                      <Mail size={16} className="mr-2" />
                      Send Test Email
                    </button>
                    
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
                      Save Settings
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

export default Settings;