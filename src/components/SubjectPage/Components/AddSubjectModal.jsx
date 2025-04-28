import React from 'react';
import { X } from 'lucide-react';
import IconComponent from './IconComponent';

export default function AddSubjectModal({
  newSubject, setNewSubject,
  selectedIcon, setSelectedIcon,
  selectedColor, setSelectedColor,
  handleAddSubject, setShowModal,
  isDarkMode, iconComponents, colorOptions
}) {
  return (
    <>
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 animate-fadeIn"
                onClick={() => setShowModal(false)}
              ></div>
              <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div 
                  className={`bg-white rounded-xl shadow-xl w-full max-w-md animate-scaleIn ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Add New Subject</h2>
                    <button 
                      className="p-1 rounded-full hover:bg-gray-100"
                      onClick={() => setShowModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                    
                  <div className="p-5">
                    <label className="block mb-2 text-sm font-medium">Subject Name</label>
                    <input
                      type="text"
                      className={`outline-none w-full border p-3 rounded-lg mb-4 ring-[1.5px] ring-gray-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'border-gray-300 focus:border-purple-500'
                      } focus:ring focus:ring-purple-200 transition-all`}
                      placeholder="Enter subject name"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      
                    />
                    
                    <label className="block mb-2 text-sm font-medium">Choose Icon</label>
                    <div className="grid grid-cols-6 gap-2 mb-4">
                      {Object.keys(iconComponents).map((iconName) => (
                        <button
                          key={iconName}
                          className={`p-3 rounded-lfull flex items-center justify-center transition-all ${
                            selectedIcon === iconName 
                              ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' 
                              : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                          onClick={() => setSelectedIcon(iconName)}
                        >
                          <IconComponent iconName={iconName} size={20} />
                        </button>
                      ))}
                    </div>
                    
                    <label className="block mb-2 text-sm font-medium">Choose Color</label>
                    <div className="grid grid-cols-6 gap-2 mb-6">
                      {colorOptions.map((color) => {
                        const [bgColor, textColor] = color.split(' ');
                        return (
                          <button
                            key={color}
                            className={`h-10 rounded-lg transition-all ${bgColor} ${textColor} ${
                              selectedColor === color ? 'ring-2 ring-blue-500 scale-110' : ''
                            }`}
                            onClick={() => setSelectedColor(color)}
                          ></button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
                    <button
                      className={`px-4 py-2 rounded-full transition-all ${
                        isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className={`px-4 py-2 bg-purple-500 text-white rounded-full flex items-center gap-2 hover:bg-purple-600 transition-all ${
                        !newSubject.trim() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleAddSubject}
                      disabled={!newSubject.trim()}
                    >
    
                      Add Subject
                    </button>
                  </div>
                </div>
              </div>
            </>
  );
}
