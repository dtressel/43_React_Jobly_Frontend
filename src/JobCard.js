import { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';
import './JobCard.css';
import { Button } from 'reactstrap';

const JobCard = ({ job, addApplication }) => {
  const user = useContext(UserContext);
  const [applied, setApplied] = useState(user.applications.includes(job.id));
  useEffect(() => {
    if (user.applications.includes(job.id)) {
      setApplied(true);
    }
  }, [user.applications, job.id]);
  const handleClick = async () => {
    const added = await addApplication(job.id);
    if (added) {
      setApplied(true);
    }
    else {
      alert('Server error. Not able to set job as "applied." Please try again later.');
    }
  }
  console.log(user.applications);
  const applyButton = applied
    ? <Button color="danger" onClick={handleClick} disabled>APPLIED</Button> 
    : <Button color="danger" onClick={handleClick}>APPLY</Button>;
  
  return (
    <div className="JobCard">
      <h5>{job.title}</h5>
      <div className="JobCard-content">
        <div className="JobCard-content-left">
          <div>Salary: {job.salary}</div>
          <div>Equity: {job.equity}</div>
        </div>
        <div className="JobCard-content-right">
          {applyButton}
        </div>
      </div>
    </div>
  )
}

export default JobCard;