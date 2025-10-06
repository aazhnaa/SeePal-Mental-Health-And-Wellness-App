import React from 'react'; 

const navItems = ['Feed', 'Resources'];
const CommunityNavbar = ({ activeTab, onTabClick }) => {
  return (
    <div className="w-full flex justify-center p-4 bg-base-100">
      <div className="tabs tabs-boxed bg-base-200 rounded-2xl shadow-sm">
        {navItems.map((item) => (
          <a
            key={item}
            className={`tab tab-lg text-base font-medium ${
              activeTab === item ? 'tab-active' : ''
            }`}
            onClick={() => onTabClick(item)}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CommunityNavbar;