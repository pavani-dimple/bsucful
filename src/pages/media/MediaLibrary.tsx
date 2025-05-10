import React, { useState } from 'react';
import { 
  UploadCloud, 
  Grid, 
  List, 
  Search, 
  Filter,
  Image as ImageIcon,
  File as FileIcon,
  Video as VideoIcon,
  Trash2,
  Download,
  MoreVertical,
  Edit2
} from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

// Sample media data
interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: string;
  dimensions?: string;
  uploadedAt: string;
  uploadedBy: string;
}

const sampleMedia: MediaItem[] = [
  {
    id: '1',
    name: 'hero-image.jpg',
    type: 'image',
    url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    size: '1.2 MB',
    dimensions: '1920 x 1080',
    uploadedAt: '2025-05-12T14:30:00Z',
    uploadedBy: 'Admin User',
  },
  {
    id: '2',
    name: 'product-screenshot.png',
    type: 'image',
    url: 'https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    size: '856 KB',
    dimensions: '1600 x 900',
    uploadedAt: '2025-05-10T09:15:00Z',
    uploadedBy: 'Admin User',
  },
  {
    id: '3',
    name: 'annual-report.pdf',
    type: 'document',
    url: '#',
    size: '3.4 MB',
    uploadedAt: '2025-05-08T16:45:00Z',
    uploadedBy: 'Admin User',
  },
  {
    id: '4',
    name: 'team-photo.jpg',
    type: 'image',
    url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    size: '1.8 MB',
    dimensions: '2048 x 1365',
    uploadedAt: '2025-05-06T11:20:00Z',
    uploadedBy: 'Admin User',
  },
  {
    id: '5',
    name: 'product-demo.mp4',
    type: 'video',
    url: '#',
    size: '18.2 MB',
    uploadedAt: '2025-05-05T13:10:00Z',
    uploadedBy: 'Admin User',
  },
  {
    id: '6',
    name: 'logo-dark.png',
    type: 'image',
    url: 'https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    size: '256 KB',
    dimensions: '512 x 512',
    uploadedAt: '2025-05-03T10:30:00Z',
    uploadedBy: 'Admin User',
  },
  {
    id: '7',
    name: 'user-guide.pdf',
    type: 'document',
    url: '#',
    size: '2.6 MB',
    uploadedAt: '2025-05-01T09:15:00Z',
    uploadedBy: 'Admin User',
  },
  {
    id: '8',
    name: 'banner-image.jpg',
    type: 'image',
    url: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    size: '1.5 MB',
    dimensions: '1800 x 600',
    uploadedAt: '2025-04-28T14:20:00Z',
    uploadedBy: 'Admin User',
  },
];

const MediaLibrary: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(sampleMedia);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const { addNotification } = useNotification();
  
  // Filter media items
  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  // Toggle item selection
  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  // Select or deselect all items
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };
  
  // Delete selected items
  const deleteSelectedItems = () => {
    if (selectedItems.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected item(s)?`)) {
      setMediaItems(mediaItems.filter(item => !selectedItems.includes(item.id)));
      addNotification('success', `${selectedItems.length} item(s) deleted successfully`);
      setSelectedItems([]);
    }
  };
  
  // Delete a single item
  const deleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMediaItems(mediaItems.filter(item => item.id !== id));
      addNotification('success', 'Item deleted successfully');
      setActiveDropdown(null);
    }
  };
  
  // Handle media upload
  const handleUpload = () => {
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      addNotification('success', 'Files uploaded successfully');
    }, 2000);
  };
  
  // Toggle dropdown menu
  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  
  // Get icon based on media type
  const getMediaIcon = (type: MediaItem['type']) => {
    switch (type) {
      case 'image':
        return <ImageIcon size={24} className="text-primary-500" />;
      case 'video':
        return <VideoIcon size={24} className="text-accent-500" />;
      case 'document':
        return <FileIcon size={24} className="text-secondary-500" />;
      default:
        return <FileIcon size={24} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600">Manage all your media assets</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleUpload}
            className="btn btn-primary"
            disabled={isUploading}
          >
            {isUploading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <UploadCloud size={16} className="mr-2" />
            )}
            Upload Files
          </button>
        </div>
      </div>
      
      {/* Filters and view controls */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search files..."
            className="pl-10 form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative w-40">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="pl-10 form-select appearance-none"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
          </div>
          
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${
                viewMode === 'grid'
                  ? 'bg-primary-50 text-primary-700 border-primary-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${
                viewMode === 'list'
                  ? 'bg-primary-50 text-primary-700 border-primary-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Selection controls */}
      {filteredItems.length > 0 && (
        <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-md shadow-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
              onChange={toggleSelectAll}
            />
            <span className="ml-2 text-sm text-gray-700">
              {selectedItems.length === 0
                ? 'Select all'
                : `${selectedItems.length} selected`}
            </span>
          </div>
          
          {selectedItems.length > 0 && (
            <button
              onClick={deleteSelectedItems}
              className="flex items-center text-sm text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} className="mr-1" />
              Delete Selected
            </button>
          )}
        </div>
      )}
      
      {/* Grid view */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div
                key={item.id}
                className={`relative group card overflow-hidden ${
                  selectedItems.includes(item.id) ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {/* Checkbox overlay */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                  />
                </div>
                
                {/* Actions dropdown */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(item.id);
                      }}
                      className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    {activeDropdown === item.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                        <div className="py-1">
                          <button
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit2 size={16} className="mr-2 text-gray-500" />
                            Rename
                          </button>
                          <button
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Download size={16} className="mr-2 text-gray-500" />
                            Download
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Media preview */}
                <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      {getMediaIcon(item.type)}
                      <span className="mt-2 text-xs text-gray-500">{item.type.toUpperCase()}</span>
                    </div>
                  )}
                </div>
                
                {/* File info */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                    {item.name}
                  </h3>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>{item.size}</span>
                    {item.dimensions && <span>{item.dimensions}</span>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <ImageIcon size={48} className="text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No media found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || typeFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Upload some files to get started.'}
              </p>
              {(!searchTerm && typeFilter === 'all') && (
                <button
                  onClick={handleUpload}
                  className="mt-6 btn btn-primary"
                >
                  <UploadCloud size={16} className="mr-2" />
                  Upload Files
                </button>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* List view */}
      {viewMode === 'list' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dimensions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <tr key={item.id} className={`hover:bg-gray-50 ${selectedItems.includes(item.id) ? 'bg-primary-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                            {item.type === 'image' ? (
                              <img
                                src={item.url}
                                alt={item.name}
                                className="h-10 w-10 rounded object-cover"
                              />
                            ) : (
                              getMediaIcon(item.type)
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={item.name}>
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.size}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.dimensions || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => toggleDropdown(item.id)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            <MoreVertical size={18} />
                          </button>
                          
                          {activeDropdown === item.id && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1">
                                <button
                                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit2 size={16} className="mr-2 text-gray-500" />
                                  Rename
                                </button>
                                <button
                                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Download size={16} className="mr-2 text-gray-500" />
                                  Download
                                </button>
                                <button
                                  onClick={() => deleteItem(item.id)}
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
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <ImageIcon size={48} className="text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No media found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {searchTerm || typeFilter !== 'all'
                            ? 'Try adjusting your search or filter criteria.'
                            : 'Upload some files to get started.'}
                        </p>
                        {(!searchTerm && typeFilter === 'all') && (
                          <button
                            onClick={handleUpload}
                            className="mt-6 btn btn-primary"
                          >
                            <UploadCloud size={16} className="mr-2" />
                            Upload Files
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;