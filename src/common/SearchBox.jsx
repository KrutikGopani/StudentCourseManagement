import React from 'react';
import { Search } from 'lucide-react';

const SearchBox = ({ searchTerm, onSearchChange, placeholder }) => (
  <div className="relative">
    
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
    />
  </div>
);

export default SearchBox;