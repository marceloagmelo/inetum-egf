import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getListOfCategories } from "../../functions/Service";


export default function Home(configuration) {
    const [categories, setCategories] = useState([])
    const [loadedImgs, setLoadedImgs] = useState([])

    const FolderIcon = (idx) => {
        return (
            <div id={'category'+(idx+1)}>
                <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0a8ab1" stopOpacity="1" />
                        <stop offset="100%" stopColor="#56d0f5" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <path d="M4 2C3.2043 2 2.4413 2.3161 1.8787 2.8787 1.3161 3.4413 1 4.2043 1 5V19C1 19.7957 1.3161 20.5587 1.8787 21.1213 2.4413 21.6839 3.2043 22 4 22H20C20.7957 22 21.5587 21.6839 22.1213 21.1213 22.6839 20.5587 23 19.7957 23 19V8C23 7.2043 22.6839 6.4413 22.1213 5.8787 21.5587 5.3161 20.7957 5 20 5H11.5352L10.1289 2.8906C9.758 2.3342 9.1335 2 8.4648 2H4Z" fill="url(#grad1)"/>
                </svg>
            </div>
        )
    }
    
    const remoteImg = "http://localhost:8080/documents/d/guest/category";    

    /*useEffect( () => {
        checkFile(remoteImg).then(
            console.log("File exists")
        )
    }, [])*/

    /*const CategoryIconExists = async (categoryId) => {
        let catImg = FolderIcon();
        const ret = checkFile(remoteImg+categoryId)
        console.log("Return=", ret)
            //catImg = remoteImg+categoryId;
        console.log("CatImg", catImg)
        return (
            <img src={catImg}/>
        ) 
    }*/

    const CategoryIconExists = async (categoryId) => {
        console.log("URL=", remoteImg + categoryId)
        fetch(remoteImg + categoryId, { method: "HEAD" }).then((response) => {
            let val = {exists: false};
            if(response.status === 200 || response.status === 304) {                
                val = {exists: true};                
            }
            console.log("Exists=", val)
            return val;
        })
    };

    const handleCategoryClick = () => {

    }

    const getCategories = () => {
        getListOfCategories(configuration).then(result => {
            console.log(JSON.stringify(result));
            const size = Object.keys(result).length;
             result && size > 0 ? setCategories(result.data) : console.log(result);
            /* if(result && size > 0) {
               //averigurar se resulta.data.nome já existe
            }  */

            // console.log(result.data.Results);
            // console.log(configuration);
        }).catch(err =>  {
            console.log(err);
        });
    }

    useEffect(() => {
        getCategories();
    }, []);

    const ImageDontExists = (ev) => {
        console.log("Image=", ev.target);
    }

    useEffect(() => {
        //let imgsFound = [];
        categories.forEach(category => {
            fetch(remoteImg + category.id, { method: "HEAD" }).then((response) => {
                if(response.status === 200 || response.status === 304)
                    document.getElementById("category"+category.id).innerHTML = "<img width='56' src='"+ remoteImg + category.id + "'/>"                
            });
        })
        //console.log("Imgs found=", imgsFound)
        //setLoadedImgs(imgsFound);
    }, [categories]);

    return (
        <div className="content">
            <div className="page-title">
                <h2 className="mb-5">Selecione a categoria dos documentos</h2>
            </div>
            <div className="row">
                {categories.map((category, index) => (
                    <div className="col-sm-3" key={category.id}>
                        <div className="card">
                            <div className="card-body">                                
                                <div className="d-flex justify-content-center">
                                    <Link className="btn btn-lg" role="button" to="/lista" onClick={handleCategoryClick}>
                                        {/*category.nome*/}
                                        {FolderIcon(index)}
                                        {/*<img }onError={ImageDontExists} src={remoteImg + category.id}/>*/}
                                    </Link>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <h5 className="card-title">{category.nome}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}