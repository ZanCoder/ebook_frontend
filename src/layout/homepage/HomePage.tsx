import React, { useState } from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import ListProduct from "../../product/ListProduct";
import { useParams } from "react-router-dom";

interface HomePageInterface {
    keywordSearchNavbar: string;
}

function HomePage({ keywordSearchNavbar }: HomePageInterface) {
    const [keyword, setKeyword] = useState('');

    const {id} = useParams();
    let idNumber = 0;

    try {
        idNumber = parseInt(id + '');
    } catch (error) {
        idNumber = 0;
        console.error('Error' + error);
    }

    if (Number.isNaN(idNumber)) {
        idNumber = 0;
    }

    return (
        <div>
            <Banner />
            <Carousel />
            <ListProduct keyword={keyword} setKeyword={setKeyword} keywordSearchNavbar={keywordSearchNavbar} id={idNumber} />
        </div>
    );
}

export default HomePage;