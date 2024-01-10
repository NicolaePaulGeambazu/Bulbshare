import React from 'react';
import usePagination from './hooks/usePagination';
import Card from './Components/Card/Card';

const containerStyle = {
  margin: 'auto',
  width: '400px',
  height: '100vh',
  overflowY: 'auto',
};

const fetchData = async (page) => {
  console.log(page, 'page');
  const response = await fetch(`http://localhost:4000/products?page=${page}`);
  return await response.json();
};

const App: React.FC = () => {
  const { dataList, loading, onScroll, listInnerRef } = usePagination(1, fetchData);

  return (
    <div style={containerStyle} onScroll={onScroll} ref={listInnerRef}>
      <h1>Your Feed Component</h1>
      {dataList.map((feedItem) => (
        <Card
          key={feedItem.id}
          brand={feedItem.brand?.name || ''}
          brandlogo={feedItem.brand?.logo || ''}
          joinLink={''}
          bannerImage={feedItem.ad_1_image}
          feedTitle={feedItem.feed_title}
        />
      ))}
      {loading && <div>Loading more...</div>}
    </div>
  );
};

export default App;
