import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, School, GraduationCap, Users,
  ChevronDown, ArrowRight, Lock, Sparkles
} from 'lucide-react';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const roles = [
    { id: 'admin', name: 'Administrator', icon: <School size={20} />, color: 'bg-purple-100 text-purple-600' },
    { id: 'teacher', name: 'Teacher', icon: <User size={20} />, color: 'bg-blue-100 text-blue-600' },
    { id: 'student', name: 'Student', icon: <GraduationCap size={20} />, color: 'bg-green-100 text-green-600' },
    { id: 'parent', name: 'Parent', icon: <Users size={20} />, color: 'bg-amber-100 text-amber-600' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect after success animation
      setTimeout(() => {
        window.location.href = `/${selectedRole}`;
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <AnimatePresence>
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
            <p className="text-gray-600 mb-6">Redirecting to your dashboard...</p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
          >
            <div className="text-center mb-8">
              <motion.div
                whileHover={{ rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4"
              >
                <Lock className="text-white w-8 h-8" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">School Portal</h1>
              <p className="text-gray-500">Select your role to continue</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6 relative">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                    isDropdownOpen ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center">
                    {selectedRole ? (
                      <>
                        <span className={`${roles.find(r => r.id === selectedRole).color} p-2 rounded-lg mr-3`}>
                          {roles.find(r => r.id === selectedRole).icon}
                        </span>
                        <span className="font-medium text-gray-800">
                          {roles.find(r => r.id === selectedRole).name}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-400">Select your role</span>
                    )}
                  </div>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                      {roles.map((role) => (
                        <motion.div
                          key={role.id}
                          whileHover={{ backgroundColor: '#f8fafc' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedRole(role.id);
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center p-4 cursor-pointer transition-colors"
                        >
                          <span className={`${role.color} p-2 rounded-lg mr-3`}>
                            {role.icon}
                          </span>
                          <span className="font-medium text-gray-800">{role.name}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {selectedRole && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedRole === 'student' ? 'Student ID' : 
                     selectedRole === 'teacher' ? 'Teacher ID' : 
                     selectedRole === 'parent' ? 'Parent ID' : 'Admin ID'}
                  </label>
                  <input
                    type="text"
                    id="id"
                    placeholder={`Enter your ${selectedRole} ID`}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all"
                    required
                  />
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={!selectedRole || isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center transition-all ${
                  selectedRole 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Secure school portal access</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;