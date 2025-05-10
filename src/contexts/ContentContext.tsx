import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { format } from 'date-fns';

// Define types for content items
export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  status: 'draft' | 'published' | 'archived';
  author: {
    id: string;
    name: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  views: number;
}

// Define the context type
interface ContentContextType {
  contentItems: ContentItem[];
  loading: boolean;
  error: string | null;
  getContentItem: (id: string) => ContentItem | undefined;
  createContentItem: (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => Promise<ContentItem>;
  updateContentItem: (id: string, item: Partial<ContentItem>) => Promise<ContentItem | undefined>;
  deleteContentItem: (id: string) => Promise<boolean>;
  publishContentItem: (id: string) => Promise<ContentItem | undefined>;
  archiveContentItem: (id: string) => Promise<ContentItem | undefined>;
}

// Create the context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Custom hook to use the context
export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

// Sample mock data
const sampleContentItems: ContentItem[] = [
  {
    id: '1',
    title: 'Getting Started with Content Management',
    slug: 'getting-started-with-content-management',
    content: '# Getting Started\n\nThis is a comprehensive guide to using our content management system...',
    excerpt: 'Learn the basics of content management with our guide.',
    coverImage: 'https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'published',
    author: {
      id: '1',
      name: 'Admin User',
    },
    category: 'Guides',
    tags: ['beginner', 'cms', 'tutorial'],
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-18T14:45:00Z',
    publishedAt: '2025-01-18T15:00:00Z',
    views: 1254,
  },
  {
    id: '2',
    title: 'Advanced Content Strategies',
    slug: 'advanced-content-strategies',
    content: '# Advanced Strategies\n\nOnce you\'ve mastered the basics, it\'s time to dive into advanced content strategies...',
    excerpt: 'Take your content to the next level with these advanced strategies.',
    coverImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'published',
    author: {
      id: '1',
      name: 'Admin User',
    },
    category: 'Strategies',
    tags: ['advanced', 'strategy', 'optimization'],
    createdAt: '2025-01-20T09:15:00Z',
    updatedAt: '2025-01-22T11:30:00Z',
    publishedAt: '2025-01-22T12:00:00Z',
    views: 872,
  },
  {
    id: '3',
    title: 'Content SEO Best Practices',
    slug: 'content-seo-best-practices',
    content: '# SEO Best Practices\n\nOptimizing your content for search engines is crucial...',
    excerpt: 'Learn how to optimize your content for better search engine rankings.',
    coverImage: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'draft',
    author: {
      id: '1',
      name: 'Admin User',
    },
    category: 'SEO',
    tags: ['seo', 'optimization', 'search'],
    createdAt: '2025-01-25T13:45:00Z',
    updatedAt: '2025-01-26T10:20:00Z',
    views: 0,
  },
  {
    id: '4',
    title: 'Managing Digital Assets Effectively',
    slug: 'managing-digital-assets-effectively',
    content: '# Digital Asset Management\n\nLearn how to organize and manage your digital assets effectively...',
    excerpt: 'Tips for organizing and managing your digital assets.',
    coverImage: 'https://images.pexels.com/photos/5076527/pexels-photo-5076527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'archived',
    author: {
      id: '1',
      name: 'Admin User',
    },
    category: 'Asset Management',
    tags: ['assets', 'organization', 'media'],
    createdAt: '2025-01-10T11:20:00Z',
    updatedAt: '2025-01-30T09:15:00Z',
    publishedAt: '2025-01-12T10:00:00Z',
    views: 456,
  },
  {
    id: '5',
    title: 'Content Workflow Optimization',
    slug: 'content-workflow-optimization',
    content: '# Workflow Optimization\n\nStreamline your content creation and publishing process...',
    excerpt: 'Streamline your content workflows for better efficiency.',
    coverImage: 'https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'published',
    author: {
      id: '1',
      name: 'Admin User',
    },
    category: 'Workflows',
    tags: ['workflow', 'productivity', 'efficiency'],
    createdAt: '2025-02-01T08:30:00Z',
    updatedAt: '2025-02-03T14:20:00Z',
    publishedAt: '2025-02-03T15:00:00Z',
    views: 687,
  },
];

// Provider component
interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with sample data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setContentItems(sampleContentItems);
        setLoading(false);
      } catch (err) {
        setError('Failed to load content items');
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Get a specific content item by ID
  const getContentItem = (id: string): ContentItem | undefined => {
    return contentItems.find(item => item.id === id);
  };

  // Create a new content item
  const createContentItem = async (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<ContentItem> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const now = new Date().toISOString();
    const newItem: ContentItem = {
      ...item,
      id: `${contentItems.length + 1}`,
      createdAt: now,
      updatedAt: now,
      views: 0,
    };

    setContentItems(prev => [...prev, newItem]);
    return newItem;
  };

  // Update an existing content item
  const updateContentItem = async (id: string, item: Partial<ContentItem>): Promise<ContentItem | undefined> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const index = contentItems.findIndex(content => content.id === id);
    if (index === -1) return undefined;

    const updatedItem = {
      ...contentItems[index],
      ...item,
      updatedAt: new Date().toISOString(),
    };

    const updatedItems = [...contentItems];
    updatedItems[index] = updatedItem;
    setContentItems(updatedItems);

    return updatedItem;
  };

  // Delete a content item
  const deleteContentItem = async (id: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const index = contentItems.findIndex(content => content.id === id);
    if (index === -1) return false;

    const updatedItems = contentItems.filter(content => content.id !== id);
    setContentItems(updatedItems);

    return true;
  };

  // Publish a content item
  const publishContentItem = async (id: string): Promise<ContentItem | undefined> => {
    const now = new Date().toISOString();
    return updateContentItem(id, {
      status: 'published',
      publishedAt: now,
    });
  };

  // Archive a content item
  const archiveContentItem = async (id: string): Promise<ContentItem | undefined> => {
    return updateContentItem(id, {
      status: 'archived',
    });
  };

  // Context value
  const value = {
    contentItems,
    loading,
    error,
    getContentItem,
    createContentItem,
    updateContentItem,
    deleteContentItem,
    publishContentItem,
    archiveContentItem,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};