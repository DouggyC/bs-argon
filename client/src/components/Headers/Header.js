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
import $ from 'jquery';

// reactstrap components
import {
 Card,
 CardBody,
 CardTitle,
 Container,
 Row,
 Col,
 DropdownMenu /* added */,
 DropdownItem /* added */,
 Media /* added */,
 UncontrolledDropdown /* added */,
 DropdownToggle /* added */,
} from 'reactstrap';

// Create a number formatter
const formatter = new Intl.NumberFormat('en-US', {
 style: 'currency',
 currency: 'USD',
});

const Header = () => {
 const [activeUploadTheData, setActiveUploadTheData] = useState(false);
 const [activeChooseUser, setActiveChooseUser] = useState(false);
 const [users, setUsers] = useState([]);
 const [userTitle, setUserTitle] = useState('All');
 const [progress, setProgress] = useState({
  display: false,
  width: '0%',
 });

 const [Vendors, setVendors] = useState('0');
 const [Quantity_ordered, setQuantity_ordered] = useState('0');
 const [Not_Supplied, setNot_Supplied] = useState('0');
 const [Dollars_lost, setDollars_lost] = useState('0');

 const uploadFile = (event) => {
  const files = event.target.files;
  const formData = new FormData();
  formData.append('myFile', files[0]);
  $.ajax({
   // Your server script to process the upload
   url: '/api/save_as_excel',
   type: 'POST',

   // Form data
   data: formData,

   // You *must* include these options!
   cache: false,
   contentType: false,
   processData: false,
   success: function (d) {
    setProgress({
     display: false,
     width: '0%',
    });

    window.location.reload();
   },
   // Custom XMLHttpRequest
   xhr: function () {
    const myXhr = $.ajaxSettings.xhr();
    if (myXhr.upload) {
     // For handling the progress of the upload
     myXhr.upload.addEventListener(
      'progress',
      function (e) {
       if (e.lengthComputable) {
        setProgress({
         display: true,
         width: (e.loaded / e.total) * 100 + '%',
        });
       } else {
       }
      },
      false
     );
    }
    return myXhr;
   },
  });
 };
 const getQuery = (q) => {
  return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
 };
 useEffect(() => {
  let filter = '';
  if (getQuery('filter')) {
   filter = getQuery('filter');
  }
  fetch('/api/role?filter=' + filter, {
   credentials: 'same-origin',
  }).then(async (d) => {
   d = await d.json();
   let role = d.role;
   if (role && (role === 'admin' || role === 'superuser')) {
    setActiveUploadTheData(true);
    setActiveChooseUser(true);
    setUsers(d.users);

    console.log(d.items, d.items.length);
    let quantity_ordered = 0;
    let quantity_not_supplied = 0;
    let dollars_lost = 0;
    for (let i in d.items) {
     quantity_ordered += isNaN(+d.items[i].quantity_ordered) ? 0 : +d.items[i].quantity_ordered;
     quantity_not_supplied += isNaN(+d.items[i].quantity_not_supplied) ? 0 : +d.items[i].quantity_not_supplied;
     dollars_lost += isNaN(+d.items[i].dollars_lost) ? 0 : +d.items[i].dollars_lost;
    }

    setVendors(d.items.length);
    setQuantity_ordered(quantity_ordered);
    setNot_Supplied(quantity_not_supplied);
    setDollars_lost(dollars_lost);
    //Single user
   } else if (role && role === 'user') {
    setUsers(d.users);
    console.log(d.items, d.items.length);
    let quantity_ordered = 0;
    let quantity_not_supplied = 0;
    let dollars_lost = 0;
    for (let i in d.items) {
     quantity_ordered += isNaN(+d.items[i].quantity_ordered) ? 0 : +d.items[i].quantity_ordered;
     quantity_not_supplied += isNaN(+d.items[i].quantity_not_supplied) ? 0 : +d.items[i].quantity_not_supplied;
     dollars_lost += isNaN(+d.items[i].dollars_lost) ? 0 : +d.items[i].dollars_lost;
    }
    setVendors(d.items.length);
    setQuantity_ordered(quantity_ordered);
    setNot_Supplied(quantity_not_supplied);
    setDollars_lost(dollars_lost);
   }
  });
 }, []);
 const ShowUserInfo = (d) => {
  let n = d === 'All' ? null : d.f_name + ' ' + d.l_name;

  if (d === 'All') {
   setUserTitle('All');
  } else {
   setUserTitle(n);
  }
  if (n) {
   window.location.assign(`/admin/index?filter=${n}`);
  } else {
   window.location.assign(`/admin/index?filter=All`);
  }
 };

 return (
  <>
   <div className='header bg-gradient-info pb-8 pt-5 pt-md-8'>
    <Container fluid>
     <div className='header-body'>
      <Row>
       <Col>
        <input onChange={uploadFile} type='file' className={'d-none'} id={'file'} />
        {activeUploadTheData ? (
         <a
          href='#pablo'
          onClick={() => {
           document.querySelector('#file').click();
          }}
          className='btn btn-warning mb-4'
         >
          Upload data
         </a>
        ) : (
         <div />
        )}
        {progress.display ? (
         <div className='progress mb-4'>
          <div
           className='progress-bar   '
           role='progressbar'
           aria-valuenow='0'
           aria-valuemin='0'
           style={{
            width: progress.width,
           }}
           aria-valuemax='100'
          />
         </div>
        ) : (
         <div />
        )}
       </Col>
       {activeChooseUser ? (
        <Col
         style={{
          textAlign: 'right',
         }}
        >
         <UncontrolledDropdown>
          <DropdownToggle
           className='pr-0'
           style={{
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
           }}
          >
           <Media className='align-items-center'>
            <Media className='ml-2 d-block d-lg-block'>
             <span className='mb-0 text-sm font-weight-bold btn btn-warning' id={'user_title'}>
              {getQuery('filter') ? decodeURI(getQuery('filter')) : userTitle}
             </span>
            </Media>
           </Media>
          </DropdownToggle>
          <DropdownMenu className='dropdown-menu-arrow' right>
           <DropdownItem className='noti-title' header tag='div'>
            <h6 className='text-overflow m-0'>Choose special user!</h6>
           </DropdownItem>
           <DropdownItem href='#pablo' onClick={(e) => ShowUserInfo('All')}>
            <i className='ni ni-user-run' />
            <span>All</span>
           </DropdownItem>
           {users.map((d, i) => {
            return (
             <DropdownItem href='#pablo' onClick={(e) => ShowUserInfo(d)}>
              <i className='ni ni-user-run' />
              <span>{d.f_name + ' ' + d.l_name}</span>
             </DropdownItem>
            );
           })}
          </DropdownMenu>
         </UncontrolledDropdown>
        </Col>
       ) : (
        <Col />
       )}
      </Row>
      <Row>
       <Col className={'text-center d-flex justify-content-center'}>
        <div
         style={{
          width: 80,
          textAlign: 'center',
          height: 80,
          padding: 10,
          paddingTop: 26,
          border: '1px solid #000',
          margin: 10,
          borderRadius: '50%',
          position: 'relative',
          bottom: '65px',
          color: '#ffffff',
          backgroundColor: '#fb6340',
          borderColor: '#fb6340',
         }}
        >
         {isNaN(parseFloat((+Not_Supplied / +Quantity_ordered) * 100).toFixed(2))
          ? '0'
          : parseFloat((+Not_Supplied / +Quantity_ordered) * 100).toFixed(2)}
         %
        </div>
       </Col>
      </Row>
      <Row>
       <Col lg='6' xl='3'>
        <Card className='card-stats mb-4 mb-xl-0'>
         <CardBody>
          <Row>
           <div className='col'>
            <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
             Number of Vendors
            </CardTitle>
            <span id={'Vendors'} className='h2 font-weight-bold mb-0'>
             {Vendors}
            </span>
           </div>
          </Row>
         </CardBody>
        </Card>
       </Col>
       <Col lg='6' xl='3'>
        <Card className='card-stats mb-4 mb-xl-0'>
         <CardBody>
          <Row>
           <div className='col'>
            <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
             Qty ordered
            </CardTitle>
            <span id={'Quantity_ordered'} className='h2 font-weight-bold mb-0'>
             {Quantity_ordered}
            </span>
           </div>
          </Row>
         </CardBody>
        </Card>
       </Col>
       <Col lg='6' xl='3'>
        <Card className='card-stats mb-4 mb-xl-0'>
         <CardBody>
          <Row>
           <div className='col'>
            <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
             Qty not Supplied
            </CardTitle>
            <span className='h2 font-weight-bold mb-0' id={'Not_Supplied'}>
             {Not_Supplied}
            </span>
           </div>
          </Row>
         </CardBody>
        </Card>
       </Col>
       <Col lg='6' xl='3'>
        <Card className='card-stats mb-4 mb-xl-0'>
         <CardBody>
          <Row>
           <div className='col'>
            <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
             Dollars lost
            </CardTitle>
            <span id={'Dollars_lost'} className='h2 font-weight-bold mb-0'>
             {formatter.format(Dollars_lost)}
            </span>
           </div>
          </Row>
         </CardBody>
        </Card>
       </Col>
      </Row>
     </div>
    </Container>
   </div>
  </>
 );
};

export default Header;
