import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchInput,
} from 'components/Searchbar/Searchbar.styled';



class Searchbar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;
    const normilizedQuery = query.trim();

    this.props.onSearch(normilizedQuery);
    this.setState({ query: normilizedQuery });

    if (!normilizedQuery) {
      toast.error('Please, enter your search query.');
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { query } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel >
              <ImSearch size={'1.2em'}/>
            </SearchFormButtonLabel>
          </SearchFormButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={query}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
