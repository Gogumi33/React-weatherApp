import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';

let API_key = "d54ee034a5e3c16000fbc86b5f4e742e";


// 1. 앱이 실행되자마자 초기화면으로 현재날씨 위치기반으로 보임.
// 2. 날씨정보 - 도시지역, 섭씨 및 화씨 상태정보
// 3. 그 밑에는 5개의 버튼이 있다.(현재위치, 다른위치4개)
// 4. 도시버튼을 클릭할 때 마다 해당지역 날씨 나옴.
// 5. 1번째 버튼 현재위치를 누르면 다시 현 위치정보 나옴.
// +) 데이터 들고오는 동안은 로딩창같은 표시 뜨게하기

function App() {
  // weather정보를 넣어두기 위한 state 생성
  const [weather, setWeather] = useState(null);
  // array 만드는 이유? 만약에 도시가 10000개라면... 그냥 코드 1줄로 끝내버리자.
  const cities = ['Seoul', 'Busan', 'Dokyo', 'New York'];

  const getCurrentLocation = () => {
    // 현재 위치 받아오기
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async(lat, lon) => { // fetch 쓰려면 async(비동기)처리 필수!
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log("data", data);

    setWeather(data);
  }

  useEffect(()=>{
    getCurrentLocation()
  }, []) // []배열에 아무 값도 안주면 didMount처럼 발동을 한다.

  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} />
      </div>
    </div>
  );
}

export default App;
