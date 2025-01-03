import React from 'react';
import './SuccessFull.css'
import success from '../../assets/success.png'

const SuccessFull = () => {
  return (
    <div className='SuccessPage' >
    <div  className="su">

     <span> Form is Submitted Successfully </span> 
      <img src={success} width={100} alt=""/>

    </div>
    </div>
  );
}


export default SuccessFull;
