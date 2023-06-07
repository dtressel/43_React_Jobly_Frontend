import { Button, Input } from 'reactstrap';
import './SearchBar.css';

const SearchBar = ({ setSearchValue, searchValue, updateParams }) => {
  const submitFilter = (evt) => {
    evt.preventDefault();
    updateParams(searchValue);
    setSearchValue('');
  }

  return (
    <form className="SearchBar" onSubmit={submitFilter} >
      <Input 
        type="text"
        bsSize="lg"
        placeholder="Enter search term"
        value={searchValue}
        onChange={(evt) => {setSearchValue(evt.target.value)}}
      />
      <Button 
        color="primary" 
        size="lg" 
        type="submit"
      >Submit</Button >
    </form>
  )
}

export default SearchBar;