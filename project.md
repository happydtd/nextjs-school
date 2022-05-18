1. Edit Coures
1.1 课程搜索下拉框内选择code （course uid）|Name （course name）|Category （course type）
1.2 课程列表框内输入搜索条件
1.3 调用Get /api/courses 加入相关参数获取课程列表
1.4 课程列表框显示  课程名-老师名-课程Uid
1.5 根据选择的课程显示Course detail和Course schedule
1.6 在course detail页面，点击update course，保存修改后数据
1.7 在course schedule页面，点击submit，保存修改后数据

2.Overview
2.1 布局分为上中下， 上部显示TOTAL STUDENTS, TOTAL TEACHERS和TOTAL COURSES。中部显示student， teacher和course的increment，还有Languages。下部显示Course Schedule
2.2 上部的TOTAL STUDENTS, TOTAL TEACHERS和TOTAL COURSES使用Card