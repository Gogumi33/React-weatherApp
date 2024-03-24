import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

let API_key = "d54ee034a5e3c16000fbc86b5f4e742e";


// 1. 앱이 실행되자마자 초기화면으로 현재날씨 위치기반으로 보임.
// 2. 날씨정보 - 도시지역, 섭씨 및 화씨 상태정보
// 3. 그 밑에는 5개의 버튼이 있다.(현재위치, 다른위치4개)
// 4. 도시버튼을 클릭할 때 마다 해당지역 날씨 나옴.
// 5. 1번째 버튼 현재위치를 누르면 다시 현 위치정보 나옴.
// +) 데이터 들고오는 동안은 로딩창같은 표시 뜨게하기

function App() {
  // weather정보를 넣어두기 위한 state 생성
  // App.js가 필요한 모~든 state들을 싹 다 쥐고있고, 필요할 때 props로써 함수를 자식들에게 보낸다.
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  // array 만드는 이유? 만약에 도시가 10000개라면... 그냥 코드 1줄로 끝내버리자.
  const cities = ['Seoul', 'Busan', 'Tokyo', 'New York'];

  const getCurrentLocation = () => {
    // 현재 위치 받아오기
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async(lat, lon) => { // fetch 쓰려면 async(비동기)처리 필수!
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      // console.log("data", data);

      setWeather(data);
      setLoading(false);
    }catch(err){
      setAPIError(err.message);
      setLoading(false);
    }
  }

  const getWeatherByCity = async() => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      //console.log("data당", data);

      setWeather(data);
      setLoading(false)
    }catch(err){
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  }

  const changeCity = (city) => {
    if(city === "current"){
      setCity('');
    }else{
      setCity(city);
    }
  }

  useEffect(()=>{
    if(city == ""){
      getCurrentLocation()
    }else{
      getWeatherByCity();
    }
  }, [city]) // []배열에 아무 값도 안주면 didMount처럼 발동을 한다.

  // useEffect(()=>{ // componentDidUpdate역할.. 계속 주시하고 있다가 city가 바뀌면 이 함수 호출.
  //   getWeatherByCity()
  // }, [city])

  return (
    <div>
      {loading ? (
        // 로딩창 UI
        <div className="container">
          <ClipLoader color="black" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} changeCity={changeCity} selectedCity={city} /> {/* 함수도 props로 보내줄 수 있다! */}
        </div>
      )}
    </div>
  );
}

export default App;
