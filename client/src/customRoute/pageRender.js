import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../component/NotFound';
import { useSelector } from 'react-redux';



const generatePage = (pageName)=>{
    const component = () => require(`../pages/${pageName}`).default

    try{
       return React.createElement(component()) 
    }catch(err){
        return <NotFound/>

    }
}

const PageRender = () => {
    const {page, id} = useParams()
    console.log(page);
    const { auth } = useSelector(state => state)

  

    let pageName = "";
        if(id){  
            pageName = `${page}/[id]`
        }else{
            pageName = `${page}`
        }
    

   return generatePage(pageName)
}
    export default PageRender;
