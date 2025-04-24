import React, { useState } from 'react';

const CustomerDetails = ({ customers }) => {
  const [displayType, setDisplayType] = useState('basic');

  const handleDisplayChange = (type) => setDisplayType(type);

  const renderCustomer = (customer) => {
    if (displayType === 'basic') {
      return (
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="font-semibold">ID:</span> {customer.id}</div>
          <div><span className="font-semibold">Name:</span> {customer.customer_name}</div>
          <div><span className="font-semibold">Mobile:</span> {customer.customer_number}</div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div><span className="font-semibold">ID:</span> {customer.id}</div>
        <div><span className="font-semibold">Created At:</span> {new Date(customer.created_at).toLocaleString()}</div>
        <div><span className="font-semibold">Name:</span> {customer.customer_name}</div>
        <div><span className="font-semibold">Email:</span> {customer.customer_email}</div>
        <div><span className="font-semibold">Mobile:</span> {customer.customer_number}</div>
        <div><span className="font-semibold">DOB:</span> {customer.customer_dob}</div>
        <div><span className="font-semibold">Gender:</span> {customer.customer_gender}</div>
        <div><span className="font-semibold">Aadhaar:</span> {customer.customer_aadhar}</div>
        <div><span className="font-semibold">PAN:</span> {customer.customer_pan}</div>
        <div><span className="font-semibold">Plan:</span> {customer.plan_name}</div>
        <div><span className="font-semibold">Members:</span> {customer.additional_member}</div>
        <div><span className="font-semibold">Duration:</span> {customer.plan_duration} months</div>
        <div><span className="font-semibold">Price:</span> ₹{customer.plan_price}</div>
        <div><span className="font-semibold">Payment Status:</span> {customer.payment_status}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6 bg-green-300 p-6 rounded-lg shadow-lg">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => handleDisplayChange('basic')}
          className={`px-4 py-2 rounded font-medium ${displayType === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Basic Details
        </button>
        <button
          onClick={() => handleDisplayChange('full')}
          className={`px-4 py-2 rounded font-medium ${displayType === 'full' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Full Details
        </button>
      </div>

      <div className="grid gap-6">
        {customers.length === 0 ? (
          <p className="text-center text-gray-500">No customers available.</p>
        ) : (
          customers.map((customer) => (
            <div
              key={customer.id}
              className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              {renderCustomer(customer)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
