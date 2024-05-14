import React, { useState } from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import ListProduct from "../../product/ListProduct";

interface HomePageInterface {
    keywordSearchNavbar: string;
}

function HomePage({ keywordSearchNavbar }: HomePageInterface) {
    const [keyword, setKeyword] = useState('');

    return (
        <div>
            <Banner />
            <Carousel />
            <ListProduct keyword={keyword} setKeyword={setKeyword} keywordSearchNavbar={keywordSearchNavbar} />
        </div>
    );
}

export default HomePage;