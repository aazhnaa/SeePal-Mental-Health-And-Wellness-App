import React, { useEffect, useState } from 'react';
import CommunityNavbar from '../components/CommunityNavbar';
import Feed from '../components/Feed';
import Resources from '../components/Resources';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('Feed');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'Feed':
        return <Feed />;
      case 'Groups':
        return <Groups />;
      case 'Resources':
        return <Resources />;
      // case 'Events':
      //   return <Events />;
      default:
        return <Feed />; 
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <header>
        <CommunityNavbar 
          activeTab={activeTab} 
          onTabClick={setActiveTab} 
        />
      </header>

      <main className="p-6 flex flex-col justify-center items-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default Explore;

