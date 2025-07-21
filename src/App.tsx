
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Order, Filters, ApiPayload, ApiResponse } from './types';
import SearchBar from './components/SearchBar';
import OrderCard from './components/OrderCard';
import Pagination from './components/Pagination';
import FilterPopover from './components/FilterPopover';

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [filters, setFilters] = useState<Filters>({ origin_code: [], destination_code: [] });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [allOrders, setAllOrders] = useState<Order[]>([]);

    const [isFilterPopoverOpen, setFilterPopoverOpen] = useState<boolean>(false);
    const filterButtonRef = useRef<HTMLButtonElement>(null);

    const ORDERS_PER_PAGE = 6;

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const payload: ApiPayload = {
                keyword: searchKeyword,
                filter: {
                    order_status: [0, 1, 2, 3, 4],
                    ...filters,
                },
                page: 1,
            };

            const response = await fetch(import.meta.env.VITE_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const data: ApiResponse = await response.json();

            setAllOrders(data.order_list || []);
            setCurrentPage(1);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setAllOrders([]);
        } finally {
            setLoading(false);
        }
    }, [searchKeyword, filters]);


    const totalPages = Math.ceil(allOrders.length / ORDERS_PER_PAGE) || 1;
    const orders = allOrders.slice((currentPage - 1) * ORDERS_PER_PAGE, currentPage * ORDERS_PER_PAGE);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchOrders();
        }, 500);
        return () => clearTimeout(debounceTimer);
    }, [searchKeyword, filters, fetchOrders]);


    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleClearSearch = () => {
        setSearchKeyword('');
    };

    const handleApplyFilters = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    // skeleton loading
    const renderContent = () => {
        if (loading) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-xl border-2 border-neutral-medium p-4 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                        </div>
                    ))}
                </div>
            );
        }
        if (error) {
            return <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">Error: {error}</div>;
        }
        if (orders.length === 0) {
            return <div className="text-center text-neutral-dark bg-gray-100 p-8 rounded-lg">No orders found. Try adjusting your search or filters.</div>;
        }
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <OrderCard key={order.do_id} order={order} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white text-neutral-darker p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4 w-full md:w-auto flex-grow">
                        <SearchBar
                            keyword={searchKeyword}
                            onKeywordChange={setSearchKeyword}
                            onClear={handleClearSearch}
                        />
                        <div className="relative">
                            <button
                                ref={filterButtonRef}
                                onClick={() => setFilterPopoverOpen(prev => !prev)}
                                className="flex-shrink-0 px-5 py-2 border border-neutral-dark rounded-md font-semibold text-neutral-darker bg-white hover:bg-neutral-light transition-colors"
                            >
                                Filter
                            </button>
                            <FilterPopover
                                isOpen={isFilterPopoverOpen}
                                onClose={() => setFilterPopoverOpen(false)}
                                onApply={handleApplyFilters}
                                initialFilters={filters}
                                anchorRef={filterButtonRef}
                            />
                        </div>
                    </div>
                    {!loading && !error && orders.length > 0 && (
                        <div className="self-end md:self-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </header>

                <main>
                    {renderContent()}
                </main>

            </div>
        </div>
    );
};

export default App;
