function JobCard({ job, onToggleBookmark }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <img 
            src={job.companyLogo} 
            alt={job.company} 
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-medium text-lg text-blue-600 hover:underline cursor-pointer">
              {job.title}
            </h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
            
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                {job.type}
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                {job.salary}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                {job.posted}
              </span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onToggleBookmark}
          className="text-gray-400 hover:text-gray-700"
        >
          {job.isBookmarked ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <button className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium">
          View details
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition text-sm">
          Apply now
        </button>
      </div>
    </div>
  );
}

export default JobCard;
