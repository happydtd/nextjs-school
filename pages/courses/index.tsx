import React, { useEffect, useContext, useState, useRef } from 'react';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import Link from 'next/link'
import { Store } from '../../Utils/Store'
import { GetCourses} from '../../serverAPI';
import CourseCard from '../../components/CourseCard';


export default function Course() {

  const test=['col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6' , 'col-6']
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { userInfo} = state;
  const { token } = userInfo.userInfo;
  const [ pageSize, setPageSize ] = useState(15);
  const [ courses, setCourses ] = useState(null);

    // set default value
    const [scrollTop, setScrollTop] = useState(document.body.scrollTop);
     // create element ref
  const innerRef = useRef(null);

  async function callAPI(){ 
    try{
        const result  = await GetCourses(token, '', 1, pageSize);
        console.log(result);
        setCourses(result.data.data.courses);
    }
    catch(error){
      console.log("error", error)
    }
  };

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
    callAPI();
  },[pageSize])

  useEffect(() => {
    const div = innerRef.current;
    // subscribe event
    div.addEventListener("scroll", handleOnScroll);
    return () => {
      // unsubscribe event
      div.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  const handleOnScroll = (e) => {
    // NOTE: This is for the sake of demonstration purpose only.
    // Doing this will greatly affect performance.
    setScrollTop(e.target.scrollTop);
    console.log(e.target.scrollTop);
  }

  return (
    <CommonLayout>
        <div ref={innerRef} style={{overflow: 'scroll',height: 1000}}>
            <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              { courses?.map((course, index)=>{
                console.log(course);
                return (
                  <Col key={index} xs={12} sm={12} md={8} lg={6} ><CourseCard course={course}/></Col>
                )
              })

              }
            </Row>
        </div>
    </CommonLayout>

    // <>
    //   {`ScrollTop: ${scrollTop}`}
    //   <div
    //     // style={{
    //     //   // overflow: 'auto',
    //     //   // width: 500,
    //     //   // height: 500,
    //     //   border: '1px solid black',
    //     // }}
        
    //   >
    //     <div style={{ height: 150, width: 150 , overflow: 'scroll', border: 5 , borderColor: 'orange'}} ref={innerRef}>
    //       Scroll Me
    //           <p>Far out in the uncharted backwaters of the unfashionable end
    //       of the western spiral arm of the Galaxy lies a small unregarded
    //       yellow sun. Orbiting this at a distance of roughly ninety-two million
    //       miles is an utterly insignificant little blue green planet whose
    //       ape-descended life forms are so amazingly primitive that they still
    //       think digital watches are a pretty neat idea.</p>
    //     </div>
    //   </div>
    // </>
  )
}

