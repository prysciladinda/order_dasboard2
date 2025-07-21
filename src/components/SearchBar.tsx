
import React from 'react';
import Input from './ui/Input';

interface SearchBarProps {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ keyword, onKeywordChange, onClear }) => {
    return (
        <Input
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            onClear={onClear}
            placeholder="Cari nama barang…"
            aria-label="Cari berdasarkan nama barang"
        />
    );
};

export default SearchBar;
