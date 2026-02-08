
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BlogPost } from '../../types';

// Helper to generate ID from title if needed, but we'll specific ID in form
const generateId = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const ArticlesPage = () => {
    const [articles, setArticles] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingArticle, setEditingArticle] = useState<Partial<BlogPost> | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setArticles(data || []);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        try {
            const { error } = await supabase.from('articles').delete().eq('id', id);
            if (error) throw error;
            setArticles(articles.filter(a => a.id !== id));
        } catch (error) {
            console.error('Error deleting article:', error);
            alert('Failed to delete article');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingArticle) return;

        try {
            const articleToSave = { ...editingArticle };

            // Ensure ID exists for new articles
            if (!articleToSave.id && articleToSave.title) {
                articleToSave.id = generateId(articleToSave.title);
            }

            if (!articleToSave.id) {
                alert("ID is required");
                return;
            }

            // Check if updating or creating
            const isExisting = articles.some(a => a.id === articleToSave.id);

            // Note: for articles, ID is the primary key and it is text (slug).
            // If we are editing an existing article, we upsert.
            // However, if we change the ID, it treats as new.
            // For simplicity here, we assume ID is not editable once created, or we use upsert.

            const { error } = await supabase
                .from('articles')
                .upsert(articleToSave); // upsert works based on PK

            if (error) throw error;

            setIsModalOpen(false);
            setEditingArticle(null);
            fetchArticles();
        } catch (error) {
            console.error('Error saving article:', error);
            alert('Failed to save article');
        }
    };

    const openModal = (article: Partial<BlogPost> = {}) => {
        setEditingArticle(article);
        setIsModalOpen(true);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Articles</h1>
                <button
                    onClick={() => openModal({})}
                    className="admin-btn admin-btn-primary"
                >
                    Add Article
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Article</th>
                            <th>Category</th>
                            <th>Published</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article.id}>
                                <td>
                                    <div className="flex items-center">
                                        <img src={article.heroImage || article.hero_image} alt={article.title} className="h-10 w-10 rounded object-cover mr-4" />
                                        <div className="primary-text">{article.title}</div>
                                    </div>
                                </td>
                                <td>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {article.category}
                                    </span>
                                </td>
                                <td>{article.published_date}</td>
                                <td className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => openModal(article)}
                                            className="admin-btn hover:bg-gray-100 text-indigo-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            className="admin-btn hover:bg-red-50 text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && editingArticle && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-content large">
                        <h2 className="text-xl font-bold mb-4">
                            {editingArticle.id ? 'Edit Article' : 'New Article'}
                        </h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="admin-form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingArticle.title || ''}
                                        onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Slug (ID)</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingArticle.id || ''}
                                        onChange={e => setEditingArticle({ ...editingArticle, id: e.target.value })}
                                        placeholder="my-article-slug"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingArticle.category || ''}
                                        onChange={e => setEditingArticle({ ...editingArticle, category: e.target.value })}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Published Date</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingArticle.published_date || ''}
                                        onChange={e => setEditingArticle({ ...editingArticle, published_date: e.target.value })}
                                        placeholder="YYYY年MM月DD日"
                                    />
                                </div>
                                <div className="col-span-2 admin-form-group">
                                    <label>Hero Image URL</label>
                                    <input
                                        type="url"
                                        required
                                        value={editingArticle.hero_image || editingArticle.heroImage || ''}
                                        onChange={e => setEditingArticle({ ...editingArticle, hero_image: e.target.value })}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Read Time</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingArticle.read_time || ''}
                                        onChange={e => setEditingArticle({ ...editingArticle, read_time: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>Summary</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={editingArticle.summary || ''}
                                    onChange={e => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                                />
                            </div>

                            <div className="admin-form-group">
                                <label>Content (HTML)</label>
                                <textarea
                                    required
                                    rows={10}
                                    className="font-mono"
                                    value={editingArticle.content || ''}
                                    onChange={e => setEditingArticle({ ...editingArticle, content: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="admin-btn hover:bg-gray-100 text-gray-700 border border-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="admin-btn admin-btn-primary"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
