// import { useState, useEffect } from 'react';

// export default function UserPosts({ userId }) {
//     const [posts, setPosts] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetch(`/api/posts/${userId}`)
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error('Failed to fetch user posts');
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 setPosts(data);
//             })
//             .catch(() => {
//                 setError('Failed to fetch user posts');
//             });
//     }, [userId]);

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <h1>User Posts</h1>
//             <ul>
//                 {posts.map((post) => (
//                     <li key={post.id}>
//                         <p>Title: {post.title}</p>
//                         <p>Content: {post.content}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
