import React, {useContext, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { GetCourses } from '../../serverAPI';

import { Store } from '../../Utils/Store'


function DebounceSelect({ fetchOptions, debounceTimeout = 800, courseSearchType, ...props }) {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  //const token  = userInfo?.userInfo.token;
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [token, setToken] = React.useState([]);

  useEffect(()=>{
    if (userInfo)
      setToken(userInfo?.userInfo.token);
  },[])

  
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() =>  {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value, courseSearchType, token).then((result)=>{
        const  options = result;
        setOptions(options);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout, courseSearchType]);

  useEffect(()=>{
    setOptions([]);
  }, [courseSearchType])
  
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
} // Usage of DebounceSelect

async function fetchCourseList(value, courseSearchType, token) {
  let response;

  switch(courseSearchType){
    case "code":
      response = await GetCourses(token, null , null, null, null, value );
      break;
    case "name":
      response = await GetCourses(token, null , null, value);
      break;
    case "category":
      response = await GetCourses(token, null , null, null , value);
      break;
  }
  
  
  if (response?.data?.code !='200')
  {
    throw new Error("Can't get course data");
  }
  else{
    return response.data.data.courses?.map((course)=>{
      return {
        label: `${course.name}-${course.teacherName}-${course.uid}`,
        value: course.uid,
      }
    })
  }
}

const SearchSelect = ({courseSearchType, courseSearchValue, setCourseSearchValue, ...props}) => {
  // const [value, setValue] = React.useState([]);
  // console.log("select value", value);

  return (
    <DebounceSelect
      mode="multiple"
      value={courseSearchValue}
      placeholder="Select course"
      fetchOptions={fetchCourseList}
      onChange={(newValue) => {
          setCourseSearchValue(newValue);
      }}
      courseSearchType={courseSearchType}
      {...props}
    />
  );
};

export default SearchSelect;