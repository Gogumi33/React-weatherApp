import React from 'react'
import { Button } from 'react-bootstrap';

// 웨더버튼 컴포넌트
const WeatherButton = ({cities, changeCity, selectedCity}) => {
  // console.log("잘 나와?", cities); // 잘 나오는 것 확인 완료.

  return (
    <div>
      <Button
        variant={`${selectedCity === '' ? "warning" : "info"}`}
        className='m-1' onClick={() => changeCity("current")}>Current Location
      </Button>
      {/* Array함수 */}
      {/* Array함수 주의점 => 후에 {}이 아니라 ()라는 것!!! */}
      {cities.map((city) => (
        <Button
          variant={`${selectedCity === city ? "warning" : "info"}`}
          className='m-1' onClick={() => changeCity(city)}>{city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton
