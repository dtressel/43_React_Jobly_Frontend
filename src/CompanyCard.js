import { Link } from 'react-router-dom';
import './CompanyCard.css'

const CompanyCard = ({ company }) => {
  return (
    <Link className="CompanyCard" to={`/companies/${company.handle}`}>
      <div className="CompanyCard-div">
        <div>
          <h5>{company.name}</h5>
          <p>{company.description}</p>
        </div>
        {company.logoUrl && 
          <div>
            <img src={company.logoUrl} alt={`${company.name} logo`} />
          </div>
        }
      </div>
    </Link>
  )

}

export default CompanyCard;