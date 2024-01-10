import { useState, useEffect, useRef } from 'react';

const usePagination = (initialPage, fetchFunction) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const listInnerRef = useRef();

  const fetchData = async (page) => {
    try {
      setLoading(true);
      const newData = await fetchFunction(page);

      if (newData.length > 0) {
        if (page !== currentPage) {
          setDataList((prevList) => [...prevList, ...newData]);
          setCurrentPage(page);
        } else setDataList(newData) ; setCurrentPage(page)
      } else {
        setHasMore(false);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const onScroll = () => {
    console.log(listInnerRef);
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && hasMore) {
        const nextPage = currentPage + 1;
        fetchData(nextPage);
      }
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  return {
    dataList,
    loading,
    hasMore,
    onScroll,
    listInnerRef,
  };
};

export default usePagination;
