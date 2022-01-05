import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../views/Home";
import AddProduct from "../views/AddProduct";
import Cart from "../views/Cart";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/add-product" component={AddProduct} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
};

export default Routes;
