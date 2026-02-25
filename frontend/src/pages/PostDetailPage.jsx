import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function PostDetailPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    if (postInfo.success) {
                        setPostInfo(postInfo.data);
                    }
                });
            });
    }, [id]);

    async function deletePost() {
        if (confirm('Are you sure you want to delete this post?')) {
            const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                navigate('/');
            }
        }
    }

    if (!postInfo) return '';

    const imageUrl = postInfo.coverImage !== 'no-photo.jpg' && postInfo.coverImage
        ? postInfo.coverImage
        : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80';

    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{new Date(postInfo.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <div className="author">by {postInfo.author.username}</div>

            {userInfo?.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit this post
                    </Link>
                    <button className="edit-btn" onClick={deletePost} style={{ marginLeft: '10px', backgroundColor: 'var(--danger)', color: 'white', border: 'none' }}>Delete</button>
                </div>
            )}

            <div className="image">
                <img src={imageUrl} alt={postInfo.title} />
            </div>

            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content.replace(/\n/g, '<br/>') }} />
        </div>
    );
}
