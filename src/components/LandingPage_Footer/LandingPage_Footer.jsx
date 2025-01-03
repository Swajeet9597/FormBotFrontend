import React from 'react';
import './LandingPage_Footer.css'

const LandingPage_Footer = () => {
  return (
    <div className='LandingPage_Footer' >
        <div className="c1">
            <div className="flogo">
                <img src="FooterSVG.png" alt="" />
                <span>FormBot</span>
            </div>
            <div className="madewith">
            <span>Made with ❤️ by</span>
            <span>@cuvette</span>
            </div>
        </div>
        <div className="c2">
            <div className="c2head">
                Product
            </div>

            <div className="products">
            <span className='productsspan' >Status <img src="SVGArrow.png" alt="" /></span>
            <span className='productsspan' >Documentation <img src="SVGArrow.png" alt="" /></span>
            <span className='productsspan' >Roadmap <img src="SVGArrow.png" alt="" /></span>
            <span className='productsspan' >Pricing <img src="SVGArrow.png" alt="" /></span>
            </div>
        </div>
        <div className="c3">
        <div className="c2head">
        Community
            </div>
        
            <div className="products">
            <span className='productsspan' >Discord <img src="SVGArrow.png" alt="" /></span>
            <span className='productsspan' >GitHub repository <img src="SVGArrow.png" alt="" /></span>
            <span className='productsspan' >Twitter <img src="SVGArrow.png" alt="" /></span>
            <span className='productsspan' >LinkedIn <img src="SVGArrow.png" alt="" /></span>
            <span className='productsspan' >OSS Friends <img src="SVGArrow.png" alt="" /></span>
            </div>
        </div>
        <div className="c4">
        <div className="c2head">
                Company
            </div>

            <div className="products">
            <span className='productsspan' >About <img src="SVGArrow.png" alt="" /></span>
            <span className='productsspan' >Contact <img src="SVGArrow.png" alt="" /></span>
            <span className='productsspan' >Terms of Service <img src="SVGArrow.png" alt="" /></span>
            <span className='productsspan' >Privacy Policy <img src="SVGArrow.png" alt="" /></span>
            </div>
        </div>
    </div>
  );
}

export default LandingPage_Footer;
