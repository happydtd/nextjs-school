import { Result, Button } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import {useAppSelector, useAppDispatch} from '../../Store/configureStore'
// import { Store } from '../../Utils/Store';

export const CourseResult = (props) => {
    const {next, resetStep} = props;
    const router = useRouter();
    // const { state, dispatch } = useContext(Store);
    // const { userInfo} = state;
    const userInfo = useAppSelector(state  => state.auth.UserInfo); 
    const [ role, setRole] = useState(null);
    const [ hrefByRole, setHrefByRole] = useState(null);

    useEffect(()=>{
      setRole(userInfo.role);
      setHrefByRole(`/dashboard/${userInfo.role}`);
    },[userInfo])

    const goCourseHandler = ()=>{
      router.push(`${hrefByRole}/courses`);
    }

    const buyCourseHandler = ()=>{
        resetStep();
    }

    return (
        <>
        {
          role && <Result
            status="success"
            title="Successfully Create Course!"
            extra={[
              <Button type="primary" key="console" onClick={goCourseHandler}>
                Go Course
              </Button>,
              <Button key="buy" onClick={buyCourseHandler}>Buy Again</Button>,
            ]}
          />
        }
        </>

      );
} 
