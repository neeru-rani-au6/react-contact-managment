import { createReducer } from '@reduxjs/toolkit';
import { addContact, updateContact, deleteContact } from '../actions/contact';
import { Contact } from '../types';

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addContact, (state, action) => {
      state.contacts.push(action.payload);
    })
    .addCase(updateContact, (state, action) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    })
    .addCase(deleteContact, (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    });
});

export default contactsReducer;
