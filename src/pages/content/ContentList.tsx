import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Filter, 
  Search, 
  ChevronDown, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useContent, ContentItem } from '../../contexts/ContentContext';
import { useNotification } from '../../contexts/NotificationContext';

const ContentList: React.FC = () => {
  const { contentItems, loading, deleteContentItem, publishContentItem, archiveContentItem } = useContent();
  const { addNotification } = useNotification();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [itemWithMenuOpen, setItemWithMenuOpen] = useState<string | null>(null);
  
  // Get unique categories
  const categories = ['all', ...new Set(contentItems.map(item => item.category))];
  
  // Filter and sort content items
  const filteredItems = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortBy === 'updatedAt') {
      return sortOrder === 'asc'
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortBy === 'views') {
      return sortOrder === 'asc' ? a.views - b.views : b.views - a.views;
    }
    return 0;
  });
  
  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  // Toggle dropdown menu for a content item
  const toggleItemMenu = (id: string) => {
    setItemWithMenuOpen(itemWithMenuOpen === id ? null : id);
  };
  
  // Handle content deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteContentItem(id);
        addNotification('success', 'Content deleted successfully');
      } catch (error) {
        console.error('Error deleting content:', error);
        addNotification('error', 'Failed to delete content');
      }
    }
  };
  
  // Handle content publishing
  const handlePublish = async (id: string) => {
    try {
      await publishContentItem(id);
      addNotification('success', 'Content published successfully');
    } catch (error) {
      console.error('Error publishing content:', error);
      addNotification('error', 'Failed to publish content');
    }
  };
  
  // Handle content archiving
  const handleArchive = async (id: string) => {
    try {
      await archiveContentItem(id);
      addNotification('success', 'Content archived successfully');
    } catch (error) {
      console.error('Error archiving content:', error);
      addNotification('error', 'Failed to archive content');
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setItemWithMenuOpen(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Status indicator component
  const StatusIndicator: React.FC<{ status: ContentItem['status'] }> = ({ status }) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Published
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={12} className="mr-1" />
            Draft
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XCircle size={12} className="mr-1" />
            Archived
          </span>
        );
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content</h1>
          <p className="text-gray-600">Manage your content</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/content/create" className="btn btn-primary">
            <PlusCircle size={16} className="mr-1" />
            Create New
          </Link>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative col-span-1 md:col-span-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search content..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="col-span-1">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select appearance-none pl-10"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-select appearance-none pl-10"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Content table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => toggleSort('title')}
                  >
                    Title
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transform transition-transform ${
                        sortBy === 'title' && sortOrder === 'asc' ? 'rotate-180' : ''
                      } ${sortBy === 'title' ? 'text-gray-700' : 'text-gray-300 group-hover:text-gray-400'}`}
                    />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => toggleSort('updatedAt')}
                  >
                    Last Updated
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transform transition-transform ${
                        sortBy === 'updatedAt' && sortOrder === 'asc' ? 'rotate-180' : ''
                      } ${sortBy === 'updatedAt' ? 'text-gray-700' : 'text-gray-300 group-hover:text-gray-400'}`}
                    />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => toggleSort('views')}
                  >
                    Views
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transform transition-transform ${
                        sortBy === 'views' && sortOrder === 'asc' ? 'rotate-180' : ''
                      } ${sortBy === 'views' ? 'text-gray-700' : 'text-gray-300 group-hover:text-gray-400'}`}
                    />
                  </button>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.coverImage ? (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img className="h-10 w-10 rounded object-cover" src={item.coverImage} alt="" />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded mr-3 flex items-center justify-center">
                            <FileText size={18} className="text-gray-500" />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{item.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusIndicator status={item.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye size={16} className="text-gray-400 mr-1" />
                        {item.views}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative inline-block text-left" onClick={e => e.stopPropagation()}>
                        <button
                          className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={() => toggleItemMenu(item.id)}
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        
                        {itemWithMenuOpen === item.id && (
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                              {item.status !== 'published' && (
                                <button
                                  onClick={() => handlePublish(item.id)}
                                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <CheckCircle size={16} className="mr-2 text-green-500" />
                                  Publish
                                </button>
                              )}
                              
                              <Link
                                to={`/content/edit/${item.id}`}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Edit size={16} className="mr-2 text-blue-500" />
                                Edit
                              </Link>
                              
                              {item.status !== 'archived' && (
                                <button
                                  onClick={() => handleArchive(item.id)}
                                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <XCircle size={16} className="mr-2 text-gray-500" />
                                  Archive
                                </button>
                              )}
                              
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                <Trash2 size={16} className="mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No content found</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by creating a new content item.</p>
                      <div className="mt-6">
                        <Link to="/content/create" className="btn btn-primary">
                          <PlusCircle size={16} className="mr-1" />
                          Create New
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentList;