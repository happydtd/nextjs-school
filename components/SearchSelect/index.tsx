import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { GetCourses } from '../../serverAPI';

import { Store } from '../../Utils/Store'


function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {

  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const token  = userInfo?.userInfo.token;

  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() =>  {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      const newOptions = fetchOptions(value, token).then((newOptions)=>{
        console.log("newOptions", newOptions.data.data.courses );
        const  o = newOptions.data.data.courses.map((c)=>{ 
          console.log("course", c);
          return {
          label: c.name,
          value: c.name,}
        });
        setOptions(o);
        setFetching(false);
      });


 
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
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

async function fetchCourseList(coursename, token) {
  return await GetCourses(token);

  // console.log('fetching coursename', coursename);
  // return fetch('https://randomuser.me/api/?results=5')
  //   .then((response) => response.json())
  //   .then((body) =>
  //     body.results.map((user) => ({
  //       label: `${user.name.first} ${user.name.last}`,
  //       value: user.login.username,
  //     })),
  //   );
}

const SearchSelect = () => {
  const [value, setValue] = React.useState([]);


  return (
    <DebounceSelect
    mode="multiple"
      value={value}
      placeholder="Select course"
      fetchOptions={fetchCourseList}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      style={{
        width: '100%',
      }}
    />
  );
};

export default SearchSelect;