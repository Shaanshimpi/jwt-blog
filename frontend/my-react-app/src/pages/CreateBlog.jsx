import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token, user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:3000/api/blog/create',
                {
                    title,
                    content,
                    authorId: user.id
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create blog');
        }
    };

    return (
        <div className="container">
            <div className="create-blog-container">
                <h1>Write a New Story</h1>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="create-blog-form">
                    <div className="form-group">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="title-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Tell your story..."
                            className="content-input"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/')} className="btn-text">Cancel</button>
                        <button type="submit" className="btn-primary">Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateBlog;
