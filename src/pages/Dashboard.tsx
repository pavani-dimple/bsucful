import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Image, 
  Users, 
  TrendingUp, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Clock, 
  PlusCircle,
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell 
} from 'recharts';

// Sample data for charts
const visitData = [
  { name: 'Sun', value: 324 },
  { name: 'Mon', value: 456 },
  { name: 'Tue', value: 512 },
  { name: 'Wed', value: 578 },
  { name: 'Thu', value: 423 },
  { name: 'Fri', value: 389 },
  { name: 'Sat', value: 401 },
];

const contentTypeData = [
  { name: 'Articles', value: 42 },
  { name: 'Pages', value: 12 },
  { name: 'Media', value: 78 },
];

const COLORS = ['#3366FF', '#26A5A1', '#F05E1A'];

const recentActivity = [
  {
    id: 1,
    action: 'published',
    title: 'Advanced Content Strategies',
    user: 'Admin User',
    time: '2 hours ago',
  },
  {
    id: 2,
    action: 'commented',
    title: 'Getting Started with Content Management',
    user: 'John Smith',
    time: '5 hours ago',
  },
  {
    id: 3,
    action: 'uploaded',
    title: 'product-screenshot.png',
    user: 'Sarah Williams',
    time: '1 day ago',
  },
  {
    id: 4,
    action: 'updated',
    title: 'Content SEO Best Practices',
    user: 'Admin User',
    time: '2 days ago',
  },
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
        <p className="text-xs font-semibold">{`${label}`}</p>
        <p className="text-xs text-primary-600">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Dashboard component
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { contentItems, loading } = useContent();
  
  // Calculate counts
  const publishedCount = contentItems.filter(item => item.status === 'published').length;
  const draftCount = contentItems.filter(item => item.status === 'draft').length;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Link to="/content/create" className="btn btn-primary">
            <PlusCircle size={16} className="mr-1" />
            Create Content
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published Content</p>
              <p className="text-2xl font-bold text-gray-900">{publishedCount}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <FileText size={20} className="text-primary-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <TrendingUp size={16} className="text-success-500 mr-1" />
              <span className="text-xs font-medium text-success-500">+12% from last month</span>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Media Files</p>
              <p className="text-2xl font-bold text-gray-900">78</p>
            </div>
            <div className="p-3 bg-secondary-100 rounded-full">
              <Image size={20} className="text-secondary-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <TrendingUp size={16} className="text-success-500 mr-1" />
              <span className="text-xs font-medium text-success-500">+8% from last month</span>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-accent-100 rounded-full">
              <Users size={20} className="text-accent-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <TrendingUp size={16} className="text-success-500 mr-1" />
              <span className="text-xs font-medium text-success-500">+3 new this month</span>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Draft Content</p>
              <p className="text-2xl font-bold text-gray-900">{draftCount}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <Clock size={20} className="text-gray-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/content" className="text-xs font-medium text-primary-600 flex items-center">
              View all drafts
              <ExternalLink size={12} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Website Traffic</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visitData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Visitors"
                  stroke="#3366FF" 
                  strokeWidth={2}
                  dot={{ stroke: '#3366FF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Content performance and recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Content</h2>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {contentItems
                .filter(item => item.status === 'published')
                .sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map(item => (
                  <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                      </div>
                      <div className="flex space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Eye size={14} className="mr-1" />
                          {item.views}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp size={14} className="mr-1" />
                          {Math.floor(item.views * 0.12)}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare size={14} className="mr-1" />
                          {Math.floor(item.views * 0.03)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        
        <div className="card">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map(activity => (
                <li key={activity.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      {activity.action === 'published' && (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                          <FileText size={16} className="text-green-600" />
                        </span>
                      )}
                      {activity.action === 'commented' && (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                          <MessageSquare size={16} className="text-blue-600" />
                        </span>
                      )}
                      {activity.action === 'uploaded' && (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-100">
                          <Image size={16} className="text-purple-600" />
                        </span>
                      )}
                      {activity.action === 'updated' && (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100">
                          <FileText size={16} className="text-yellow-600" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-gray-500">
                          {' '}
                          {activity.action} "{activity.title}"
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;