import React, { useEffect, useState } from 'react'; 
import covidService from '../services/covid.service';
import '../styles/poupDetailCountry.scss'
import BarChart from './BarChart';
import {useDispatch } from 'react-redux';
import {setLoader} from '../slices/loaderSlice'
const PoupDetailCountry = ({countryCode,slug}) => { 
    const [country, setCountry] = useState({})
    const [listCountry, setListCountry] = useState() 
    const dispatch = useDispatch()
    useEffect(()=>{
        setCountry({})
        if(countryCode){
            dispatch(setLoader(true))
            covidService.getCountryDetailDataByCountryCode(countryCode)
            .then(res=>{ 
                setCountry(res) 
            }).catch(error=>{
                console.log(error)
                dispatch(setLoader(false)) 
            }) 
        }  
        if(slug){ 
            getListCountryBySlug(slug)
        }
    },[countryCode])
    const getListCountryBySlug = (slug)=>{
        dispatch(setLoader(true)) 
        covidService.getListCountryBySlug(slug)
        .then(res=>{  
            setListCountry(res) 
            dispatch(setLoader(false)) 
        }).catch(error=>{
            console.log(error)
            dispatch(setLoader(false)) 
        })
    }
    return (
        <div className='main__poup'>
            <div className='main__detail'> 
                <label htmlFor="checkShowPopup" className="popupCloseButton">&times;</label>
                <h3>Detailed information about country {country.name}</h3>
                <div className='content__detail'>
                    <div className='content__detail__item'>
                        <div className='content__detail__item__label'>Name: </div>
                        <div className='content__detail__item__content'>{country.name} </div>
                    </div>
                    <div className='content__detail__item'>
                        <div className='content__detail__item__label'>flag image: </div>
                        <div className='content__detail__item__content'>
                            <img src={(`${country.flag}`)} width="100" height="50" />
                        </div>
                    </div>
                    <div className='content__detail__item'>
                        <div className='content__detail__item__label'>population: </div>
                        <div className='content__detail__item__content'>{country.population} </div>
                    </div>
                    <div className='content__detail__item'>
                        <div className='content__detail__item__label'>capital: </div>
                        <div className='content__detail__item__content'>{country.capital} </div>
                    </div>
                    <div className='content__detail__item'>
                        <div className='content__detail__item__label'>region: </div>
                        <div className='content__detail__item__content'>{country.region} </div>
                    </div>
                    <div className='content__detail__item'>
                        <div className='content__detail__item__label'>subregion: </div>
                        <div className='content__detail__item__content'>{country.subregion}</div>
                    </div> 
                </div>
                <div className='content__chart'>
                   {listCountry ? <BarChart chartData={listCountry}/> : ""} 
                </div>
            </div> 
        </div>
    );
};
 

export default PoupDetailCountry;