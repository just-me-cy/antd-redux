/**
 * Created by chenyao on 2016/4/6.
 * product container
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
// import isEqual from 'lodash.isEqual';
import { setVisibilityFilter, getProduct } from '../actions/product';
import { Filters } from '../constant/Product';
import ProductLists from '../components/ProductLists';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { Row, Col } from 'antd';
import { fromJS, is } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

/* eslint no-console:"off" */
class Product extends React.Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    visiblePros: ImmutablePropTypes.list.isRequired,
    isFetching: PropTypes.bool.isRequired,
    visibilityFilter: PropTypes.string.isRequired,
    pros: ImmutablePropTypes.list.isRequired,
    errMsg: PropTypes.string.isRequired,
    getProductTem: PropTypes.func.isRequired,
    setVisibilityFilterTem: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('首次渲染完----dispath search');
    const { search, getProductTem } = this.props;
    getProductTem(search.toJS());
  }

  shouldComponentUpdate(nextProps) {
    console.log('进入判断是否要rerender', fromJS(nextProps).get('pros'), this.props.pros);
    if (nextProps.visibilityFilter !== this.props.visibilityFilter
      || ! (fromJS(nextProps).get('pros').equals(this.props.pros))) {
      console.log('要重新渲染');
      return true;
    }
    return false;
  }

  handleChange(nextSearchObj) {
    console.log('点击搜索click------dispath search');
    this.props.getProductTem(nextSearchObj);
  }

  render() {
    console.log('渲染---');
    const { pros, visiblePros, isFetching, visibilityFilter, errMsg } = this.props;
    return (
      <Row type="flex" justify="center" style={{ marginTop: 30 }} >
        <Col span="20">
           <SearchBar doSearch={this.handleChange} />
           {isFetching && pros.size === 0 && <h2>Loading...</h2>}
           {!isFetching && pros.size === 0 && !errMsg && <h2>Empty.</h2>}
           {errMsg && <h2>模拟数据支持有限</h2>}
           {pros.size > 0 &&
             <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <FilterBar
                filter = { visibilityFilter }
                onFilterChange = {nextFilter => this.props.setVisibilityFilterTem(nextFilter)}
              />
              <ProductLists pros={visiblePros} />
             </div>
            }
        </Col>
     </Row>
    );
  }
}

const prosSelector = (state) => {
  console.log('--进入input selectors，判断是否要重新计算---');
  return state.product.productsByQuery.get('items');
};

const filterSelector = (state) => state.product.visibilityFilter;

// 使用lodash.isEqual比较函数代替默认的 ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  // 暂时不使用 lodash，没必要因为这一个方法引入；edit by khan
  is
);

const selectPros = createDeepEqualSelector(
  [prosSelector, filterSelector],
  (pros, filter) => {
    console.log('重新计算select', pros);
    switch (filter) {
      case Filters.SHOW_ALL:
        return pros;
      case Filters.SHOW_CHANGE:
        return pros.filter(prosItem => prosItem.get('statusCode') === 'change');
      case Filters.SHOW_SHELVE:
        return pros.filter(prosItem => prosItem.get('statusCode') === 'shelve');
      case Filters.SHOW_OFF_SHELVE:
        return pros.filter(prosItem => prosItem.get('statusCode') === 'offShelve');
      case Filters.SHOW_NEW:
        return pros.filter(prosItem => prosItem.get('statusCode') === 'new');
      case Filters.SHOW_OUT_OF_SALE:
        return pros.filter(prosItem => prosItem.get('statusCode') === 'outOfSale');
      case Filters.SHOW_CONFIRM:
        return pros.filter(prosItem => prosItem.get('statusCode') === 'confirm');
      default :
        return pros;
    }
  }
);

function mapStateToProps(state) {
  console.log('mapStateToProps---');
  const { visibilityFilter, productsByQuery, search } = state.product;
  return {
    visibilityFilter,
    search,
    pros: productsByQuery.get('items'),
    isFetching: productsByQuery.get('isFetching'),
    errMsg: productsByQuery.get('errMsg'),
    visiblePros: selectPros(state),
  };
}


function mapDispatchToProps(dispatch) {
  return {
    getProductTem: bindActionCreators(getProduct, dispatch),
    setVisibilityFilterTem: bindActionCreators(setVisibilityFilter, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
