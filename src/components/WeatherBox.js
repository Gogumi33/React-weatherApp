import React from 'react'

// 웨더박스 컴포넌트 생성
const WeatherBox = ({weather}) => { // ES6 문법 - 내가 갖고오고 싶은 내용의 키만 언급하면 뽑아올 수 있다.
  // console.log("날씨?", weather);
  let currentTemp = weather?.main.temp.toFixed(1);
  let fahrenheit = currentTemp*9/5+32;

  return (
    <div className="weather-box">
      {/* 처음에는 null값이기 때문에 반드시 조건부를 하나 더 걸어줘서 걸러줘야함! */}
      {/* {weather?.name}도 가능하다. */}
      <div className="location">🪐 {weather && weather.name}</div>
      <h2>🌡️ {currentTemp}℃ / {fahrenheit.toFixed(1)}℉</h2>
      <h3>🌞 {weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox
