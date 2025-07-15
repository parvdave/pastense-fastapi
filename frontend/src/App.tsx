import { useState } from 'react';
import AddPageVisit from './components/AddPageVisit';
import SearchPages from './components/SearchPages';
import { Search, Plus } from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState<'add' | 'search'>('search');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">PastTense</h1>
                    <p className="text-gray-600">Semantic Search for Your Web History</p>
                </header>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="border-b border-gray-200">
                            <nav className="flex">
                                <button
                                    onClick={() => setActiveTab('search')}
                                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'search'
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Search className="inline-block w-5 h-5 mr-2" />
                                    Search Pages
                                </button>
                                <button
                                    onClick={() => setActiveTab('add')}
                                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'add'
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Plus className="inline-block w-5 h-5 mr-2" />
                                    Add Page Visit
                                </button>
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab === 'search' && <SearchPages />}
                            {activeTab === 'add' && <AddPageVisit />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App; 