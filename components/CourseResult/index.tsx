import { Result, Button } from 'antd';
import { useRouter } from 'next/router';

export const CourseResult = (props) => {
    const {next, resetStep} = props;
    const router = useRouter();

    const goCourseHandler = ()=>{
      router.push('/course');
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
