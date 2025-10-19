import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, ArrowLeft, Bell } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInStudent');
    navigate('/student-login');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const notifications = [
    {
      title: 'Registration Form',
      date: '8/10/25',
      message: 'The registration forms will be released on Monday, August 12, 2025.',
      detail: 'Make sure to claim your form at your assigned schedule.',
      isNew: true
    },
    {
      title: 'Enrollment Period',
      date: '7/20/25',
      message: 'The official enrollment period is scheduled from August 1 to 9, 2025.',
      detail: 'Strictly follow the schedule, as late processing will not be permitted.',
      isNew: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/qcu-logo.png" alt="QCU" className="h-10 w-10 mr-3" />
            <span className="text-white font-bold text-lg">QCU</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white text-sm">Welcome</span>
            <button className="text-white hover:text-gray-200">
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center text-white hover:text-gray-200"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <button
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-white border-l-4 border-blue-600 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">
                    {notification.title}
                    {notification.isNew && <span className="text-red-500 ml-2">•</span>}
                  </h3>
                </div>
                <span className="text-sm text-gray-500">{notification.date}</span>
              </div>

              <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
              <p className="text-sm text-gray-600">{notification.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
