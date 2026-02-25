import { Link } from "react-router-dom";
// Or I can use toLocaleDateString

export default function Post({ _id, title, summary, coverImage, createdAt, author }) {
    // Assuming coverImage might be an absolute URL or local path. Since we didn't add multer/file upload in backend, 
    // Let's assume it's just a placeholder or URL. For Blot we will just use a nice random unsplash image if absent.
    const imageUrl = coverImage !== 'no-photo.jpg' && coverImage ? coverImage : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80';

    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={imageUrl} alt={title} />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <span className="author">{author?.username || 'Unknown'}</span>
                    <time>{new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}
