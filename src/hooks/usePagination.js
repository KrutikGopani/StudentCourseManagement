// hooks/usePagination.js
import { useState, useMemo } from 'react';

export const usePagination = (data, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);
    
    return {
      currentData,
      totalPages,
      startIndex,
      endIndex
    };
  }, [data, currentPage, itemsPerPage]);
  
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, paginationData.totalPages)));
  };
  
  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  
  // Reset to page 1 when data changes
  useMemo(() => {
    setCurrentPage(1);
  }, [data.length]);
  
  return {
    currentData: paginationData.currentData,
    currentPage,
    totalPages: paginationData.totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < paginationData.totalPages,
    hasPrev: currentPage > 1,
    startIndex: paginationData.startIndex,
    endIndex: paginationData.endIndex
  };
};