/**
 * Created by chenyao on 2016/3/30.
 * product container
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { request, receive, search, setVisibilityFilter, fetchProsIfNeeded } from '../actions/product';

import { Filters } from '../constant/product';
import Products from '../components/Product';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { Button, Row, Col } from 'antd';

class Product extends Component {
  static propTypes = {
    search: PropTypes.string.isRequired,
    visiblePros: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    visibilityFilter: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, search } = this.props;
    dispatch(fetchProsIfNeeded(search));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      dispatch(fetchProsIfNeeded(search));
    }
  }

  handleChange(nextSearchObj) {
    this.props.dispatch(search(nextSearchObj));
  }

  render() {
    const {search, pros, visiblePros, isFetching, visibilityFilter } = this.props;
    return (
      <Row type="flex" justify="center" style={{ marginTop: 30 }}>
       <Col span="20">

         <SearchBar onSubmit={this.handleChange} />

         {isFetching && pros.length === 0 &&
         <h2>Loading...</h2>
         }
         {!isFetching && pros.length === 0 &&
         <h2>Empty.</h2>
         }

         {pros.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
             <FilterBar filter={this.props.visibilityFilter} onFilterChange = {nextFilter => 
              this.props.dispatch(setVisibilityFilter(nextFilter))
             }
             />
          <Products pros={visiblePros} />
         </div>
        }
       </Col>
     </Row>
    );
  }
}

Product.propTypes = {
  search: PropTypes.string.isRequired,
  visiblePros: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function selectPros(pros, filter) {
  switch (filter) {
    case Filters.SHOW_ALL:
      return pros;
    case Filters.SHOW_CHANGE:
      return pros.filter(prosItem => prosItem.statusCode === 'change');
    case Filters.SHOW_SHELVE:
      return pros.filter(prosItem => prosItem.statusCode === 'shelve');
    case Filters.SHOW_OFF_SHELVE:
      return pros.filter(prosItem => prosItem.statusCode === 'offShelve');
    case Filters.SHOW_NEW:
      return pros.filter(prosItem => prosItem.statusCode === 'new');
    case Filters.SHOW_OUT_OF_SALE:
      return pros.filter(prosItem => prosItem.statusCode === 'outOfSale');
    case Filters.SHOW_CONFIRM:
      return pros.filter(prosItem => prosItem.statusCode === 'confirm');
    default:
      return pros;
  }
}

function mapStateToProps(state) {
  const { visibilityFilter, productsByQuery, search } = state.productReducer;
  const { isFetching, items: pros } = productsByQuery[search] || { isFetching: true, items: [] };
  return {
    visibilityFilter,
    visiblePros: selectPros(pros, visibilityFilter),
    search,
    pros,
    isFetching,
  };
}

export default connect(mapStateToProps)(Product);
