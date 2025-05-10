import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  CheckCircle, 
  XCircle, 
  Image as ImageIcon, 
  Tag,
  Plus
} from 'lucide-react';
import { useContent, ContentItem } from '../../contexts/ContentContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';

const ContentEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getContentItem, createContentItem, updateContentItem, publishContentItem } = useContent();
  const { addNotification } = useNotification();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [status, setStatus] = useState<ContentItem['status']>('draft');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Available categories
  const availableCategories = ['Guides', 'Strategies', 'SEO', 'Asset Management', 'Workflows'];
  
  // Initialize form with existing content if editing
  useEffect(() => {
    if (id) {
      const contentItem = getContentItem(id);
      if (contentItem) {
        setTitle(contentItem.title);
        setSlug(contentItem.slug);
        setContent(contentItem.content);
        setExcerpt(contentItem.excerpt);
        setCoverImage(contentItem.coverImage || '');
        setCategory(contentItem.category);
        setTags(contentItem.tags);
        setStatus(contentItem.status);
      } else {
        // Handle case where content with the given ID doesn't exist
        addNotification('error', 'Content not found');
        navigate('/content');
      }
    }
  }, [id, getContentItem, navigate, addNotification]);
  
  // Generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Only auto-generate slug if we're creating new content or the slug hasn't been manually edited
    if (!id || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };
  
  // Generate a URL-friendly slug
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single one
      .trim();
  };
  
  // Add a new tag
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };
  
  // Remove a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Submit form
  const handleSubmit = async (e: React.FormEvent, saveAction: 'save' | 'publish' = 'save') => {
    e.preventDefault();
    
    // Validate form
    if (!title || !content || !category) {
      addNotification('error', 'Please fill in all required fields');
      return;
    }
    
    setIsSaving(true);
    
    try {
      if (id) {
        // Update existing content
        await updateContentItem(id, {
          title,
          slug,
          content,
          excerpt,
          coverImage,
          category,
          tags,
          status: saveAction === 'publish' ? 'published' : status,
          ...(saveAction === 'publish' ? { publishedAt: new Date().toISOString() } : {}),
        });
        
        addNotification('success', saveAction === 'publish' ? 'Content published successfully' : 'Content updated successfully');
      } else {
        // Create new content
        const newContent = await createContentItem({
          title,
          slug,
          content,
          excerpt,
          coverImage,
          status: saveAction === 'publish' ? 'published' : 'draft',
          author: {
            id: user?.id || '1',
            name: user?.name || 'Admin User',
          },
          category,
          tags,
          ...(saveAction === 'publish' ? { publishedAt: new Date().toISOString() } : {}),
        });
        
        addNotification('success', saveAction === 'publish' ? 'Content published successfully' : 'Content created successfully');
        
        if (saveAction !== 'publish') {
          // Navigate to edit page for the new content
          navigate(`/content/edit/${newContent.id}`);
        } else {
          // Navigate back to content list
          navigate('/content');
        }
      }
      
      if (saveAction === 'publish') {
        navigate('/content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      addNotification('error', 'Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/content')}
            className="text-gray-600 hover:text-primary-500 focus:outline-none"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {id ? 'Edit Content' : 'Create New Content'}
            </h1>
            <p className="text-gray-600">
              {id ? 'Update your existing content' : 'Create a new content piece'}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'save')}
            className="btn btn-outline"
            disabled={isSaving}
          >
            {isSaving ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Save size={16} className="mr-2" />
            )}
            Save Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'publish')}
            className="btn btn-primary"
            disabled={isSaving}
          >
            {isSaving ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <CheckCircle size={16} className="mr-2" />
            )}
            Publish
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter content title"
                  className="form-input mt-1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="url-friendly-slug"
                  className="form-input mt-1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of the content"
                  className="form-textarea mt-1"
                  rows={2}
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your content here..."
                  className="form-textarea mt-1"
                  rows={12}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Supports Markdown formatting.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar settings */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="status-draft"
                        name="status"
                        type="radio"
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        checked={status === 'draft'}
                        onChange={() => setStatus('draft')}
                      />
                      <label htmlFor="status-draft" className="ml-2 block text-sm text-gray-700">
                        Draft
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="status-published"
                        name="status"
                        type="radio"
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        checked={status === 'published'}
                        onChange={() => setStatus('published')}
                      />
                      <label htmlFor="status-published" className="ml-2 block text-sm text-gray-700">
                        Published
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select mt-1"
                  required
                >
                  <option value="">Select a category</option>
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    className="form-input flex-grow"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="ml-2 p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1.5 h-4 w-4 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none"
                      >
                        <XCircle size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="form-input mt-1"
                />
              </div>
              
              {coverImage ? (
                <div className="mt-2">
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  <ImageIcon size={24} className="text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    No image set
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;