import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ReadingForm from '@/Components/ReadingForm';

function ReadingList() {
    const { readingList = [], sortField, sortOrder } = usePage().props;
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        Inertia.delete(`/readinglist/${id}`);
    };

    const handleFormSubmit = (newItem) => {
        if (selectedItem) {
            Inertia.put(`/readinglist/${selectedItem.id}`, newItem);
        } else {
            Inertia.post('/readinglist', newItem);
        }
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    const handleSortChange = (field) => {
        const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        Inertia.get('/readinglist', { sortField: field, sortOrder: newSortOrder });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reading List</h2>}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <button 
                                onClick={() => {
                                    setSelectedItem(null); 
                                    setIsModalOpen(true);
                                }} 
                                className="bg-green-500 text-white font-semibold py-2 px-4 rounded mb-4"
                            >
                                Add New Item
                            </button>
                            {isModalOpen && (
                                <ReadingForm 
                                    onSubmit={handleFormSubmit} 
                                    item={selectedItem} 
                                    onClose={() => setIsModalOpen(false)}
                                />
                            )}
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b p-3 cursor-pointer" onClick={() => handleSortChange('story_title')}>
                                            Story Title {sortField === 'story_title' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                                        </th>
                                        <th className="border-b p-3 cursor-pointer" onClick={() => handleSortChange('author')}>
                                            Author {sortField === 'author' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                                        </th>
                                        <th className="border-b p-3">Description</th>
                                        <th className="border-b p-3 cursor-pointer" onClick={() => handleSortChange('status')}>
                                            Status {sortField === 'status' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                                        </th>
                                        <th className="border-b p-3 cursor-pointer" onClick={() => handleSortChange('feedback')}>
                                            Feedback {sortField === 'feedback' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                                        </th>
                                        <th className="border-b p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {readingList.length > 0 ? (
                                        readingList.map((item) => (
                                            <tr key={item.id}>
                                                <td className="p-3">{item.story_title}</td>
                                                <td className="p-3">{item.author}</td>
                                                <td className="p-3">{item.story_description}</td>
                                                <td className="p-3">{item.status}</td>
                                                <td className="p-3">{item.feedback}</td>
                                                <td className="p-3">
                                                    <button 
                                                        onClick={() => handleEdit(item)} 
                                                        className="bg-blue-500 text-white font-semibold py-1 px-3 rounded mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(item.id)} 
                                                        className="bg-red-500 text-white font-semibold py-1 px-3 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="p-3 text-center">No records found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default ReadingList;