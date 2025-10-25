import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';


const UnifiedLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [error, setError] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem(`user_${formData.userId}`);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === formData.password) {
        localStorage.setItem('loggedInUser', JSON.stringify({
          userId: formData.userId,
          role: user.role,
          name: user.name
        }));

        switch (user.role) {
          case 'student': navigate('/student-portal'); break;
          case 'admission': navigate('/admin'); break;
          case 'registrar': navigate('/registrar'); break;
          case 'department': navigate('/department'); break;
          default: setError('Invalid user role');
        }
      } else setError('Invalid User ID or Password');
    } else setError('Invalid User ID or Password');
  };

  const seedDemoCredentials = () => {
    const demoUsers = [
      { userId: 'STU-25-1822', password: 'Student2025', role: 'student', name: 'John Doe', email: 'john.doe@example.com' },
      { userId: 'ADM-001', password: 'Admin2025', role: 'admission', name: 'Maria Santos', email: 'maria.santos@qcu.edu.ph' },
      { userId: 'REG-001', password: 'Registrar2025', role: 'registrar', name: 'Robert Cruz', email: 'robert.cruz@qcu.edu.ph' },
      { userId: 'DEPT-CS-001', password: 'Dept2025', role: 'department', name: 'Dr. Ana Reyes', email: 'ana.reyes@qcu.edu.ph' }
    ];

    demoUsers.forEach(user => localStorage.setItem(`user_${user.userId}`, JSON.stringify(user)));

    alert(
      'Demo credentials created!\n\n' +
      'Student:\nUser ID: STU-25-1822\nPassword: Student2025\n\n' +
      'Admission Staff:\nUser ID: ADM-001\nPassword: Admin2025\n\n' +
      'Registrar Staff:\nUser ID: REG-001\nPassword: Registrar2025\n\n' +
      'Department Staff:\nUser ID: DEPT-CS-001\nPassword: Dept2025'
    );
  };

  // ===== Forgot Password Flow =====
  const handleForgotPassword = () => {
    setShowResetModal(true);
    setResetStep(1);
    setResetEmail('');
    setResetCode('');
    setNewPassword('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSendCode = () => {
    if (!resetEmail) { alert('Please enter your email.'); return; }
    setResetStep(2);
    alert(`A 4-digit code has been sent to ${resetEmail}`);
  };

  const handleResetPassword = () => {
    if (resetCode.length !== 4) { alert('Please enter a valid 4-digit code.'); return; }
    if (newPassword.length < 6) { alert('Password must be at least 6 characters long.'); return; }

    const confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement;
    if (confirmPasswordInput && newPassword !== confirmPasswordInput.value) {
      alert('Passwords do not match!'); return;
    }

    alert('Password successfully reset! You can now log in with your new password.');
    closeResetModal();
  };

  const closeResetModal = () => {
    setShowResetModal(false);
    setResetStep(1);
    setResetEmail('');
    setResetCode('');
    setNewPassword('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== Header ===== */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/qcu-logo.png" alt="QCU" className="h-12 w-12 mr-3" />
            <div>
              <span className="text-white font-bold text-xl">Quezon City University</span>
              <p className="text-blue-200 text-sm">Excellence in Education since 1994</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-colors">Home</button>
            <button className="px-6 py-2 text-white hover:text-blue-200">About QCU</button>
            <button className="px-6 py-2 text-white hover:text-blue-200">Programs</button>
            <button onClick={() => navigate('/apply')} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">Apply Now</button>
          </div>
        </div>
      </div>

      {/* ===== LOGIN FORM ===== */}
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <LogIn className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">LOGIN</h1>
            <p className="text-gray-600 text-sm">Login to access your corresponding portal</p>
          </div>

          {error && <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-center text-red-600">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder="Enter your User ID"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
             <div className="relative">
  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Enter your Password"
    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    required
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>

            </div>

            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">Login</button>
          </form>

          <div className="text-center mt-4">
            <button onClick={handleForgotPassword} className="text-sm text-blue-600 hover:text-blue-700">Forgot your password?</button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-xs text-gray-600 mb-2">For testing purposes only</p>
            <button onClick={seedDemoCredentials} className="w-full py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Create Demo Credentials
            </button>
          </div>
        </div>
      </div>

      {/* ===== FORGOT PASSWORD MODAL ===== */}
      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center animate-scaleIn">

            {/* Step 1: Email */}
            {resetStep === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Reset your password</h2>
                <p className="text-gray-600 mb-4 text-sm">Enter your email and we'll send you a 4-digit code.</p>
                <div className="relative mb-4">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="email" placeholder="Enter your email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <button onClick={handleSendCode} className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Send Code</button>
                <button onClick={closeResetModal} className="mt-3 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
              </>
            )}

            {/* Step 2: 4-digit code */}
            {resetStep === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Enter 4-digit code</h2>
                <p className="text-gray-600 mb-4 text-sm">A 4-digit code has been sent to <strong>{resetEmail}</strong></p>
                <div className="flex justify-center gap-3 mb-6">
                  {[0, 1, 2, 3].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={resetCode[i] || ''}
                      id={`code-${i}`}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        const newCode = resetCode.split('');
                        newCode[i] = val;
                        setResetCode(newCode.join(''));
                        if (val && i < 3) document.getElementById(`code-${i + 1}`)?.focus();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !resetCode[i] && i > 0)
                          document.getElementById(`code-${i - 1}`)?.focus();
                      }}
                      className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (resetCode.length === 4) setResetStep(3);
                    else alert('Please enter the 4-digit code.');
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Next
                </button>
                <button onClick={closeResetModal} className="mt-3 text-sm text-gray-500 hover:text-gray-700">
                  Cancel
                </button>
              </>
            )}

            {/* Step 3: New Password */}
{resetStep === 3 && (
  <>
    <h2 className="text-xl font-semibold mb-2 text-gray-800">Set new password</h2>
    <div className="space-y-3 mb-4 text-left">
      {/* New Password */}
      <label className="text-sm font-medium text-gray-700">New password</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type={showNewPassword ? 'text' : 'password'}
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm New Password */}
      <label className="text-sm font-medium text-gray-700">Confirm new password</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm new password"
          id="confirm-password"
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>

    <button
      onClick={handleResetPassword}
      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      Reset Password
    </button>

    <button
      onClick={closeResetModal}
      className="mt-3 text-sm text-gray-500 hover:text-gray-700"
    >
      Cancel
    </button>
  </>
)}

          </div>
        </div>
      )}

      {/* ===== Animations ===== */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default UnifiedLogin;
