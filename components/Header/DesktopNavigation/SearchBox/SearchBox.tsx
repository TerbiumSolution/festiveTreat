'use client'
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import styles from "@/components/Header/DesktopNavigation/SearchBox/SearchBox.module.css"
interface SearchResult {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mock search results for demonstration
  const mockResults: SearchResult[] = [
    { id: 1, title: 'Products', description: 'Browse our product catalog', icon: '📦' },
    { id: 2, title: 'Services', description: 'Explore our services', icon: '🛠️' },
    { id: 3, title: 'Support', description: 'Get help and support', icon: '🎧' },
    { id: 4, title: 'Documentation', description: 'Read our docs', icon: '📚' },
    { id: 5, title: 'API Reference', description: 'Developer resources', icon: '⚡' },
    { id: 6, title: 'Community', description: 'Join our community', icon: '👥' },
  ];

  // Filter results based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = mockResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.search_box} w-full max-w-2xl mx-auto`}>

      {/* Search Container */}
      <div className="relative">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" stroke="#1A56DB" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, services..."
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          />
          
          {query && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isOpen && results.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
              <p className="text-sm text-gray-600">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {results.map((result) => (
              <div
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{result.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{result.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {isOpen && query && results.length === 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="px-4 py-8 text-center">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </div>

      {/* Command Palette Style Alternative */}
     

    </div>
  );
}