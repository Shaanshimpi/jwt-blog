import { useState, useEffect } from 'react';
import axios from 'axios';

function BlogList({ token, user }) {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/blog/');
            setBlogs(response.data);
        } catch (err) {
            console.error('Failed to fetch blogs', err);
        }
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        if (!token) {
            setError('You must be logged in to create a blog');
            return;
        }

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
            setTitle('');
            setContent('');
            setError('');
            fetchBlogs(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create blog');
        }
    };

    return (
        <div>
            {token && (
                <div className="card">
                    <h3>Create New Blog</h3>
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleCreateBlog}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Content:</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Create Blog</button>
                    </form>
                </div>
            )}

            <h2>Recent Blogs</h2>
            {blogs.map((blog) => (
                <div key={blog._id} className="card">
                    <h3>{blog.title}</h3>
                    <p>{blog.content || blog.description}</p>
                    <small>Author ID: {blog.authorId}</small>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
