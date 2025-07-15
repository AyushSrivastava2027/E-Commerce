import React, { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { authContext } from '../context/AuthContext';

const AddressModal = ({ isOpen, onClose, onSave }) => {
  const {user}=useContext(authContext);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    pincode: '',
    city: '',
    state: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* 👇 Replacing Dialog.Overlay */}
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md z-50 relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
            <X />
          </button>
          <Dialog.Title className="text-xl font-bold mb-4">Enter Delivery Address</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default AddressModal;
