import { useState } from 'react';
import CreatePost from './CreatePost';

function PostManagement() {
  const [posts, setPosts] = useState([]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Your Posts</h1>
        <p className="text-gray-600 mt-2">Create and manage your photography posts</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Create New Post</h2>
        <CreatePost standalone={true} onPostCreated={(post) => setPosts([post, ...posts])} />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">You haven't created any posts yet</p>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="border-b pb-6">
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-gray-600 mt-1">{post.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostManagement;
