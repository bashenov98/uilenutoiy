

import './App.css';
import './index.css';
import './fonts.css';

import { useState } from 'react';
import axios from 'axios';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio';

import OyuLeft from 'assets/oyu-left.svg';
import OyuRight from 'assets/oyu-right.svg';
import OyuMid from 'assets/oyu-mid.svg'
import MapImg from 'assets/map.svg';
import OyuTopImg from 'assets/oyu-top-half.svg';
import OyuBtmImg from 'assets/oyu-bottom-half.svg';
import CoupleImg from 'assets/IMG_6978.jpeg';

function App() {

  const radioBtnProp = {
    color: "white",
    '&.Mui-checked': {
      color: "white",
    }
  };

  const [selectedValue, setSelectedValue] = useState({});
  const [inputText, setInputText] = useState('');
  const [mobile, setMobile] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    answer: ''
  });

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeText = (event) => {
    setInputText(event.target.value);
  };

  const handleChangeMobile = (event) => {
    setMobile(event.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formEle = document.querySelector("form");
    const formDatab = new FormData(formEle);

    const token = '7101981316:AAGrugzrt7e25mIkbzl_ee8ZO8INAFsrst0';
    const text = (`${inputText}: ${selectedValue} `);

    setFormData({ Name: inputText, Mobile: '87719052133', Answer: selectedValue })

    const response = await axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=-4241267745&text=${text}`, {
    });
    const response2 = await axios.post('https://script.google.com/macros/s/AKfycbxQd66HA8lMwLTC-unavVzbzhynHSf7hBL0IUJ_jvAXaViC3kw_yVhyzTPi1RdvX0Uqrg/exec', formDatab, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    )

    if (response.status === 200 && response2.status === 200) {
      setFormSuccess(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
    console.log(response)
    console.log(response2)
  };

  return (
    <div className="App">

      <img src={OyuLeft} className='oyuLeft' alt='oyu-ornek' />
      <img src={OyuRight} className='oyuRight' alt='oyu-ornek' />
      <div className='topPage'>
        <h2 style={{ marginTop: "110px" }}>Тойға шақыру</h2>
        <h3 className='mainSubtitle'>DANIYAR & MAKPAL</h3>

        <div className='heartBorder'>
          <img src={CoupleImg} className='heartImg' alt='Daniyar and Makpal img' />
        </div>


        <h2>Құрметті қонақтар</h2>
        <h3>Сіздерді тойымыздың қадірлі қонағы болуға шақырамыз! </h3>

        <img src={OyuMid} className='oyuMid' alt='oyu-ornek' />

        <h2>Той иелері:</h2>
        <h3>Жамантай-Гүлсұлу</h3>

        <h2 style={{ marginTop: "40px" }}>Той салтанаты:</h2>
        <h3>Күні: 10/08/2024 </h3>
        <h3 style={{ marginBottom: "40px" }}>Басталуы: 16:00</h3>

        <h2>Мекенжайымыз:</h2>
        <h3>Алматы қаласы,</h3>
        <h3>Ремизовка, Арайлы көшесі, 16</h3>
        <h3 >“Eleven Hotel&Hall”,</h3>
        <h3 style={{ marginBottom: "40px" }}>Ballroom</h3>
        
        <a href="https://2gis.kz/almaty/geo/70000001028581820" target="_blank" rel="noopener noreferrer">
          <img src={MapImg} className='mapImg' alt='map-icon' />
        </a>
        <img src={OyuTopImg} className='oyuTopImg' alt='oyu-ornek' />

      </div>
      <div className='btmPage'>

        {formSuccess ?
          <div className='formSuccess'>
            <img src={OyuBtmImg} className='oyuBtmImg' alt='oyu-ornek' style={{ paddingBottom: "200px" }} />
            Жауап сақталды!
          </div> :
          <div>
            <img src={OyuBtmImg} className='oyuBtmImg' alt='oyu-ornek' />
            <form onSubmit={(e) => onSubmit(e)}>
              <h2 className='formHeader'>Тойға келетініңізді растауыңызды сұраймыз</h2>
              <h3 className='formSubHeader'>Жұбайыңызбен келетін болсаңыз, екі есімді де көрсетіңіз</h3>
              <div className='inputField'>
                <input
                  placeholder="Аты-жөніңіз"
                  value={inputText}
                  onChange={handleChangeText}
                  name='Name'
                />
              </div>

              <div className='inputField'>
                <input
                  placeholder="Телефон нөміріңіз"
                  value={mobile}
                  onChange={handleChangeMobile}
                  name='Mobile'
                />
              </div>

              <RadioGroup aria-labelledby="radio-group" name="Answer" value={selectedValue} onChange={handleChange}>
                <FormControlLabel value="Әрине, келемін" control={<Radio sx={radioBtnProp} />} label="Әрине, келемін" />
                <FormControlLabel value="Әлі белгісіз" control={<Radio sx={radioBtnProp} />} label="Әлі белгісіз" />
                <FormControlLabel value="Өкінішке орай, келе алмаймын" control={<Radio sx={radioBtnProp} />} label="Өкінішке орай, келе алмаймын" />
              </RadioGroup>

              <div className='buttonContainer'>
                {loading ?
                  <div className='loader' /> :
                  <button type="submit" variant="contained">Жіберу</button>
                }
              </div>
            </form>
          </div>}

      </div>

    </div>
  );
}

export default App;
