import React, { useState, useEffect } from 'react';
import { getBlogPosts } from '../utils/blogUtils';

export const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const blogPosts = await getBlogPosts();
      setPosts(blogPosts);
    };
    loadPosts();
  }, []);

  return (
    <div className="blog-layout">
      <h1>Blog Posts</h1>
      <div className="blog-list">
        {posts.map(post => (
          <article key={post.id} className="blog-preview">
            <h2>{post.id.replace(/-/g, ' ')}</h2>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              const postContent = document.getElementById(post.id);
              if (postContent) {
                postContent.scrollIntoView({ behavior: 'smooth' });
              }
            }}>Read more</a>
          </article>
        ))}
      </div>
      <div className="blog-content">
        {posts.map(post => (
          <article key={post.id} id={post.id} className="blog-post">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        ))}
      </div>
    </div>
  );
};