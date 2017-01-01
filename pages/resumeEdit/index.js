import React, { PropTypes } from 'react';
import g from '../global.css';
import s from './resumeEdit.css';
import { connect } from 'react-redux';
import Nav from '../../components/nav/landingNav'
import Profile from '../../components/blocksEdit/profile'
import Quote from '../../components/blocksEdit/quote'
import Gallery from '../../components/blocksEdit/gallery'
import Description from '../../components/blocksEdit/description'
import Links from '../../components/blocksEdit/links'
import Icons from '../../components/blocksEdit/icons'
import Cta from '../../components/blocksEdit/cta'
import LineBreak from '../../components/blocksEdit/lineBreak'
import Chat from '../../components/blocksEdit/chat'
import IconRow from '../../components/blocksEdit/iconRow'
import Project from '../../components/blocksEdit/project'

import {updateAppState} from '../../core/actions/ui'
import {APP_STATE} from '../../core/constants'

class ResumeEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articleState:{}
    }
    this.onChange = this.onChange.bind(this)
  }
  static propTypes = {
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  onChange(index,changes) {

  }

  render() {
    const {state,props,onChange} = this;
    console.log("why?")
    return (
      <div>
        <Nav title="impresssive.co" linksR={["Sign out","Back"]} linksL={["Save","Delete"]}/>
        <Profile
          onChange={onChange}
          profileSrc="https://scontent.fsnc1-1.fna.fbcdn.net/v/t1.0-9/12243285_935156856558785_6064119464102764675_n.jpg?oh=bb2385615c425130a9e0dc75c85c873f&oe=58DECFF9"
          name="David Sun"
          description="Just a cool friend"
        />
        <Quote
          onChange={onChange}
          quote="Hey"
          author="Me!"
        />
        <Gallery
          title="Gallery"
          onChange={onChange}
          images={[
            "https://images.unsplash.com/16/unsplash_5263605581e32_1.JPG",
            "http://3.bp.blogspot.com/-xQ50cuaGanI/VSyfX1Bn2WI/AAAAAAABJDk/I8hDcQ_bvSw/s1600/unsplash-guyonwall.jpg",
            "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
            "http://666a658c624a3c03a6b2-25cda059d975d2f318c03e90bcf17c40.r92.cf1.rackcdn.com/unsplash_5243a2eb2bc02_1.JPG"
          ]}
          description="These are some cool photos"
        />
        <Description
          onChange={onChange}
          title="About Me"
          description="Cool Text up there"
          texts={[
            "Bacon ipsum dolor amet salami short ribs kevin, prosciutto pork loin swine ball tip alcatra. Boudin flank chicken leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta, short ribs chicken. Jerky spare ribs picanha, tongue filet mignon jowl turducken ground round. Strip steak shankle ham hock meatloaf corned beef pork belly ham pig. Alcatra leberkas sirloin cupim t-bone turducken pork beef short ribs turkey brisket. Porchetta short ribs shankle brisket corned beef turkey, sirloin chicken beef ribs doner prosciutto. Leberkas biltong jowl corned beef turkey beef ground round kielbasa sirloin ham hock salami bresaola pancetta. Tail corned beef pork chop,",
            "Shank sirloin ham hock shankle ground round. Sirloin beef flank pork loin meatloaf tail chicken pig prosciutto fatback rump. Sirloin brisket frankfurter beef t-bone biltong ham rump flank meatball tenderloin salami kevin hamburger ball tip. Kielbasa chuck picanha t-bone porchetta corned beef fatback. Chicken pork loin corned beef rump. Drumstick spare ribs turkey, short ribs jowl bacon meatball rump kielbasa pork belly. Pancetta boudin spare ribs brisket, shoulder doner short loin kielbasa jowl picanha porchetta. Short loin sirloin tri-tip fatback, doner swine bacon. Pork salami pork belly filet mignon tenderloin, swine t-bone beef ribs boudin venison sirloin pig. Bacon porchetta brisket spare ribs biltong short ribs sirloin short loin. Tongue beef ribs rump kielbasa picanha alcatra, pork loin landjaeger brisket jowl corned beef turducken ham hock t-bone.",
            "Short loin sirloin tri-tip fatback, doner swine bacon. Pork salami pork belly filet mignon tenderloin, swine t-bone beef ribs boudin venison sirloin pig. Bacon porchetta brisket spare ribs biltong short ribs sirloin short loin. Tongue beef ribs rump kielbasa picanha alcatra, pork loin landjaeger brisket jowl corned beef turducken ham hock t-bone. Salami pork leberkas jowl brisket ham hock pork loin turkey pork chop turducken biltong sirloin. Turkey tri-tip meatloaf strip steak swine pancetta, frankfurter shank tail flank. Doner ham kevin chuck, spare ribs landjaeger sausage biltong pork loin beef ribs. Corned beef salami beef ribs doner. Sirloin ribeye pig drumstick landjaeger corned beef prosciutto meatball turducken andouille. Rump tail flank boudin pork chop biltong salami capicola kielbasa pork belly cupim. Does your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!"
          ]}
        />
        <Chat
          onChange={onChange}
          title="What my bud says"
          description="Cool Text up there"
          chat={[
            {
              text:"Hey how's life?",
              direction:"right"
            },
            {
              text:"Good!",
              direction:"left"
            },
            {
              text:"How about you?",
              direction:"left"
            },
            {
              text:"Mehhhhh",
              direction:"right"
            }
          ]}
        />
        <Links
          onChange={onChange}
          title="Past Employers"
          description="Cool Text up there"
          links={[
            [{
              title:"This is cool!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              title:"Do You Like it?",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              title:"Whaaaaat!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            }],
            [{
              title:"This is cool!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              title:"Do You Like it?",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              title:"Whaaaaat!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            }],
            [{
              title:"This is cool!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              title:"Do You Like it?",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              title:"Whaaaaat!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            }]
          ]}
        />
        <Icons
          onChange={onChange}
          title="Features"
          description="Cool Teddxt up there"
          icons={[
            [{
              icon:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fcity-16.svg?alt=media&token=a6ccf75f-db82-4e8c-993b-5755da1cfd96",
              title:"This is cool!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              icon:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fclothes-18.svg?alt=media&token=d06f5edd-9304-4bca-b137-94d4c1362717",
              title:"Do You Like it?",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              icon:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fcommon-05.svg?alt=media&token=ccdcd0b6-3578-43d4-b77b-fba1b6b99582",
              title:"Whaaaaat!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            }],
            [{
              icon:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fdocuments-11.svg?alt=media&token=27a71f3d-4c26-4b20-afd6-697c8e5647d8",
              title:"This is cool!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              icon:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Ffinance-21.svg?alt=media&token=d0e366e7-c458-4254-9790-24b351d36ca2",
              title:"Do You Like it?",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              icon:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Ffood-01.svg?alt=media&token=8cf2b07b-eb6a-4a2b-a5dc-1424bd4fd1b1",
              title:"Whaaaaat!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            }],
            [{
              icon:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fhome-02.svg?alt=media&token=45d8e060-12f0-4c35-b7e0-d412ef7ef1ed",
              title:"This is cool!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              icon:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fmail-02.svg?alt=media&token=eade45e4-50b5-4782-b5dd-fe1f043dda59",
              title:"Do You Like it?",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            },
            {
              icon:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fmail-18.svg?alt=media&token=2685d6a7-1da5-460f-aec6-2a5b0bd7ebdb",
              title:"Whaaaaat!",
              text:"leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta,",
              link:"google.com"
            }]
          ]}
        />
        <Project
          onChange={onChange}
          title="Shaken Chat"
          projects={[{
            src:"https://images.unsplash.com/16/unsplash_5263605581e32_1.JPG",
            title:"Good stuff goes here",
            text:"Bacon ipsum dolor amet salami short ribs kevin, prosciutto pork loin swine ball tip alcatra. Boudin flank chicken leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta, short ribs chicken. Jerky spare ribs picanha, tongue filet mignon jowl turducken ground round. Strip steak shankle ham hock meatloaf corned beef pork belly ham pig. Alcatra leberkas sirloin cupim t-bone turducken pork beef short ribs turkey brisket. Porchetta short ribs shankle brisket corned beef turkey, sirloin chicken beef ribs doner prosciutto. Leberkas biltong jowl corned beef turkey beef ground round kielbasa sirloin ham hock salami bresaola pancetta. Tail corned beef pork chop,"
          },
          {
            src:"https://images.unsplash.com/16/unsplash_5263605581e32_1.JPG",
            title:"Good stuff goes here",
            text:"Bacon ipsum dolor amet salami short ribs kevin, prosciutto pork loin swine ball tip alcatra. Boudin flank chicken leberkas sausage alcatra. Alcatra tongue ham hock prosciutto pancetta, short ribs chicken. Jerky spare ribs picanha, tongue filet mignon jowl turducken ground round. Strip steak shankle ham hock meatloaf corned beef pork belly ham pig. Alcatra leberkas sirloin cupim t-bone turducken pork beef short ribs turkey brisket. Porchetta short ribs shankle brisket corned beef turkey, sirloin chicken beef ribs doner prosciutto. Leberkas biltong jowl corned beef turkey beef ground round kielbasa sirloin ham hock salami bresaola pancetta. Tail corned beef pork chop,"
          }]}
          description="Cool Text up there"
        />
        <LineBreak onChange={onChange}/>
        <Cta
          onChange={onChange}
          title="Grab now"
          description="Cool Text up there"
          button="Lets go!"
          buttonType="skeleton"
        />
        <IconRow
          onChange={onChange}
          title="Social Media"
          description="Cool Text up there"
          icons={[{
              src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fcity-16.svg?alt=media&token=a6ccf75f-db82-4e8c-993b-5755da1cfd96",
              link:"google.com"
            },
            {
              src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fclothes-18.svg?alt=media&token=d06f5edd-9304-4bca-b137-94d4c1362717",
              link:"google.com"
            },
            {
              src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fcommon-05.svg?alt=media&token=ccdcd0b6-3578-43d4-b77b-fba1b6b99582",
              link:"google.com"
            },
            {
              src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fdocuments-11.svg?alt=media&token=27a71f3d-4c26-4b20-afd6-697c8e5647d8",
              link:"google.com"
            },
            {
              src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Ffinance-21.svg?alt=media&token=d0e366e7-c458-4254-9790-24b351d36ca2",
              link:"google.com"
            },
            {
              src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Ffood-01.svg?alt=media&token=8cf2b07b-eb6a-4a2b-a5dc-1424bd4fd1b1",
              link:"google.com"
            },
            {
              src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fhome-02.svg?alt=media&token=45d8e060-12f0-4c35-b7e0-d412ef7ef1ed",
              link:"google.com"
            },
            {
              src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fmail-02.svg?alt=media&token=eade45e4-50b5-4782-b5dd-fe1f043dda59",
              link:"google.com"
            },
            {
              src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fmail-18.svg?alt=media&token=2685d6a7-1da5-460f-aec6-2a5b0bd7ebdb",
              link:"google.com"
            }]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const ResumeEditRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResumeEdit)

export default ResumeEditRedux;
