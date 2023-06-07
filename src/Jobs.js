import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchBar from "./SearchBar";
import JobCard from "./JobCard";

const Jobs = ({ addApplication }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [params, setParams] = useState({});

  useEffect(() => {
    async function getJobs() {
      const data = await JoblyApi.getJobs(params);
      setJobs(data.jobs);
      setIsLoading(false);
    }
    getJobs()
  }, [params]);

  const updateParams = (value, filter = 'title') => {
    setParams({ ...params, [filter]: value });
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
      <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} updateParams={updateParams} />
      {jobs.map((job) => <JobCard job={job} addApplication={addApplication} key={job.id} />)}
    </div>
  )
}

export default Jobs;