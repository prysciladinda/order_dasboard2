import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Filters, LocationOption } from '../types';
import { ORIGIN_OPTIONS, DESTINATION_OPTIONS } from '../constants';
import Button from './ui/Button';
import Input from './ui/Input';
import Checkbox from './ui/Checkbox';

interface FilterPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (newFilters: Filters) => void;
    initialFilters: Filters;
    anchorRef: React.RefObject<HTMLElement | null>;
}

type ActiveTab = 'origin' | 'destination';

const FilterPopover: React.FC<FilterPopoverProps> = ({ isOpen, onClose, onApply, initialFilters, anchorRef }) => {
    const [draftFilters, setDraftFilters] = useState<Filters>(initialFilters);
    const [activeTab, setActiveTab] = useState<ActiveTab>('origin');
    const [originSearch, setOriginSearch] = useState('');
    const [destinationSearch, setDestinationSearch] = useState('');

    const popoverRef = useRef<HTMLDivElement>(null);

    const isFilterChanged = useMemo(() => {
        return JSON.stringify(initialFilters) !== JSON.stringify(draftFilters);
    }, [initialFilters, draftFilters]);

    useEffect(() => {
        if (isOpen) {
            setDraftFilters(initialFilters);
            setOriginSearch('');
            setDestinationSearch('');
            setActiveTab('origin');
        }
    }, [isOpen, initialFilters]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && popoverRef.current && !popoverRef.current.contains(event.target as Node) && anchorRef.current && !anchorRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, anchorRef]);

    if (!isOpen) return null;

    const handleCheckboxChange = (code: string, type: ActiveTab) => {
        const key = `${type}_code` as keyof Filters;
        const currentCodes = draftFilters[key];
        const newCodes = currentCodes.includes(code) ? currentCodes.filter(c => c !== code) : [...currentCodes, code];
        setDraftFilters(prev => ({ ...prev, [key]: newCodes }));
    };

    const handleReset = () => {
        const emptyFilters = { origin_code: [], destination_code: [] };
        onApply(emptyFilters);
        onClose();
    };

    const handleApply = () => {
        onApply(draftFilters);
        onClose();
    };

    const originCount = draftFilters.origin_code.length;
    const destinationCount = draftFilters.destination_code.length;

    const isResetDisabled = originCount === 0 && destinationCount === 0;

    const renderTabContent = (type: ActiveTab, options: LocationOption[], search: string, setSearch: (s: string) => void) => {
        const filteredOptions = options.filter(opt => opt.name.toLowerCase().includes(search.toLowerCase()));
        const key = `${type}_code` as keyof Filters;

        return (
            <div className="flex flex-col h-full">
                <Input
                    placeholder="Cari"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => setSearch('')}
                    className="mb-4"
                    aria-label={`Search ${type}`}
                />
                <div className="space-y-3 flex-grow overflow-y-auto pr-2">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(option => (
                            <Checkbox
                                key={option.code}
                                label={option.name}
                                checked={draftFilters[key].includes(option.code)}
                                onChange={() => handleCheckboxChange(option.code, type)}
                            />
                        ))
                    ) : (
                        <p className="text-sm text-neutral-dark text-center mt-4">No results found.</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <div
                ref={popoverRef}
                className="
                    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md
                    md:absolute md:top-full md:left-auto md:right-0 md:mt-2 md:w-[480px] md:max-w-none md:translate-x-0 md:translate-y-0
                    z-50 bg-white rounded-lg shadow-lg border border-neutral-medium animate-fade-in-down overflow-hidden
                "
            >
                <div className="flex flex-col md:flex-row" style={{ height: '350px' }}>
                    <div className="flex md:flex-col w-full md:w-[160px] border-b md:border-b-0 md:border-r border-neutral-medium bg-gray-100 flex-shrink-0">
                        <Button variant={activeTab === 'origin' ? 'primary' : 'ghost'} onClick={() => setActiveTab('origin')} className="flex-1 md:w-full justify-center md:justify-start p-4 rounded-none">
                            Origin{originCount > 0 ? ` (${originCount})` : ''}
                        </Button>
                        <Button variant={activeTab === 'destination' ? 'primary' : 'ghost'} onClick={() => setActiveTab('destination')} className="flex-1 md:w-full justify-center md:justify-start p-4 rounded-none">
                            Destination{destinationCount > 0 ? ` (${destinationCount})` : ''}
                        </Button>
                    </div>
                    <div className="flex-1 flex flex-col bg-white overflow-hidden">
                        <div className="p-4 flex-grow overflow-auto">
                            {activeTab === 'origin' && renderTabContent('origin', ORIGIN_OPTIONS, originSearch, setOriginSearch)}
                            {activeTab === 'destination' && renderTabContent('destination', DESTINATION_OPTIONS, destinationSearch, setDestinationSearch)}
                        </div>
                        <div className="p-4 border-t border-neutral-medium bg-white flex justify-between items-center flex-shrink-0">
                            <Button variant="ghost" size="sm" onClick={handleReset} disabled={isResetDisabled} aria-label="Reset filters">
                                Reset
                            </Button>
                            <Button size="sm" onClick={handleApply} disabled={!isFilterChanged} aria-label="Apply filters">
                                Terapkan
                            </Button>
                        </div>
                    </div>
                </div>
                <style>{`
                    @keyframes fade-in-down { 0% { opacity: 0; transform: translateY(-10px); } 100% { opacity: 1; transform: translateY(0); } }
                    .animate-fade-in-down { animation: fade-in-down 0.2s ease-out; }
                `}</style>
            </div>
        </>
    );
};

export default FilterPopover;
