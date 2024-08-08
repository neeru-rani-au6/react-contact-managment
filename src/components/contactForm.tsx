import React, { useState, useEffect } from 'react';
import { addContact, updateContact } from '../redux/actions/contact';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ContactForm: React.FC = () => {
    // Get the contactId from the URL parameters
    const { contactId } = useParams();
    // Hook for navigating programmatically
    const navigate = useNavigate();
    // Local state for form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('Inactive');
    // Hook for dispatching actions to Redux
    const dispatch = useDispatch();
    // Select contacts from the Redux state
    const contacts = useSelector((state: any) => state.contacts.contacts);
    // Find the contact to edit based on contactId
    const contact = contacts.find((item: any) => item.id === contactId);

    // Populate form fields if editing an existing contact
    useEffect(() => {
        if (contact) {
            setFirstName(contact.firstName);
            setLastName(contact.lastName);
            setStatus(contact.status);
        }
    }, [contact]);

    // Handle form submission for adding or updating a contact
    const handleSaveContact = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        const newContact = {
            id: contactId, // Use the existing ID for updating, or a new ID for adding
            firstName,
            lastName,
            status,
        };
        if (contact) {
            // If editing an existing contact, dispatch the update action
            dispatch(updateContact(newContact));
        } else {
            // If adding a new contact, dispatch the add action
            dispatch(addContact(newContact));
        }
        // Reset form fields
        setFirstName('');
        setLastName('');
        setStatus('Inactive');
        // Navigate back to the main page
        navigate('/');
    };

    return (
        <div className="p-4 md:p-6 max-w-lg mx-auto mt-8 rounded-lg shadow-lg bg-white border border-gray-300">
            {/* Form header */}
            <h1 className="text-xl md:text-2xl font-semibold mb-4">
                {contact ? 'Edit Contact' : 'Add Contact'}
            </h1>
            {/* Form for adding or editing contact */}
            <form onSubmit={handleSaveContact} className="space-y-4">
                <div>
                    {/* First Name field */}
                    <label
                        className="block mb-2 text-sm font-medium text-gray-700"
                        htmlFor="firstName"
                    >
                        First Name:
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    {/* Last Name field */}
                    <label
                        className="block mb-2 text-sm font-medium text-gray-700"
                        htmlFor="lastName"
                    >
                        Last Name:
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    {/* Status field */}
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Status:
                    </label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Active"
                                checked={status === 'Active'}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mr-2"
                            />
                            Active
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Inactive"
                                checked={status === 'Inactive'}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mr-2"
                            />
                            Inactive
                        </label>
                    </div>
                </div>
                <div className="flex justify-between">
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        {contact ? 'Edit Contact' : 'Save Contact'}
                    </button>
                    {/* Cancel button */}
                    <button
                        type="button"
                        onClick={() => navigate('/')} // Navigate back to the main page
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
