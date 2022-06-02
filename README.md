        3月19号：
        1. 我想把search input和button并排放在一起。但显示却是分为两行，如何处理？
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
        
        2. 我已经用加密后的密码，但是还是登录失败
        要发送的登录数据  {role: 'manager', email: 'test@gmail.com', password: '123456'}
        然后密码加密后变为 U2FsdGVkX1/A3tvxY5QtAX5raeW5eHVRUJTpzyJqbgk=
        还是说我登录失败。POST http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login 401 (Unauthorized)
        
        3. 我们这个网页是用单页面应用还是多页面应用啊？react里有router，nextjs里也有router还有antd里有链接，都有Link，但我搞不清楚改用哪个Link来做。
        
        4：很多页面背景是一样的。该用模板来写吧？目前我都是重复的写背景。
        
        5：antd布局<Row>中嵌套<Col>。我能不能<Col>中再嵌套<Col>? 
        <Row>
            <Col span={6}></Col>
            <Col span={12}>
                <Col span={12}></Col>
                <Col span={12}></Col>
            </Col>
            <Col span={6}></Col>
        </Row>
        
        6：table中的index number处理
        
        3月23号
        7：course是个数组，
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
        8：demo网站没法登录
        9：使用useContext()可以代替redux？和redux比，有什么限制吗？
        
        3月24号
        8：setPage()和setPageSize()后直接调用callAPI()不能反映新的page和pageSize。
          useEffect(()=>{
            callAPI();
          },[])
        <Row>
            <Col span={6}></Col>
            <Col span={12}>
                <Table columns={columns} dataSource={students} pagination={{
                  pageSize: pageSize,
                  current:page,
                  total: total,
                  onChange:(page, pageSize)=>{
                    setPage(page);
                    setPageSize(pageSize);
                    callAPI();
                  }
                }}/>
            </Col>
            <Col span={6}></Col>
        </Row>
        
        这样才能work
         useEffect(()=>{
            callAPI();
          },[page，pageSize])
        <Row>
            <Col span={6}></Col>
            <Col span={12}>
                <Table columns={columns} dataSource={students} pagination={{
                  pageSize: pageSize,
                  current:page,
                  total: total,
                  onChange:(page, pageSize)=>{
                    setPage(page);
                    setPageSize(pageSize);
                  }
                }}/>
            </Col>
            <Col span={6}></Col>
        </Row>
        
        9：组件的css该写在哪里？我把组件的css和tsx写在同一个文件夹内得到error。
        ./components/CommonLayout/CommonLayout.css
        Global CSS cannot be imported from files other than your Custom <App>. Due to the Global nature of stylesheets, and to avoid conflicts, Please move all first-party global CSS imports to pages/_app.js. Or convert the import to Component-Level CSS (CSS Modules).
        Read more: https://nextjs.org/docs/messages/css-global
        Location: components\CommonLayout\CommonLayout.tsx
        
        4月1日
        10. 我想用setstate()更新弹出框的student type，但是一直不能立刻更新
          if (props.student){
                form.setFieldsValue({
                  name:props.student.name,
                  area: props.student.country,
                  email: props.student.email,
                });

                console.log('stype1',stype)
                console.log('type1',props.student.studentType.name)
                if (stype !== props.student.studentType.name)
                {
                  setStype(props.student.studentType.name);
                  console.log('stype2',stype)
                }
          }

          useEffect(()=>{

          },[stype])
          
          4月6日
          11. 接着上次的问题我修改后work了，value={1}的意思是传入数值1，不是对象1吧？
          <Option value={1}>tester</Option>
          <Option value={2}>developer</Option>
          
          12. 写了一个student detail的组件，然后把student的信息作为参数传入。我发现student.name之类值类型的属性可以直接拿到值，但是student.type之类对象类型的值必须加判断是非          为空后才能取值，不然会报错，比如：
          【studentid】.tsx中
              <Row>
                <Col span={6}><Text strong>Member Period:</Text></Col>
                <Col span={18}>{student.memberStartAt} - {student.memberEndAt}</Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>Type:</Text></Col>
                <Col span={18}>{student.type?.name}</Col>
              </Row>
           13： 排版
           我希望 Name label和Name 值垂直间距能够拉开。Row中设置gutter={[16, 16]}只对其中的子元素Col有效， 但对子元素Col中的Row无效
           <Row>
            <Col span={12}>
              <Row justify="center"><Text strong>Name1</Text></Row>
              <Row justify="center">{student.name}</Row>
            </Col>
            <Col span={12}>
              <Row justify="center"><Text strong>Age</Text></Row>
              <Row justify="center">{student.age}</Row>
            </Col>
          </Row>
          14: 排序时降序正确，升序错误
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (name, record) =>{
                return <Link href={'/student/' + record.id}>
                  <a>{name}</a>
                </Link>
              },
              sorter:(r1, r2)=>{
                return r1.name > r2.name
              },

            },
           4月13日
           15: 父组件调用子组件的方法，目前我在GenericTable组件中使用了useImperativeHandle（）去暴露方法让父组件调用，还有其他办法吗？
           16: menu导航和breadcrumb如何互相协调？
                  menu导航组件的onclick方法参数中可以拿到keypath list，我把keypath list存入state，在render时拿state中的keypath list去生成breadcrumb。
                  反过来breadcrumbitem的onclick方法中拿到当前path， 然后在keypath list中找到当前path的index然后生成一个新的path list，再存回state， 但render时一直报错
           17：上一个问题的报错说path.map()不是一个function，但是我已经用了path?.map()已经检查了path是否为null为什么还会报错？
           
           4月20日
           17： Teacher Edit form中slider不能正常显示 （space问题）
           18： Phone的国家码和电话号码antd有自动合并处理方法吗？（没有）
           
           4月23日
           19： course card中图片的尺寸是固定的，如何根据网页大小自动调整
           20： course页面如何实现滚轮下滚自动装载更多课程
           21： get student等api要求地址栏传参，我发现body传参也能用
           
           4月27日
           22： [courseid].tsx中我想检查course是否为null然后再显示组件，可是一直报错
           {course!==null && 。。。。。}这写法错在哪里？
           
           4月30日
           23：course detail 页面纵向对齐问题
           24：下拉框默认值设置问题
           25：下拉框可否得到type对象，而不是typeid
           26：上传course数据是可否用course对象传递，而不是一个个值
           27：走到下一个步骤时显示“next-dev.js?3515:32 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.”
           28：page/add-course目录下，我想为AddCourse增加一个css，该怎么添加? 以前component中用XXX.module.css。
           29：add-course目录下，如果默认文件名不是index.tsx而是AddCourse.tsx。用http://localhost:3000/course/add-course会调用走到[courseId].tsx。如何访问AddCourse.tsx？
           
           5月4日
           30：addcourse页面重新刷新丢失style问题
           31：检查用户是否登录，这样写对吗？我可以不在useEffect中跳转页面而在检查userinfo为空后直接跳转吗？
                  useEffect(()=>{
                    if (!userInfo) {
                      router.push('/signin');
                    }
                  },[])

                  if (!userInfo) return (<></>)
          32：const  {token}  = userInfo?.userInfo; 这种写法如果userInfo为null会报错
                 只能用这种写法吗？ const  token  = userInfo?.userInfo.token;
           
           5月11日
           33: Token保存的安全性。我现在把token放在cookie中，下次不登录也可以访问保护数据，同时也很容易被窃取。实际项目该如何防护？
           34：Error的处理。目前我直接把error写入console。实际项目中如何处理？
           
          5月14日
            35: <Link href="/teachers">Teacher List</Link>和<Link href="teachers">Teacher List</Link>不同？
            下面的写法，第一次点击打开addcourse页面再点击打开allcourse页面然后再点击addcourse页面会去不同的地址？
            <Menu.Item key="Add Course">
              <Link href="courses/add-course">Add Courses</Link>
            </Menu.Item>
            第一次地址：http://localhost:3000/dashboard/manager/courses/add-course
            第二次地址：http://localhost:3000/dashboard/manager/courses/courses/add-course
            
            36：刷新时state内数据时有时无的问题
            我通过state中存储的用户信息拿到role，再拼接对应访问地址
            用teacher账户登录后光标放在overview menu， 显示链接地址为http://localhost:3000/dashboard/teacher/overview
            按刷新按钮，再把光标放在overview menu，显示链接地址为http://localhost:3000/dashboard/undefined/overview
            
            37 server side render()项目中使用？
           
           5月18日
            38 get /api/courses by userid 500 错误
            
           5月21日
            39 chart imcrement数据去哪里拿？ 
                   没找到chart可以很好显示course schedule table的
           
           5月25日
           40 Header登出用什么控件做，排版如何写
           41 跨域设置
           
           5月29日
           42 熟悉redux toolkit吗？
           
           6月1日
           43， antd首页制作
           我想做个首页，下载和配置了antd模板，https://github.com/happydtd/Antd-landing.git，可以显示首页页面。
           但是antd要用到react-app-rewired来启动，和nextjs不同。我在网上搜索很久也没找到如何把首页整合到nextjs中。不知道老师有没有什么建议
           
           6月4日 下面这段代码，我用useEffect更新count，useEffec发生在render之后，按理我不应该立刻看到这次更新后的count
                import React from 'react';
                import { useState, useEffect, useRef } from "react";

                export function App(props) {
                  const [inputValue, setInputValue] = useState("");
                  const count = useRef(0);

                  useEffect(() => {
                    console.log('useEffect count.current',count.current)
                    count.current = count.current + 1;
                  });

                console.log('here')
                console.log('count.current',count.current)
                  return (
                    <>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <h1>Render Count: {count.current}</h1>
                    </>
                  );
                }

                // Log to console
                console.log('Hello console')
           

