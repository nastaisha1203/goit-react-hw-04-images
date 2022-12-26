import { Formik } from 'formik';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  SearchButton,
  SearchLabel,
  SearchInput,
} from './Searchbar.styled';
export const Searchbar = ({ onSubmit }) => {
  const initialValues = {
    searchQuery: '',
  };
  const handleSubmit = (values, { resetForm }) => {
    const query = values.searchQuery.trim();
    if (query === '') {
      toast.error('Enter a valid name!');
      return;
    }
    onSubmit(query);
    resetForm();
  };
  return (
    <SearchBar>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchButton type="submit">
            <SearchLabel>
              <BsSearch />
            </SearchLabel>
          </SearchButton>

          <SearchInput
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
