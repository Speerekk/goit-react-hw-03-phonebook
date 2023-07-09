import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Чтение контактов из локального хранилища при загрузке приложения
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Запись контактов в локальное хранилище при изменении состояния contacts
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleAddContact = event => {
    event.preventDefault();

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <ContactForm
        name={name}
        number={number}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleAddContact}
      />

      <h2>Contacts</h2>

      <Filter
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />

      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
