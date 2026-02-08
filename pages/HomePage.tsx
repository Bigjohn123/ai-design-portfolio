
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';
import ProjectCard from '../components/ProjectCard';
import { getProjects, getArticles } from '../services/api';
import { Project, Article } from '../types';
import { isFallbackMode } from '../lib/supabase';

interface HomePageProps {
  onContactClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onContactClick }) => {
  const { config } = useConfig();
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedProjects, fetchedArticles] = await Promise.all([
          getProjects(),
          getArticles()
        ]);

        // If no data in DB (e.g. connection error or empty), fall back to config or empty
        if (fetchedProjects.length > 0) setProjects(fetchedProjects);
        else setProjects(config.lab.projects);

        if (fetchedArticles.length > 0) setArticles(fetchedArticles);
        else setArticles(config.blog.articles);

      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Fallback
        setProjects(config.lab.projects);
        setArticles(config.blog.articles);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config]);

  return (
    <div className="space-y-0">
      {isFallbackMode && (
        <div className="bg-amber-100 text-amber-800 px-4 py-3 text-center text-sm font-medium border-b border-amber-200">
          ⚠️ 当前未连接到 Supabase 数据库，正在显示演示数据。请在 .env.local 中配置真实的 Supabase URL 和 Key。
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="lg:order-1 space-y-8">
            <div className="space-y-4">
              <span className="hero-badge">
                {config.hero.badge}
              </span>
              <h1 className="hero-title">
                探索 <span className="text-primary font-display italic">AI</span> 与<br />设计的边界
              </h1>
              <p className="hero-subtitle">
                {config.hero.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">
                {config.hero.primaryCta}
              </button>
              <button className="btn btn-secondary">
                {config.hero.secondaryCta}
              </button>
            </div>
          </div>
          <div className="lg:order-2">
            <div className="relative group">
              <div className="hero-avatar">
                <img
                  alt="Avatar"
                  className="w-full h-full object-cover scale-105"
                  src={config.hero.avatarUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Section */}
      <section className="py-24 bg-surface-glass border-top">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight">{config.lab.title}</h2>
              <p className="text-muted">{config.lab.description}</p>
            </div>
            <button className="btn btn-icon btn-secondary">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted">Loading projects...</div>
          ) : (
            <div className="masonry-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 container">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold tracking-tight">{config.blog.title}</h2>
          <Link to="/" className="text-primary font-bold flex items-center gap-2 group">
            {config.blog.viewAllLabel}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>

        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-20 text-muted">Loading articles...</div>
          ) : (
            articles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="blog-item"
              >
                <div className="space-y-2">
                  <p className="text-sm text-dim font-medium">{article.published_date} • {article.category}</p>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{article.title}</h3>
                </div>
                <div className="flex items-center gap-8">
                  <p className="hidden lg:block text-muted max-w-xs text-sm truncate">{article.summary}</p>
                  <button className="flex items-center gap-2 text-primary font-bold text-sm whitespace-nowrap">
                    阅读更多
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 container">
        <div className="footer-cta-container">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="footer-cta-title font-bold tracking-tight leading-tight">
              {config.footerCta.title}
            </h2>
            <p className="text-xl opacity-80 leading-relaxed font-light">
              {config.footerCta.description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

