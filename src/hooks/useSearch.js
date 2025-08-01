
import { useState, useMemo } from 'react';

export const useSearch = (data, searchFields) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = useMemo(() => {
    if (!searchTerm || !searchTerm.trim()) return data;
    
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    return data.filter(item =>
      searchFields.some(field => {

        const value = field.split('.').reduce((obj, key) => {
          if (obj && obj[key] !== undefined) {
            return obj[key];
          }
          return null;
        }, item);
        
        if (value === null || value === undefined) return false;
        

        if (Array.isArray(value)) {
          return value.some(arrayItem => 
            arrayItem && arrayItem.toString().toLowerCase().includes(normalizedSearchTerm)
          );
        }
        

        return value.toString().toLowerCase().includes(normalizedSearchTerm);
      })
    );
  }, [data, searchTerm, searchFields]);
  
  const clearSearch = () => setSearchTerm('');
  
  return { 
    filteredData, 
    searchTerm, 
    setSearchTerm,
    clearSearch,
    hasActiveSearch: searchTerm.trim().length > 0
  };
};