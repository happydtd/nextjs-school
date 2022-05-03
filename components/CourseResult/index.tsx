import { Result, Button } from 'antd';
import Link from 'next/link'

export const CourseResult = (props) => {
    const {next, resetStep} = props;

    const goCourseHandler = ()=>{

    }

    const buyCourseHandler = ()=>{
        resetStep();
    }

    return (
        <Result
          status="success"
          title="Successfully Create Course!"
          extra={[
            <Button type="primary" key="console" onClick={goCourseHandler}>
              Go Course
            </Button>,
            <Button key="buy" onClick={buyCourseHandler}>Buy Again</Button>,
          ]}
        />
      );
} 
