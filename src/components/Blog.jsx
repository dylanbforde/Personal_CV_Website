import React, { useState, useEffect } from 'react';
import { getBlogPosts } from '../utils/blogUtils';

export const BlogListFile = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const blogPosts = await getBlogPosts();
      setPosts(blogPosts);
    };
    loadPosts();
  }, []);

  return (
    <div className="blog-section">
      <h3>📝 Blog Posts</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('openBlogPost', { detail: post.id }));
            }}>
              {post.id.replace(/_/g, ' ')}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const BlogPost = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      const posts = await getBlogPosts();
      const foundPost = posts.find(p => p.id === postId);
      setPost(foundPost);
    };
    loadPost();
  }, [postId]);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="blog-post-container">
      <div className="blog-post" 
           dangerouslySetInnerHTML={{ __html: post.content }}>
      </div>
    </div>
  );
};