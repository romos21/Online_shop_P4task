import React, {useState} from 'react';
import shortId from 'short-id';
import '../styles/components/ProductsListPage.css';
import {Link} from "react-router-dom";


function ProductsListPage() {
    const [countToBasket, setCountToBasket] = useState(0);
    const products = [
        {
            title: 'Macbook',
            description: 'Macbook Air 13 2018',
            imgLink: 'https://m.sila.by/img/catalog2015/ntpk/tovar98263_2.jpg',
            cost: 1480,
            count: 4,
        },
        {
            title: 'HP',
            description: 'Ordinateur portable HP pavillon gaming fournisseur',
            imgLink: 'https://ae01.alicdn.com/kf/U3bb4a48551e7412897a8be6b310cf1f3m/Ordinateur-portable-HP-pavillon-gaming-fournisseur-7du73ea-15-6-Core-i5-9300-H-8-GB-HDD.jpg',
            cost: 1120,
            count: 11,
        },
        {
            title: 'Sony',
            description: 'Sony VAIO F VPCF13UFX/B 16.4" Notebook VPCF13UFX/B B&H',
            imgLink: 'https://www.bhphotovideo.com/images/images2000x2000/Sony_VPCF13UFX_B_VAIO_F_VPCF13UFX_B_16_4_750916.jpg',
            cost: 1200,
            count: 0,
        },
        {
            title: 'Lenovo',
            description: 'Ноутбук Lenovo Legion Y520-15IKBN 80WK00CBRA купить',
            imgLink: 'https://24shop.by/images/cache/d47/24shop.by-noutbuk-lenovo-legion-y520-15ikbn-80wk00cbra-764214.jpeg',
            cost: 1800,
            count: 24,
        },
        {
            title: 'Asus',
            description: 'Ноутбук ASUS TUF Gaming FX505GM-ES304 24 Гб',
            imgLink: 'https://fk.by/uploads/images/cache/2019/03/07/noutbuk-asus-tuf-gaming-fx505gm-es304-1100x500.jpeg',
            cost: 1310,
            count: 11,
        },
    ];

    products.forEach(product => product.id = shortId.generate());

    function countToBasketSubtraction() {
        if (countToBasket === 0) {
            return countToBasket;
        }
        setCountToBasket(countToBasket - 1);
    }

    return (
        <>
            {products.map(product => {
                return (
                    <section key={product.id} className='prod-show-sec'>
                        <img alt={product.title} src={product.imgLink} className='product-show-img'/>
                        <section className='product-show-info'>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <p>{product.cost}</p>
                            <p>{product.count === 0 ? 'Нет в наличии' : product.count}</p>
                            <button onClick={countToBasketSubtraction} className='change-count-btn' type='submit'>
                                Add to basket
                            </button>
                        </section>
                    </section>
                );
            })}
        </>
    );
}

export default ProductsListPage;
