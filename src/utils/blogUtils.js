
import { marked } from 'marked';

export async function getBlogPosts() {
  const posts = import.meta.glob('../blog-posts/*.md', { as: 'raw', eager: true });
  return Object.entries(posts).map(([path, content]) => {
    const fileName = path.split('/').pop().replace('.md', '');
    const html = marked.parse(content);
    return {
      id: fileName,
      content: html
    };
  });
}
