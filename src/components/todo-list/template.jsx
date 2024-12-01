import React, { useState, useEffect, useCallback } from 'react';

const fetchMoreData = (start, limit) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newData = Array.from({ length: limit }, (_, i) => `Item ${start + i + 1}`);
      resolve(newData);
    }, 1000);
  });
};

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1 && !loading && hasMore) {
      loadMoreData(data.length, 5);
    }
  }, [loading, hasMore, data]);

  useEffect(() => {
    loadMoreData(0, 5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // limit -> visibleCount
  const loadMoreData = async (start, limit) => {
    setLoading(true);
    const newData = await fetchMoreData(start, limit);
    setData(prevData => [...prevData, ...newData]);
    setLoading(false);
    if (newData.length < limit) {
      setHasMore(false);
    }
  };

  return (
    <div>
      <h1>Infinite Scroll Example</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index} style={styles.item}>
            {item}
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more data</p>}
    </div>
  );
};

const styles = {
  item: {
    height: '100px',
    background: 'linear-gradient(gray, white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
  },
};

export default InfiniteScroll;
