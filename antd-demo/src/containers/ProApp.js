/**
 * Created by chenyao0913 on 2016/3/30.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { request, receive,search, setVisibilityFilter ,fetchProsIfNeeded ,Filters} from '../actions/actionsPro';
import Products from '../components/Products';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { Button,Row, Col } from 'antd';

class ProApp extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {

    const { dispatch, search } = this.props;
    console.log("1:"+search);
    dispatch(fetchProsIfNeeded(search))
  }

  componentWillReceiveProps(nextProps) {
    console.log(2)
    console.log(nextProps);
    if (nextProps.search !== this.props.search) {
      const { dispatch, search } = nextProps;
      dispatch(fetchProsIfNeeded(search))
    }
  }

  handleChange(nextSearchObj) {
    this.props.dispatch(search(nextSearchObj))
  }

 render (){
   const {search, pros,visiblePros, isFetching, visibilityFilter} = this.props;
   return (
     <Row  type="flex" justify="center" style={{marginTop:30}}>
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
             }/>
             <Products pros={visiblePros} />
           </div>
         }
       </Col>
     </Row>
   )
 }
}

ProApp.propTypes = {
  search:PropTypes.string.isRequired,
  visiblePros: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function selectPros(pros, filter) {
  switch (filter) {
    case Filters.SHOW_ALL:
      return pros;
    case Filters.SHOW_CHANGE:
      return pros.filter(pros => pros.statusCode === 'change');
    case Filters.SHOW_SHELVE:
      return pros.filter(pros => pros.statusCode === 'shelve');
    case Filters.SHOW_OFF_SHELVE:
      return pros.filter(pros => pros.statusCode === 'offShelve');
    case Filters.SHOW_NEW:
      return pros.filter(pros => pros.statusCode === 'new');
    case Filters.SHOW_OUT_OF_SALE:
      return pros.filter(pros => pros.statusCode === 'outOfSale');
    case Filters.SHOW_CONFIRM:
      return pros.filter(pros => pros.statusCode === 'confirm');
  }
}

function mapStateToProps(state) {
  const {visibilityFilter, productsByQuery, search } = state
  const {isFetching, items:pros} = productsByQuery[search] || {isFetching: true,items: []}

  return {
    visibilityFilter:state.visibilityFilter,
    visiblePros:selectPros(pros,visibilityFilter),
    search,
    pros,
    isFetching
  }
}

export default connect(mapStateToProps)(ProApp)
