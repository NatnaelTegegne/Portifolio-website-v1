import { Link } from 'react-router-dom';
import '../styles/Blog.css';

const NotFound = () => (
    <main className="blog-page">
        <div className="post-container post-missing">
            <div className="section-num-header">
                <span className="section-sym">§</span>
                <span className="section-num">404</span>
                <span className="section-label">Not Found</span>
            </div>
            <h1 className="section-title">This page doesn't exist</h1>
            <p className="section-subtitle">
                The link may be broken, or the page may have moved.
            </p>
            <div className="notfound-actions">
                <Link to="/" className="btn-primary">Back home</Link>
                <Link to="/blog" className="btn-secondary">Read the blog</Link>
            </div>
        </div>
    </main>
);

export default NotFound;
