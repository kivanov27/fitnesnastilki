"use client"

import { useState } from 'react';

interface ProductTabsProps {
    name: string;
    description: string | undefined;
    manufacturer: string | undefined;
    manufacturer_description: string | undefined;
}

const ProductTabs = ({ name, description, manufacturer, manufacturer_description }: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState<'description' | 'manufacturer'>('description');

    if (!description) return null;

    return (
        <div className='w-full mx-auto mt-8'>
            {/* Tabs */}
            <div className='flex justify-center border-b border-gray-300'>
                <button
                    className={`px-4 py-2 font-medium text-lg transition ${
                        activeTab === 'description'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-600 hover:text-primary'
                    }`}
                    onClick={() => setActiveTab('description')}
                >
                    Описание
                </button>
                {manufacturer && 
                    <button
                        className={`px-4 py-2 font-medium text-lg transition ${
                            activeTab === 'manufacturer'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-600 hover:text-primary'
                        }`}
                        onClick={() => setActiveTab('manufacturer')}
                    >
                        Производител
                    </button>
                }
            </div>

            {/* Content */}
            <div className='mt-4'>
                {activeTab === 'description' ? (
                    <div>
                        <h2 className='text-base lg:text-xl font-medium mb-4'>{name}</h2>
                        <div dangerouslySetInnerHTML={{ __html: description }} className='text-sm lg:text-base' />
                    </div>
                ) : (
                    <div>
                        <h2 className='text-base lg:text-xl font-medium mb-4'>{manufacturer}</h2>
                        {manufacturer_description && <div dangerouslySetInnerHTML={{ __html: manufacturer_description }} className='text-sm lg:text-base' />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
