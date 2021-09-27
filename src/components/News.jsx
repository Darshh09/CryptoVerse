import React, {useState} from 'react'
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../Services/cryptoNewsApi';
import { useGetCryptosQuery } from '../Services/cryptoApi';

const { Text, Title } = Typography;
const  { Option } = Select;

const demoimageUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({simplified}) => {
    
    const [newsCat, setnewsCat] = useState('CryptoCurrency')
    
    const {data : cryptoNews } = useGetCryptoNewsQuery({ newsCat, count : simplified? 6 : 12})

    const { data } = useGetCryptosQuery(100);


    if(!cryptoNews?.value) return 'Loading....';


    return (
        <>
          <Row gutter = {[24,24]}>
            {!simplified ? <Col span = {24}>
                <Select showSearch placeholder = "Select A Crypto" optionFilterProp = "children" onChange = {(e) => setnewsCat(e)} 
                filterOption = {(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                className = 'select-news' >
                   <Option value = "Cryptocurrency">Cryptocurrency</Option>
                   {data?.data?.coins.map((coin) => <Option value = {coin.name}> {coin.name} </Option> )}    
                </Select>             
            </Col> : null}
            {cryptoNews.value.map((news,i) => (
                <Col xs = {24} sm = {12} lg = {8} key = {i}>
                    <Card hoverable className = "news-card">
                        <a href = {news.url} target = '_blank' rel = "noreferrer" >
                            <div className = "news-image-container">
                                <Title className = "news-title" level = {4}>{news.name}</Title>
                                <img style = {{maxWidth : '200px', maxHeight : '100px'}} src = {news?.image?.thumbnail?.contentUrl || demoimageUrl}/>
                            </div>
                            <p>
                                {news.description > 100 ? `${news.description.substring(0,100)}....` : news.description}
                            </p>
                            <div className = "provider-container">
                                <div>
                                    <Avatar src = {news.provider[0]?.image?.thumbnail?.contentUrl || demoimageUrl} alt ="news" />
                                    <Text className = "provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
          </Row>
        </>
    )
}

export default News
