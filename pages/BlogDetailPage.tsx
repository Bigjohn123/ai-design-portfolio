
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { config } = useConfig();

  // Try to find the article in the config first (for static content)
  // In a real app, you might want to fetch from API if not found, 
  // but for now we assume it's either in config or we have taken it from cache in HomePage
  // Actually, we should probably fetch it if we want to support dynamic articles not in config.
  // But let's stick to config lookup for now as per original code structure.
  // Ideally, this page should also fetch from API if not found.
  const article = config.blog.articles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold mb-6">文章未找到</h1>
        <Link to="/" className="text-primary font-bold">返回首页</Link>
      </div>
    );
  }

  return (
    <article className="pb-24">
      {/* Progress Bar Header */}
      <div className="blog-header-bar">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 btn-ghost">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-medium text-sm">返回首页</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-xs font-bold uppercase tracking-widest text-muted">正在阅读</span>
            <span className="text-sm font-bold truncate max-w-[200px]">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="pt-32 container" style={{ maxWidth: '840px' }}>
        <div className="flex flex-wrap gap-2 py-4 mb-4 text-muted text-sm">
          <Link to="/" className="hover:text-primary">首页</Link>
          <span>/</span>
          <span className="text-main font-medium">{article.category}</span>
        </div>

        <div className="mb-10 blog-hero-image group">
          <img
            src={article.hero_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="blog-hero-overlay">
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              {article.title}
            </h1>
          </div>
        </div>

        <div className="blog-meta-row">
          <div className="blog-author">
            <img
              src={config.author.avatar}
              className="blog-author-avatar object-cover"
              alt={config.author.name}
            />
            <div className="flex flex-col">
              <p className="text-lg font-bold leading-none mb-1">{config.author.name}</p>
              <p className="text-muted text-sm">{config.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-muted text-sm">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              <span>{article.published_date}</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>阅读约 {article.read_time}</span>
            </div>
          </div>
        </div>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-20 pt-10 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <button className="btn btn-secondary text-primary">
              <span className="material-symbols-outlined">thumb_up</span>
              <span>赞同 124</span>
            </button>
            <button className="btn btn-secondary text-muted">
              <span className="material-symbols-outlined">share</span>
              <span>分享</span>
            </button>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-icon btn-secondary">
              <span className="material-symbols-outlined">chat</span>
            </button>
            <button className="btn btn-icon btn-secondary">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogDetailPage;
