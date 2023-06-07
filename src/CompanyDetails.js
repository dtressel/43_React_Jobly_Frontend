import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import JobCard from './JobCard';
import JoblyApi from './api';

const CompanyDetails = ({ addApplication }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { handle } = useParams();
  const company = useRef();

  useEffect(() => {
    console.log('in useEffect');
    async function getCompanies() {
      console.log('in useEffect getCompanies');
      company.current = await JoblyApi.getCompany(handle);
      setIsLoading(false);
    }
    getCompanies();
  }, [handle]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return(
    <>
      <h2>{company.current.name}</h2>
      <p>{company.current.description}</p>
      {company.current.jobs.map(job => <JobCard job={job} addApplication={addApplication} />)}
    </>
  )

}

export default CompanyDetails;