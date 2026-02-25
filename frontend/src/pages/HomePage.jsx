import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/posts').then(response => {
            response.json().then(data => {
                if (data.success) {
                    setPosts(data.data);
                }
            });
        });
    }, []);

    return (
        <>
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post._id} {...post} />
                ))
            ) : (
                <div className="text-center mt-4 text-secondary">No stories found. Write the first one!</div>
            )}
        </>
    );
}
