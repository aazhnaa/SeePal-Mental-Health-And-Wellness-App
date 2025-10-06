import React from 'react'

const ArticleCard = ({article}) => {
  return (
    <div className="flex flex-col p-2 w-full max-w-[280px] gap-2 rounded-xl border mx-auto transition-transform duration-300 hover:scale-105 cursor-pointer">
      <img
        src={article.image}
        alt={article.name}
        className="w-full h-60 object-cover rounded-lg "
      />
      <h1 className="text-xl font-poppins-bold">{article.name}</h1>
      <p className="font-poppins text-sm text-gray-600">
        {article.description}
      </p>
    </div>
  );
};

export default ArticleCard
