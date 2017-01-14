import React, { PropTypes } from 'react';
import s from './footer.css';
import history from '../../core/history'

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={`${s["footer"]}`}>
      <div className={`${s["footer-content"]}`}>
        <div className={`${s["footer-column"]}`}>
          <p className={`${s["footer-logo"]}`}>Impresssive.co</p>
          <p className={`${s["footer-text"]}`}>Made with love by Download Horizons.</p>
        </div>
        <div className={`${s["footer-column"]}`}>
          <p className={`${s["footer-title"]}`}>Product</p>
          <a style={{cursor:"pointer"}} onClick={()=>{history.push('/')}} className={`${s["footer-link"]}`}>Create Now</a>
          <a style={{cursor:"pointer"}} onClick={()=>{history.push('/enjoy?aid=Hk7Vf_e8x')}} className={`${s["footer-link"]}`}>Inspiration</a>
          <a style={{cursor:"pointer"}} onClick={()=>{history.push('/enjoy?aid=r1GrR5eIl')}} className={`${s["footer-link"]}`}>FAQ</a>
        </div>
        <div className={`${s["footer-column"]}`}>
          <p className={`${s["footer-title"]}`}>Contact</p>
          <a target="_blank" href="mailto:downloadhorizons@protonmail.com?Subject=Got%20some%20ideas?" className={`${s["footer-link"]}`}>Suggestions?</a>
          <a target="_blank" href="http://downloadhorizons.com/" className={`${s["footer-link"]}`}>Meet our creator</a>
        </div>
        <div className={`${s["footer-column"]}`}>
          <p className={`${s["footer-title"]}`}>Behind the Scenes</p>
          <a target="_blank" href="https://medium.com/@davidsun_93561" className={`${s["footer-link"]}`}>Blog</a>
        </div>
        <div className={`${s["footer-column"]}`}>
          <p style={{opacity:0.2}} className={`${s["footer-text"]}`}>The best preparation for tomorrow is doing your best today.</p>
        </div>
      </div>
    </div>
  }
}

Footer.defaultProps = {
}

export default Footer
