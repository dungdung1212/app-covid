import React, { useEffect, useState } from 'react';
import covidService from '../../services/covid.service';
import '../../styles/covid.scss';
import _ from 'lodash'
import PoupDetailCountry from '../../components/PoupDetailCountry'
import {useDispatch } from 'react-redux';
import { setLoader } from '../../slices/loaderSlice';
const Covid = () => { 
    const dispatch = useDispatch();
    const [listCountries, setListCountries] = useState([])
    const [countryType, setCountryType] = useState()
    const [slug, setSlug] = useState() 
    const $ = document.querySelector.bind(document);
    const rootUl = $('.list__countries-covid')  
    function handleShowDetail(e){  
        const tagShowDetail = e.target.closest('.showDetailCountry') 
        if(tagShowDetail){ 
            const cupValue = tagShowDetail.dataset.value.split("+") 
            setSlug(cupValue[1]) 
            setCountryType(cupValue[0]) 
        } 
    } 
    useEffect(()=>{
        dispatch(setLoader(true))
        covidService.getListOfCountriesCovid().then(res=>{
        const listOrder =  _.orderBy(res.Countries, ['TotalConfirmed', 'TotalDeaths','TotalRecovered'], ['desc','desc','asc'])
            setListCountries(listOrder)  
            dispatch(setLoader(false))
        })
    },[])   
    useEffect(()=>{
        if(rootUl){
            rootUl.onclick = handleShowDetail  
        }
    })
    return (
        <div className='main'>
            <input type='checkbox' hidden id="checkShowPopup" className='check__input'/>
            <div className='list__countries'>
               <h2>The list of countries which are most affected by Covid-19</h2>
                <ul className='list__countries-covid' >
                    {
                        listCountries?.map(el=>(
                            <li className='li__countries-covid' key={el.ID}  >
                                <div className='li__countries-covid__name'>
                                {el.Country}
                                </div>
                                <div className='li__countries-covid__btn'>
                                    <label htmlFor='checkShowPopup' className='showDetailCountry' data-value={`${el.CountryCode}+${el.Slug}`}>Show detail</label>
                                </div>
                            </li>
                        ))
                    } 
                </ul>
            </div> 
            <div className='show__popup'>
              {countryType? <PoupDetailCountry countryCode={countryType} slug = {slug}/> :""}
            </div>
        </div>
    );
}; 
export default Covid;