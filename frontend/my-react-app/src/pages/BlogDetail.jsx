import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/blog/${id}`);
                setBlog(response.data);
            } catch (err) {
                setError('Failed to load blog post.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div className="loading">Loading story...</div>;
    if (error) return <div className="error-message container" style={{ marginTop: '2rem' }}>{error}</div>;
    if (!blog) return <div className="container" style={{ marginTop: '2rem' }}>Blog not found.</div>;

    return (
        <div className="container">
            <article className="blog-detail">
                <header className="blog-header">
                    <h1 className="blog-title">{blog.title}</h1>
                    <div className="blog-meta-detail">
                        <div className="author-avatar-large"></div>
                        <div className="meta-text">
                            <span className="publish-date">Published on {new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </header>

                <div className="blog-body">
                    {blog.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                <div className="blog-footer">
                    <Link to="/" className="btn-text">← Back to Home</Link>
                </div>
            </article>
        </div>
    );
}

export default BlogDetail;
