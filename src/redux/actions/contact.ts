import { createAction } from '@reduxjs/toolkit';
import { Contact } from '../types';

export enum ContactActionTypes {
    GET_CONTACTS = 'GET_CONTACTS',
    GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS',
    GET_CONTACTS_FAILED = 'GET_CONTACTS_FAILED',
}

export const addContact = createAction<Contact>('contacts/addContact');
export const updateContact = createAction<Contact>('contacts/updateContact');
export const deleteContact = createAction<string>('contacts/deleteContact');