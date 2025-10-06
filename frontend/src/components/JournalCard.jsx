const JournalCard = ({ entry }) => {
  const formattedDate = new Date(entry.createdAt).toLocaleDateString("en-IN", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="bg-base-100 rounded-lg shadow-md border border-base-200 overflow-hidden flex flex-col">
      {entry.image && (
        <img 
          src={entry.image} 
          alt="Journal entry" 
          className="w-full h-48 object-cover" 
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
        <p className="text-gray-700 flex-grow">{entry.text}</p>
      </div>
    </div>
  );
};

export default JournalCard;