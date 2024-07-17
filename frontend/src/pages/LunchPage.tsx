import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InformationCard from '../InformationCard';

interface Data {
  id: number;
  poster: string;
  category: string;
  time: string;
  description: string;
  image: string | null;
  imageUrl: string | null;
}

const Lunch: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
        }, 10000); // 10 seconds timeout

        const response = await axios.get<Data[]>('http://localhost:5022/api/Lunch', {
          cancelToken: source.token,
        });
        clearTimeout(timeout);

        console.log('API Response:', response.data); // Log the API response
        setData(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error('Request canceled due to timeout');
          setError('Request timed out');
        } else {
          console.error('Error fetching data:', error); // Log the error
          setError('Error fetching data');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <InformationCard
          key={item.id}
          id={item.id}
          poster={item.poster}
          category={item.category}
          time={item.time}
          description={item.description}
          image={item.image}
          imageUrl={item.imageUrl}
          showImage={!!item.imageUrl} // Only show image if imageUrl is not null
        />
      ))}
    </div>
  );
};

export default Lunch;
