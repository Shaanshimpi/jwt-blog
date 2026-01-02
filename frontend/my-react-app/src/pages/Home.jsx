import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/blog/');
                setBlogs(response.data);
            } catch (err) {
                console.error('Failed to fetch blogs', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <div className="loading">Loading stories...</div>;

    return (
        <div className="container">
            <section className="hero">
                <h1>Stories & Ideas</h1>
                <p>A place to read, write, and deepen your understanding.</p>
            </section>

            <div className="blog-grid">
                {blogs.map((blog) => (
                    <Link to={`/blog/${blog._id}`} key={blog._id} className="blog-card-link">
                        <article className="blog-card">
                            <div className="blog-content">
                                <h2>{blog.title}</h2>
                                <p className="blog-excerpt">{blog.content?.substring(0, 150)}...</p>
                                <div className="blog-meta">
                                    <div className="author-avatar"></div>
                                    <span className="author-id">Author ID: {blog.authorId?.substring(0, 8)}...</span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
