import React from 'react'
import CommonLayout from '../../../components/CommonLayout/CommonLayout'
import { Steps, Button, message } from 'antd';
import CourseDetail from '../../../components/CourseDetail';
import CourseSchedule from '../../../components/CourseSchedule';

const { Step } = Steps;


export default function AddCourse() {
    const [current, setCurrent] = React.useState(0);



    const next = () => {
        setCurrent(current + 1);
      };
    
      const prev = () => {
        setCurrent(current - 1);
      };

      const steps = [
        {
          title: 'Course Detail',
          content: <CourseDetail next={next}/>,
        },
        {
          title: 'Course Schedule',
          content: <CourseSchedule/>,
        },
        {
          title: 'Last',
          content: 'Last-content',
        },
      ];
    
  return (
    <CommonLayout>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      {/* <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
    </CommonLayout>
    
  )
}
