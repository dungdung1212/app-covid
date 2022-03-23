import React from 'react'; 
import '../styles/loading.scss';
import { useSelector } from 'react-redux';
import { getLoader } from '../slices/loaderSlice';
const Loading = () => { 
    const loading = useSelector(getLoader) 
    function CheckLoading({isLoading}) { 
        if (isLoading) {
          return (
            <div className="animetion" >
                <div className='animetion_loading'>
                   <div className="show_loading"> 
                </div>  
              </div> 
           </div>
          );
        }else{
          return ''
        }
      }
    return ( 
         <CheckLoading isLoading = {loading} /> 
    );
};
 

export default Loading;