
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Project } from '../../types';

export const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            setProjects(projects.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject) return;

        try {
            if (editingProject.id) {
                // Update
                const { error } = await supabase
                    .from('projects')
                    .update(editingProject)
                    .eq('id', editingProject.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from('projects')
                    .insert([editingProject]);
                if (error) throw error;
            }

            setIsModalOpen(false);
            setEditingProject(null);
            fetchProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        }
    };

    const openModal = (project: Partial<Project> = { tag: '', title: '', description: '', image_url: '', aspect_ratio: 'square' }) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <button
                    onClick={() => openModal()}
                    className="admin-btn admin-btn-primary"
                >
                    Add Project
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Tag</th>
                            <th>Created At</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td>
                                    <div className="flex items-center">
                                        <img src={project.image_url} alt={project.title} className="h-10 w-10 rounded object-cover mr-4" />
                                        <div className="primary-text">{project.title}</div>
                                    </div>
                                </td>
                                <td>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {project.tag}
                                    </span>
                                </td>
                                <td>{project.created_at ? new Date(project.created_at).toLocaleDateString() : '-'}</td>
                                <td className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => openModal(project)}
                                            className="admin-btn hover:bg-gray-100 text-indigo-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
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

            {isModalOpen && editingProject && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-content">
                        <h2 className="text-xl font-bold mb-4">
                            {editingProject.id ? 'Edit Project' : 'New Project'}
                        </h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="admin-form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    required
                                    value={editingProject.title || ''}
                                    onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Tag</label>
                                <input
                                    type="text"
                                    required
                                    value={editingProject.tag || ''}
                                    onChange={e => setEditingProject({ ...editingProject, tag: e.target.value })}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={editingProject.description || ''}
                                    onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Image URL</label>
                                <input
                                    type="url"
                                    required
                                    value={editingProject.image_url || ''}
                                    onChange={e => setEditingProject({ ...editingProject, image_url: e.target.value })}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Aspect Ratio</label>
                                <select
                                    value={editingProject.aspect_ratio || 'square'}
                                    onChange={e => setEditingProject({ ...editingProject, aspect_ratio: e.target.value as any })}
                                >
                                    <option value="square">Square</option>
                                    <option value="video">Video</option>
                                    <option value="portrait">Portrait</option>
                                    <option value="tall">Tall</option>
                                </select>
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
