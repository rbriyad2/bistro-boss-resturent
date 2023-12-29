import React, { useState } from "react";
import orderImg from "../../assets/shop/order.jpg";
import Cover from "../../shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../hooks/useMenu";
import OrderTab from "./OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const {category} = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIntex, setTabIndex] = useState(initialIndex)
    const [menu] = useMenu()
    
    const dessert= menu.filter(item => item.category ==='dessert')
    const drinks= menu.filter(item => item.category ==='drinks')
    const pizza= menu.filter(item => item.category ==='pizza')
    const salad= menu.filter(item => item.category ==='salad')
    const soup= menu.filter(item => item.category ==='soup')
  return (
    <div className="text-center">
        <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>
      <Cover
        img={orderImg}
        title={"ORDER FOOD"}
        description={"Would you like to try a dish?"}
      ></Cover>
      <Tabs className="my-8" defaultIndex={tabIntex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessets</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
           <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={dessert}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
