import { useState } from 'react';
import JobCard from './JobCard';

function JobListing() {
  const [jobs, setJobs] = useState([
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Innovations Inc.",
      companyLogo: "https://randomuser.me/api/portraits/men/1.jpg",
      location: "San Francisco, CA (Remote)",
      salary: "$100K - $130K per year",
      type: "Full-time",
      posted: "2d ago",
      isBookmarked: false
    },
    {
      id: "2",
      title: "Senior UX Designer",
      company: "Creative Solutions",
      companyLogo: "https://randomuser.me/api/portraits/women/2.jpg",
      location: "New York, NY (Hybrid)",
      salary: "$120K - $150K per year",
      type: "Full-time",
      posted: "1w ago",
      isBookmarked: true
    },
    {
      id: "3",
      title: "Backend Developer",
      company: "Data Systems Corp",
      companyLogo: "https://randomuser.me/api/portraits/men/3.jpg",
      location: "Remote",
      salary: "$90K - $120K per year",
      type: "Contract",
      posted: "3d ago",
      isBookmarked: false
    },
    {
      id: "4",
      title: "Product Manager",
      company: "Innovative Tech",
      companyLogo: "https://randomuser.me/api/portraits/women/4.jpg",
      location: "Austin, TX",
      salary: "$110K - $140K per year",
      type: "Full-time",
      posted: "5d ago",
      isBookmarked: false
    }
  ]);

  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    datePosted: ""
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleToggleBookmark = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
    ));
  };

  const filteredJobs = jobs.filter(job => {
    if (filters.location && !job.location.includes(filters.location)) return false;
    if (filters.jobType && job.type !== filters.jobType) return false;
    
    if (filters.datePosted) {
      if (filters.datePosted === "pastWeek" && !job.posted.includes("d") && !job.posted.includes("h")) return false;
      if (filters.datePosted === "pastDay" && (!job.posted.includes("h") || parseInt(job.posted) > 24)) return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Find your next opportunity</h2>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              id="location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">All locations</option>
              <option value="Remote">Remote</option>
              <option value="San Francisco">San Francisco</option>
              <option value="New York">New York</option>
              <option value="Austin">Austin</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
              Job Type
            </label>
            <select
              id="jobType"
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">All types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="datePosted" className="block text-sm font-medium text-gray-700 mb-1">
              Date Posted
            </label>
            <select
              id="datePosted"
              name="datePosted"
              value={filters.datePosted}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Any time</option>
              <option value="pastDay">Past 24 hours</option>
              <option value="pastWeek">Past week</option>
              <option value="pastMonth">Past month</option>
            </select>
          </div>
        </div>
        
        {/* Search box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search job titles or keywords..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Job listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No jobs match your current filters. Try adjusting your search criteria.</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onToggleBookmark={() => handleToggleBookmark(job.id)} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default JobListing;
