/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
import $ from 'jquery';
// reactstrap components
import { Button, Card, CardHeader, CardBody, NavItem, NavLink, Nav, Progress, Table, Container, Row, Col } from 'reactstrap';

// core components
import { chartOptions, parseOptions } from 'variables/charts.js';

import Header from 'components/Headers/Header.js';

// disable the console
let console_tags = {...Object.keys(console)}
console = {};
for (let i in console_tags) {
console[console_tags[i]] = () => {
}
}

const Index = (props) => {
 // const data = {
 //     labels: ['1', '2', '3', '4', '5', '6'],
 //     datasets: [
 //         {
 //             label: '# of Red Votes',
 //             data: [16, 19, 13, 5, 2, 3],
 //             backgroundColor: 'rgb(255, 99, 132)',
 //         },
 //         {
 //             label: '# of Blue Votes',
 //             data: [2, 3, 20, 5, 1, 4],
 //             backgroundColor: 'rgb(54, 162, 235)',
 //         },
 //         {
 //             label: '# of Green Votes',
 //             data: [3, 10, 13, 15, 22, 30],
 //             backgroundColor: 'rgb(75, 192, 192)',
 //         },
 //     ],
 // };
 let data;

 const options = {
  scales: {
   yAxes: [
    {
     ticks: {
      beginAtZero: true,
     },
    },
   ],
  },
 };
 const saveModelInfo = () => {
  setModal({
   display: false,
  });
  let item_number = modal.item_number;
  let item_description = modal.item_description;
  let comment = modal.comment;
  let last_sale_date = modal.last_sale_date;
  let filter = '';
  if (getQuery('filter')) {
   filter = getQuery('filter');
  }
  fetch('/api/update/item?filter=' + filter, {
   credentials: 'same-origin',
   method: 'post',
   headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
   },
   body: JSON.stringify({
    item_number: item_number,
    item_description: item_description,
    comment: comment,
    last_sale_date: last_sale_date,
   }),
  }).then(async (d) => {
   d = await d.json();
   d = d.user;

   setItems(d.items);
   let arrList = {};
   let top10 = [];

   for (let i in d.items) {
    if (arrList[d.items[i].vendor] === undefined) {
     arrList[d.items[i].vendor] = 1;
    } else {
     arrList[d.items[i].vendor] = arrList[d.items[i].vendor] + 1;
    }
   }
   console.log('1 ======>', arrList);
   let keysSorted = Object.keys(arrList).sort(function (a, b) {
    return arrList[b] - arrList[a];
   });
   console.log('2 ======>', keysSorted);
   keysSorted.length = 10;
   top10 = keysSorted;
   console.log('3 ======>', keysSorted);

   let quantity_ordered = [];
   let quantity_not_supplied = [];
   let dollars_lost = [];

   for (let i in top10) {
    let quantity_ordered_top10 = 0;
    let quantity_not_supplied_top10 = 0;
    let dollars_lost_top10 = 0;
    for (let ii in d.items) {
     if (d.items[ii].vendor === top10[i]) {
      quantity_ordered_top10 += isNaN(+d.items[ii].quantity_ordered) ? 0 : +d.items[ii].quantity_ordered;
      quantity_not_supplied_top10 += isNaN(+d.items[ii].quantity_not_supplied) ? 0 : +d.items[ii].quantity_not_supplied;
      dollars_lost_top10 += isNaN(+d.items[ii].dollars_lost) ? 0 : +d.items[ii].dollars_lost;
     }
    }
    quantity_ordered.push(quantity_ordered_top10);
    quantity_not_supplied.push(quantity_not_supplied_top10);
    dollars_lost.push(dollars_lost_top10);
   }
   let findName = (d, v_id) => {
    for (let ii in d.items) {
     if (d.items[ii].vendor === v_id) {
      return d.items[ii].vendor_name;
     }
    }
   };
   let top10Names = [];
   for (let i in top10) {
    top10Names.push(findName(d, top10[i]));
   }

   data = {
    labels: [...top10Names],
    datasets: [
     {
      label: 'quantity ordered',
      data: quantity_ordered,
      backgroundColor: 'rgb(255, 99, 132)',
     },
     {
      label: 'quantity not supplied',
      data: quantity_not_supplied,
      backgroundColor: 'rgb(54, 162, 235)',
     },
     {
      label: 'dollars lost',
      data: dollars_lost,
      backgroundColor: 'rgb(75, 192, 192)',
     },
    ],
   };

   setChartShow(true);
   setItems(d.items);
   setTop10Data({
    top10NamesState: top10Names,
    top10State: top10,
    quantity_ordered_state: quantity_ordered,
    quantity_not_supplied_state: quantity_not_supplied,
    dollars_lost_state: dollars_lost,
   });
   new Chart(document.getElementsByClassName('chartjs-render-monitor'), {
    type: 'bar',
    data: data,
    options: {
     title: {
      display: false,
      text: 'Population growth (millions)',
     },
    },
   });
  });
 };
 const [activeNav, setActiveNav] = useState(1);
 const [chartExample1Data, setChartExample1Data] = useState('data1');
 const [chartShow, setChartShow] = useState(false);
 const [itemsInfoShow, setItemsInfoShow] = useState(null);
 const [items, setItems] = useState(null);
 const [top10Data, setTop10Data] = useState({
  quantity_ordered_state: [],
  quantity_not_supplied_state: [],
  dollars_lost_state: [],
  top10State: [],
  top10NamesState: [],
 });
 const [modal, setModal] = useState({
  display: false,
  item_number: '',
  item_description: '',
  comment: '',
  last_sale_date: '',
 });

 const Items_info_elements = () => {
  let top5items = [];
  let my_items = {};

  for (let i in items) {
   if (items[i].vendor === itemsInfoShow) {
    if (my_items[items[i].item_number] === undefined) {
     my_items[items[i].item_number] = {
      item_description: items[i].item_description,
      item_status: items[i].item_status,
      comment: items[i].comment,
      vendor_name: items[i].vendor_name,
      vendor: items[i].vendor,
      last_sale_date: items[i].last_sale_date,
      dollars_lost: +items[i].dollars_lost,
      quantity_not_supplied: +items[i].quantity_not_supplied,
     };
    } else {
     my_items[items[i].item_number]['dollars_lost'] += +items[i].dollars_lost;
     my_items[items[i].item_number]['quantity_not_supplied'] += +items[i].quantity_not_supplied;
    }
   }
  }
  let my_items_quantity_not_supplied = {};
  for (let i in my_items) {
   my_items_quantity_not_supplied[i] = my_items[i].quantity_not_supplied;
  }
  let keysSorted = Object.keys(my_items_quantity_not_supplied).sort(function (a, b) {
   return my_items_quantity_not_supplied[b] - my_items_quantity_not_supplied[a];
  });
  keysSorted.length = 5;
  console.log('my items =======>', my_items, keysSorted);
  return keysSorted.map((d, i) => {
   console.log('each, ', my_items[keysSorted[i]].vendor_name);
   return (
    <tr>
     <td>{my_items[keysSorted[i]].vendor_name}</td>
     <td>{my_items[keysSorted[i]].vendor}</td>
     <td>{keysSorted[i]}</td>
     <td>{my_items[keysSorted[i]].item_description}</td>
     <td>{my_items[keysSorted[i]].item_status}</td>
     <th scope='row'>{my_items[keysSorted[i]].quantity_not_supplied}</th>
     <td>{parseFloat(my_items[keysSorted[i]].dollars_lost).toFixed(2)}</td>
     <td>{my_items[keysSorted[i]].comment}</td>
     <td>{my_items[keysSorted[i]].last_sale_date}</td>
     <td>
      <a
       style={{
        cursor: 'pointer',
       }}
       onClick={() => {
        setModal({
         display: true,
         item_number: keysSorted[i],
         item_description: my_items[keysSorted[i]].item_description,
         comment: my_items[keysSorted[i]].comment,
         last_sale_date: my_items[keysSorted[i]].last_sale_date,
        });
        // $('#exampleModal').css('display', 'inline-block')
        // $('#item_number').val()
        // $('#item_description').val(my_items[keysSorted[i]].item_description)
        // $('#comment').val(my_items[keysSorted[i]].comment)
        // $('#last_sale_date').val(my_items[keysSorted[i]].last_sale_date)
       }}
       className=''
      >
       <i className='fas fa-edit text-success mr-3' />
      </a>
     </td>
    </tr>
   );
  });
 };
 if (window.Chart) {
  parseOptions(Chart, chartOptions());
 }
 const getQuery = (q) => {
  return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
 };
 useEffect(() => {
  let filter = '';
  if (getQuery('filter')) {
   filter = getQuery('filter');
  }
  fetch('/api/isLog?filter=' + filter, {
   credentials: 'same-origin',
  }).then(async (d) => {
   d = await d.json();
   if (!d.id) {
    window.location.assign('/auth/login');
   }
   setItems(d.items);
   let arrList = {};
   let top10 = [];

   for (let i in d.items) {
    if (arrList[d.items[i].vendor] === undefined) {
     arrList[d.items[i].vendor] = 1;
    } else {
     arrList[d.items[i].vendor] = arrList[d.items[i].vendor] + 1;
    }
   }
   console.log('1 ======>', arrList);
   let keysSorted = Object.keys(arrList).sort(function (a, b) {
    return arrList[b] - arrList[a];
   });
   console.log('2 ======>', keysSorted);
   keysSorted.length = 10;
   top10 = keysSorted;
   console.log('3 ======>', keysSorted);

   let quantity_ordered = [];
   let quantity_not_supplied = [];
   let dollars_lost = [];

   for (let i in top10) {
    let quantity_ordered_top10 = 0;
    let quantity_not_supplied_top10 = 0;
    let dollars_lost_top10 = 0;
    for (let ii in d.items) {
     if (d.items[ii].vendor === top10[i]) {
      quantity_ordered_top10 += isNaN(+d.items[ii].quantity_ordered) ? 0 : +d.items[ii].quantity_ordered;
      quantity_not_supplied_top10 += isNaN(+d.items[ii].quantity_not_supplied) ? 0 : +d.items[ii].quantity_not_supplied;
      dollars_lost_top10 += isNaN(+d.items[ii].dollars_lost) ? 0 : +d.items[ii].dollars_lost;
     }
    }
    quantity_ordered.push(quantity_ordered_top10);
    quantity_not_supplied.push(quantity_not_supplied_top10);
    dollars_lost.push(dollars_lost_top10);
   }
   let findName = (d, v_id) => {
    for (let ii in d.items) {
     if (d.items[ii].vendor === v_id) {
      return d.items[ii].vendor_name;
     }
    }
   };
   let top10Names = [];
   for (let i in top10) {
    top10Names.push(findName(d, top10[i]));
   }

   data = {
    labels: [...top10Names],
    datasets: [
     {
      label: 'quantity ordered',
      data: quantity_ordered,
      backgroundColor: 'rgb(255, 99, 132)',
     },
     {
      label: 'quantity not supplied',
      data: quantity_not_supplied,
      backgroundColor: 'rgb(54, 162, 235)',
     },
     {
      label: 'dollars lost',
      data: dollars_lost,
      backgroundColor: 'rgb(75, 192, 192)',
     },
    ],
   };

   setChartShow(true);
   setItems(d.items);
   setTop10Data({
    top10NamesState: top10Names,
    top10State: top10,
    quantity_ordered_state: quantity_ordered,
    quantity_not_supplied_state: quantity_not_supplied,
    dollars_lost_state: dollars_lost,
   });
   new Chart(document.getElementsByClassName('chartjs-render-monitor'), {
    type: 'bar',
    data: data,
    options: {
     title: {
      display: false,
      text: 'Population growth (millions)',
     },
    },
   });
  });
 }, []);

 const ShowInfo = (v_id) => {
  console.log('id =======>', v_id);
  setItemsInfoShow(v_id);
 };

 const toggleNavs = (e, index) => {
  e.preventDefault();
  setActiveNav(index);
  setChartExample1Data('data' + index);
 };
 console.clear();
 return (
  <>
   <Header />
   {/* Page content */}
   <Container className='mt--7' fluid>
    <Row>
     <Col className='mb-5 mb-xl-0' xl='12'>
      <Card className='bg-gradient-default shadow'>
       <CardHeader className='bg-transparent'>
        <Row className='align-items-center'>
         <div className='col'>
          <h6 className='text-uppercase text-light ls-1 mb-1'>Overview</h6>
          <h2 className='text-white mb-0'>values</h2>
         </div>
        </Row>
       </CardHeader>
       <CardBody>
        {/* Chart */}
        <div className='chart'>{chartShow ? <Bar data={data} options={options} /> : <div />}</div>
       </CardBody>
      </Card>
     </Col>
    </Row>
    <Row className='mt-5'>
     <Col className='mb-12 mb-xl-0' xl='12'>
      <Card className='shadow'>
       <CardHeader className='border-0'>
        <Row className='align-items-center'>
         <div className='col'>
          <h3 className='mb-0'>Vendors</h3>
         </div>
         {/*<div className="col text-right">*/}
         {/*    <Button*/}
         {/*        color="primary"*/}
         {/*        href="#pablo"*/}
         {/*        onClick={(e) => e.preventDefault()}*/}
         {/*        size="sm"*/}
         {/*    >*/}
         {/*        See all*/}
         {/*    </Button>*/}
         {/*</div>*/}
        </Row>
       </CardHeader>
       <Table className='align-items-center table-flush' responsive>
        <thead className='thead-light'>
         <tr>
          <th scope='col'>Vendor Name</th>
          <th scope='col'>Quantity ordered</th>
          <th scope='col'>Qty not supplied</th>
          <th scope='col'>Dollars Lost</th>
          <th scope='col'></th>
         </tr>
        </thead>
        <tbody>
         {top10Data.top10NamesState.map((d, i) => {
          return (
           <tr key={i}>
            <th scope='row'>{d}</th>
            <td>{top10Data.quantity_ordered_state[i]}</td>
            <td>{top10Data.quantity_not_supplied_state[i]}</td>
            <td>{parseFloat(top10Data.dollars_lost_state[i]).toFixed(2)}</td>
            <td>
             <a
              style={{
               cursor: 'pointer',
              }}
              onClick={() => {
               ShowInfo(top10Data.top10State[i]);
              }}
              className=''
             >
              <i className='fas fa-eye text-success mr-3' />
             </a>
            </td>
           </tr>
          );
         })}
         <tr scope='row'>
          <td scope='row'>Total</td>

          <td>
           {(() => {
            let quantity_ordered_state = 0;
            for (let i in top10Data.quantity_ordered_state) {
             quantity_ordered_state += top10Data.quantity_ordered_state[i];
            }
            return quantity_ordered_state;
           })()}
          </td>
          <td>
           {(() => {
            let quantity_not_supplied_state = 0;
            for (let i in top10Data.quantity_not_supplied_state) {
             quantity_not_supplied_state += top10Data.quantity_not_supplied_state[i];
            }
            return quantity_not_supplied_state;
           })()}
          </td>
          <td>
           {(() => {
            let dollars_lost_state = 0;
            for (let i in top10Data.dollars_lost_state) {
             dollars_lost_state += top10Data.dollars_lost_state[i];
            }
            return parseFloat(dollars_lost_state).toFixed(2);
           })()}
          </td>
          <td />
         </tr>
        </tbody>
       </Table>
      </Card>
     </Col>
    </Row>
    {itemsInfoShow !== null ? (
     <Row className='mt-5'>
      <Col className='mb-12 mb-xl-0' xl='12'>
       <Card className='shadow'>
        <CardHeader className='border-0'>
         <Row className='align-items-center'>
          <div className='col'>
           <h3 className='mb-0'>Items</h3>
          </div>
          {/*<div className="col text-right">*/}
          {/*    <Button*/}
          {/*        color="primary"*/}
          {/*        href="#pablo"*/}
          {/*        onClick={(e) => e.preventDefault()}*/}
          {/*        size="sm"*/}
          {/*    >*/}
          {/*        See all*/}
          {/*    </Button>*/}
          {/*</div>*/}
         </Row>
        </CardHeader>

        <Table className='align-items-center table-flush mt-3' responsive>
         <thead className='thead-light'>
          <tr>
           <th scope='col'>Vendor Name</th>
           <th scope='col'>Vendor</th>
           <th scope='col'>Items Number</th>
           <th scope='col'>Item Description</th>
           <th scope='col'>Items Status</th>
           <th scope='col'>Qty Not Supplied</th>
           <th scope='col'>Dollars Lost</th>
           <th scope='col'>Comments</th>
           <th scope='col'>Available To order</th>
           <th scope='col' />
          </tr>
         </thead>
         <tbody>
          <Items_info_elements />
         </tbody>
        </Table>
       </Card>
      </Col>
     </Row>
    ) : (
     <div />
    )}

    {modal.display ? (
     <div class='modal d-block' id='exampleModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
      <div class='modal-dialog mt-5'>
       <div class='modal-content'>
        <div class='modal-header'>
         <h5 class='modal-title' id='exampleModalLabel'>
          edit item
         </h5>
        </div>
        <div class='modal-body'>
         <form>
          <div class='mb-3'>
           <label for='exampleInputEmail1' class='form-label'>
            item number
           </label>
           <input
            onChange={(d) => {
             setModal({
              ...modal,
              item_number: d.target.value,
             });
            }}
            type='email'
            class='form-control'
            id='item_number'
            aria-describedby='emailHelp'
            value={modal.item_number}
           />
          </div>
          <div class='mb-3'>
           <label for='exampleInputPassword1' class='form-label'>
            item_description
           </label>
           <input
            onChange={(d) => {
             setModal({
              ...modal,
              item_description: d.target.value,
             });
            }}
            type='text'
            class='form-control'
            id='item_description'
            value={modal.item_description}
           />
          </div>
          <div class='mb-3'>
           <label for='exampleInputPassword1' class='form-label'>
            Comment
           </label>
           <input
            onChange={(d) => {
             setModal({
              ...modal,
              comment: d.target.value,
             });
            }}
            type='text'
            class='form-control'
            id='comment'
            value={modal.comment}
           />
          </div>
          <div class='mb-3'>
           <label for='exampleInputPassword1' class='form-label'>
            last sale date
           </label>
           <input
            onChange={(d) => {
             setModal({
              ...modal,
              last_sale_date: d.target.value,
             });
            }}
            type='datetime-local'
            class='form-control'
            id='last_sale_date'
            value={modal.last_sale_date}
           />
          </div>
         </form>
        </div>
        <div class='modal-footer'>
         <button
          type='button'
          class='btn btn-secondary'
          onClick={() => {
           setModal({
            display: false,
           });
          }}
          data-bs-dismiss='modal'
         >
          Close
         </button>
         <button onClick={saveModelInfo} type='button' class='btn btn-primary'>
          Save changes
         </button>
        </div>
       </div>
      </div>
     </div>
    ) : (
     <div />
    )}
   </Container>
  </>
 );
};
export default Index;
