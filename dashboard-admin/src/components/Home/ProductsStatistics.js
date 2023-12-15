import React from "react";
import { Pie } from '@ant-design/plots';
import { listProducts } from "../../Redux/Actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";


const ProductsStatistics = () => {

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;



const Paid = products.filter(value=>value.is)

  const data = [
    {
      type: 'Paid',
      value: 1,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };





  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Products statistics</h5>
          <Pie {...config} />
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
