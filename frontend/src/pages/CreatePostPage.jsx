import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function createNewPost(ev) {
        ev.preventDefault();

        const response = await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                summary,
                content,
                coverImage
            }),
            credentials: 'include'
        });

        const data = await response.json();
        if (response.ok) {
            navigate('/');
        } else {
            setError(data.error || 'Failed to create post');
        }
    }

    return (
        <div className="form-container" style={{ maxWidth: '700px' }}>
            <h1>Create New Story</h1>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={createNewPost}>
                <input type="text"
                    placeholder="Title"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} />
                <input type="text"
                    placeholder="Short Summary"
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)} />
                <input type="text"
                    placeholder="Cover Image URL (Optional)"
                    value={coverImage}
                    onChange={ev => setCoverImage(ev.target.value)} />
                <textarea placeholder="Write your story here..."
                    value={content}
                    onChange={ev => setContent(ev.target.value)}
                    rows="15" />
                <button type="submit" className="btn-primary" style={{ marginTop: '5px' }}>Publish</button>
            </form>
        </div>
    );
}
