import React from 'react'
import TableSearch from '@/components/TableSearch'
import FilterButton from '@/components/FilterButton'
import { Plus } from 'lucide-react';

export default function PageHeader({PageName, searchValue, onSearchChange, OnClick }) {
  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="hidden md:block text-lg font-bold text-gray-800">{PageName}</h1>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <TableSearch value={searchValue} onChange={onSearchChange} />
            
            <FilterButton />

            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
              onClick={OnClick}
            >
              <Plus size={19} className="lg:hidden" />
              <span className="hidden sm:inline text-sm">Add {PageName}</span>
            </button>
          </div>
        </div>
    </div>
  )
}
