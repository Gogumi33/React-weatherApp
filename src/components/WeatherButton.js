import React from 'react'
import { Button } from 'react-bootstrap';

// 웨더버튼 컴포넌트
const WeatherButton = ({cities}) => {
  console.log("잘 나와?", cities); // 잘 나오는 것 확인 완료.
  return (
    <div>
      <Button className='m-1' variant="info">Current Location</Button>
      {/* Array함수 */}
      {/* Array함수 주의점 => 후에 {}이 아니라 ()라는 것!!! */}
      {cities.map((item) => (
        <Button className='m-1' variant="info">{item}</Button>
      ))}
    </div>
  );
};

export default WeatherButton
