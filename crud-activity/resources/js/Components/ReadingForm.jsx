import React, { useState, useEffect } from 'react';

function ReadingForm({ onSubmit, item, onClose }) {
    const [storyTitle, setStoryTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Not Started');
    const [feedback, setFeedback] = useState('Not Recommendable');

    useEffect(() => {
        if (item) {
            setStoryTitle(item.story_title || '');
            setAuthor(item.author || '');
            setDescription(item.story_description || '');
            setStatus(item.status || 'Not Started');
            setFeedback(item.feedback || 'Not Recommendable');
        } else {
            resetForm();
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            story_title: storyTitle,
            author,
            story_description: description,
            status,
            feedback,
        });
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setStoryTitle('');
        setAuthor('');
        setDescription('');
        setStatus('Not Started');
        setFeedback('Not Recommendable');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                <h2 className="text-2xl font-semibold mb-4">Reading List Item</h2>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    ✖
                </button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">Story Title</label>
                        <input
                            type="text"
                            value={storyTitle}
                            onChange={(e) => setStoryTitle(e.target.value)}
                            required
                            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Not Started">Not Started</option>
                            <option value="On-going">On-going</option>
                            <option value="Done Reading">Done Reading</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Feedback</label>
                        <select
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Not Recommendable">Not Recommendable</option>
                            <option value="Recommendable">Recommendable</option>
                            <option value="Highly Recommended">Highly Recommended</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReadingForm;
