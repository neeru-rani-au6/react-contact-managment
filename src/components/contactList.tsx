import React, { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../redux/actions/contact';
import { useNavigate } from 'react-router-dom';

// Define the type for the contact in the Redux state
interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    status: string;
}

const ContactList: React.FC = () => {
    // Hook for dispatching actions
    const dispatch = useDispatch();
    // Hook for navigating programmatically
    const navigate = useNavigate();
    // Select contacts from the Redux state
    const contacts = useSelector((state: any) => state.contacts.contacts); // Adjust based on your state shape

    // Generate a unique ID for the "Create Contact" button
    const contactId = useId();

    // Handle the deletion of a contact
    const handleDelete = (contactId: any) => {
        dispatch(deleteContact(contactId));
    };

    // Render the "Create Contact" button
    const createContactButton = () => {
        return (
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition"
                onClick={() => navigate(`/create/${contactId}`)} // Navigate to the create contact page
            >
                Create Contact
            </button>
        );
    };

    return (
        <div className="flex flex-col h-screen p-4 items-center">
            {/* Check if there are no contacts */}
            {contacts.length === 0 ? (
                <div className="bg-gray-200 border border-gray-300 rounded-lg p-6 text-center text-gray-700 min-w-[300px]">
                    <h2 className="text-2xl font-semibold mb-4">No Contacts Found</h2>
                    <p className="text-lg">
                        It looks like you don't have any contacts yet. Click the "Create Contact" button to add a new contact.
                    </p>
                    <br />
                    {createContactButton()} {/* Render the create contact button */}
                </div>
            ) : (
                <>
                    {/* Render the create contact button */}
                    {createContactButton()}
                    {/* Display the list of contacts */}
                    <div className="flex flex-wrap gap-8 p-4">
                        {contacts.map((contact: Contact) => (
                            <div
                                key={contact.id} // Unique key for each contact item
                                className="border rounded-lg p-6 bg-gray-100 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 w-80"
                            >
                                <div className="bg-gray-200 h-32 flex items-center justify-center mb-4 rounded-lg">
                                    <span className="text-lg font-semibold">
                                        {contact.firstName} {contact.lastName}
                                    </span>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 justify-between">
                                    {/* Edit button */}
                                    <button
                                        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
                                        onClick={() => navigate(`/create/${contact.id}`)} // Navigate to edit contact page
                                    >
                                        Edit
                                    </button>
                                    {/* Delete button */}
                                    <button
                                        className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
                                        onClick={() => handleDelete(contact.id)} // Handle contact deletion
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ContactList;
