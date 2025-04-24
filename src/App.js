import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import CustomerDetails from './Components/CustomerDetails';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Initializing');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setConnectionStatus('Connecting to Supabase...');
        
        // First test the connection
        const { error: pingError } = await supabase.from('customers').select('count', { count: 'exact', head: true });
        
        if (pingError) {
          console.error('Connection Error:', pingError);
          setConnectionStatus('Connection failed');
          setError(`Connection error: ${pingError.message}`);
          return;
        }
        
        setConnectionStatus('Connected! Fetching data...');
        
        // Now fetch the actual data
        const { data, error } = await supabase.from('customers').select('*');
        
        if (error) {
          console.error('Data Fetch Error:', error);
          setError(`Data fetch error: ${error.message}`);
        } else {
          console.log('Fetched customers:', data);
          setCustomers(data || []);
          setConnectionStatus('Data loaded successfully');
        }
      } catch (err) {
        console.error('Unexpected Error:', err);
        setError(`Unexpected error: ${err.message}`);
        setConnectionStatus('Error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-4">Customers Details</h1>
        <div className="text-center mb-4 text-sm text-gray-500">
          Status: {connectionStatus}
        </div>
        
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Loading Customers...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
            <p className="mt-2">Please check your Supabase configuration and database setup.</p>
            <div className="mt-4 p-2 bg-gray-100 rounded text-left text-sm">
              <strong>Troubleshooting:</strong>
              <ul className="list-disc pl-5 mt-2">
                <li>Check that your .env file contains REACT_APP_SUPABASE_KEY</li>
                <li>Verify that the 'customers' table exists in your Supabase database</li>
                <li>Make sure the Supabase anon key has the correct permissions</li>
              </ul>
            </div>
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center text-yellow-600">
            <p>No customers found in the database.</p>
            <p className="mt-2">Try adding some data to your 'customers' table.</p>
          </div>
        ) : (
          <CustomerDetails customers={customers} />
        )}
      </div>
    </div>
  );
}

export default App;
