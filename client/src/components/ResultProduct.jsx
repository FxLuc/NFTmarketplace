import React, { Component } from "react";
import ItemManagerContract from "../contracts/ItemManager.json";
import ItemContract from "../contracts/Item.json";
import getWeb3 from "../getWeb3";
import ItemRow from "./ItemRow";

class ResultProduct extends Component {
  state = {
    loaded: false,
    cost: 0,
    itemName: "item_01",
    unit: "Wei",
    itemList: [],
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.itemManager = await new this.web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[this.networkId] &&
          ItemManagerContract.networks[this.networkId].address
      );

      this.Item = await new this.web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[this.networkId] &&
          ItemContract.networks[this.networkId].address
      );

      this.listenToPaymentEvent();

      // load items to table
      this.itemIndex = await this.itemManager.methods.getItemIndex().call();
      for (let i = this.itemIndex - 1; i >= 0; i--) {
        this.setState({
          itemList: [
            ...this.state.itemList,
            await this.itemManager.methods.items(i).call(),
          ],
        });
      }

      this.setState({ loaded: true });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleBuy = async (itemAddress, itemPrice) => {
    const currentAccount = await this.web3.eth.getAccounts();
    this.web3.eth.sendTransaction({
      from: currentAccount[0],
      to: itemAddress,
      value: itemPrice,
    });
  };

  handleDelivery = async (itemAddress) => {
    const currentAccount = await this.web3.eth.getAccounts();
    const functionSignatureIndex =
      await this.web3.eth.abi.encodeFunctionSignature("index()");
    const itemIndex = await this.web3.eth.call({
      from: currentAccount[0],
      to: itemAddress,
      data: functionSignatureIndex,
    });
    await this.itemManager.methods
      .triggerDelivery(this.web3.utils.hexToNumber(itemIndex))
      .send({ from: currentAccount[0] });
  };

  listenToPaymentEvent = () => {
    this.itemManager.events.SupplyChainStep().on("data", async (event) => {
      const itemObject = await this.itemManager.methods
        .items(event.returnValues._itemIndex)
        .call();
      const { itemList } = this.state;
      itemList[
        await itemList.indexOf(
          itemList.find((item) => item._item === itemObject._item)
        )
      ] = itemObject;
      this.setState({ itemList });
    });
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="container">
        <h1 className="py-3">
          <strong>SUPPLY CHAIN</strong>
        </h1>

        <div className="ItemTable py-5">
          <h4>Item manager</h4>
          <div className="py-3 ">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Identifier</th>
                    <th>Price (wei)</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.itemList.map((itemList) => (
                    <ItemRow
                      data={itemList}
                      key={itemList._item}
                      buy={this.handleBuy}
                      delivery={this.handleDelivery}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultProduct;
