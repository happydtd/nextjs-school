        3月19号：
        已回答。问题1. 我想把search input和button并排放在一起。但显示却是分为两行，如何处理？
        <Row>
            <Col span={6}></Col>
            <Col span={2}>
                <Button type="primary" icon={<PlusOutlined/>}>
                Add
                </Button></Col>
            <Col span={6}></Col>
            <Col span={4}><Input placeholder="Search by name"/><Button icon={<SearchOutlined />}/></Col>
            <Col span={6}></Col> 
        </Row>
        
        已回答。问题2. 我已经用加密后的密码，但是还是登录失败
        要发送的登录数据  {role: 'manager', email: 'test@gmail.com', password: '123456'}
        然后密码加密后变为 U2FsdGVkX1/A3tvxY5QtAX5raeW5eHVRUJTpzyJqbgk=
        还是说我登录失败。POST http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login 401 (Unauthorized)
        
        已回答。问题3. 我们这个网页是用单页面应用还是多页面应用啊？react里有router，nextjs里也有router还有antd里有链接，都有Link，但我搞不清楚改用哪个Link来做。
        
        已回答。问题4：很多页面背景是一样的。该用模板来写吧？目前我都是重复的写背景。
        
        已回答。问题5：antd布局<Row>中嵌套<Col>。我能不能<Col>中再嵌套<Col>? 
        <Row>
            <Col span={6}></Col>
            <Col span={12}>
                <Col span={12}></Col>
                <Col span={12}></Col>
            </Col>
            <Col span={6}></Col>
        </Row>
        
        已回答。问题6：table中的index number处理
        
        3月23号
        问题7：course是个数组，
                [{ courseId: 1
                id: 2
                name: "Anjali Hodkiewicz"
                },{
                courseId: 301
                id: 301
                name: "Efren Cronin"}]
                
            我想用reduce实现字符串拼串把course name都拿出来。一直报错说    
            {
              title: 'Selected Curriculum',
              key: 'selectedCurriculum',
              dataIndex: 'courses',
              render: courses =>{
                const getstring = (a,b) => {a.name + b.name;
                console.log('a',a.name)
                console.log('b',b.name)
                }
                var result = courses.reduce(getstring);
                return <>{result}</>
              }
            },
        问题8：demo网站没法登录
        问题9：使用useContext()可以代替redux？和redux比，有什么限制吗？
