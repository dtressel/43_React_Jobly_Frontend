import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";

const Companies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [params, setParams] = useState({});

  useEffect(() => {
    async function getCompanies() {
      const data = await JoblyApi.getCompanies(params);
      setCompanies(data.companies);
      setIsLoading(false);
    }
    getCompanies()
  }, [params]);

  const updateParams = (value, filter = 'nameLike') => {
    setParams({ ...params, [filter]: value });
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
      <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} updateParams={updateParams} />
      {companies.map((company) => <CompanyCard company={company} key={company.handle} />)}
    </div>
  )
}

export default Companies;