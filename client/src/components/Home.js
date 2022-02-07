import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Samsung RAM 4GB SDRAM DDR3 1333MHz (4GB, 2RX8, PC3-10600S-09-10-F2, M471B5273CH0-CH9)',
            specifications: 'Brand: Samsung\nManufacturer: Samsung Electronics (SEC)\nCountry of manufacture: China\nBuild (year/week): 2011/13\nType: DDR3 SDRAM\nBus Speed: 10600S (1333MHz)\nTotal Capacity: 4GB\nMemory Timing: CL=9, tRCD=9, tRP=9\nFeatures: 204pin, SODIMM, Unbuffer Non-ECC DDR3 SDRAM\nProduction process technology: 40nm\nData bits: x64\nInternal Module banks: 8\nRanks: 2\nData chip composition: 256M x 8 * 16 pcs\nComponent revision: 2Gb, C-die\nPackage: 78 ball FBGA\nVDD voltage: 1.5V\nHeight: 30mm\nItem Weight: 45.359 grams\nOperating Case Temperature Range: 0°C ~ 85°C',
            description: 'Perfect for every computing environment\nDeveloped in 2005, Samsung\'s industry-first DDR3 is the most used system solution, from PCs and home appliances, to automotive and medical devices.',
            externalUrl: 'https://semiconductor.samsung.com/dram/ddr/ddr3/',
            picture: undefined,
        }
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({ [name]: value })
    }

    getFileInfo = event => {
        this.setState({ picture: event.target.files[0] })
    }

    handleSubmit = async () => {
        // const { picture, name, specifications, description, externalUrl, itemList } = this.state

        // // add item to blockchain
        // await this.itemManager.methods.createItem(itemName, value).send({ from: this.accounts[0] })
        // const itemIndex = await this.itemManager.methods.currentItemIndex().call()
        // const newItem = await this.itemManager.methods.items(itemIndex - 1).call()

        // // add new item to server
        // const formData = new FormData()
        // formData.append('file', picture, picture.name)
        // formData.append('_id', newItem._item)
        // formData.append('name', itemName)
        // formData.append('price', newItem._itemPrice)
        // formData.append('state', newItem._state)
        // formData.append('owner', this.accounts[0])
        // formData.append('description', description)
        // axios
        //   .post('http://localhost:4000/product/create', formData, {
        //     headers: { 'content-type': 'multipart/form-data' }
        //   })
        //   .then(res => {
        //     this.setState({ price: 0, itemName: 'item_01', picture: undefined, description: '' })
        //     // add new item to componets state
        //     itemList.unshift(res.data)
        //     this.setState({ itemList })
        //   })
        //   .catch(console.log())
    }

    render() {
        return (
            <form className='Home'>
                <h4>Create item</h4>

                <div className='form-group my-2'>
                    <label htmlFor='picture'>Picture:</label>
                    <input type='file' name='picture' id='picture' className='form-control' onChange={this.getFileInfo}></input>
                </div>

                <div className='form-group my-2'>
                    <label htmlFor='name'>Name:</label>
                    <input name='name' id='name' value={this.state.name} onChange={this.handleInputChange} type='text' className='form-control' />
                </div>

                <div className='form-group my-2'>
                    <label htmlFor='specifications'>Specifications:</label>
                    <textarea
                        name='specifications'
                        id='specifications'
                        rows='3'
                        onChange={this.handleInputChange}
                        value={this.state.specifications}
                        className='form-control'
                        placeholder='Item specifications...'
                    ></textarea>
                </div>

                <div className='form-group my-2'>
                    <label htmlFor='description'>Description:</label>
                    <textarea
                        name='description'
                        id='description'
                        rows='5'
                        onChange={this.handleInputChange}
                        value={this.state.description}
                        className='form-control'
                        placeholder='Item description...'
                    ></textarea>
                </div>

                <div className='form-group my-2'>
                    <label htmlFor='externalUrl'>External URL:</label>
                    <input name='externalUrl' id='externalUrl' value={this.state.externalUrl} onChange={this.handleInputChange} type='text' className='form-control' />
                </div>

                <button className='btn btn-primary my-2' type='submit' onClick={this.handleSubmit}>Create item</button>
            </form>
        )
    }
}

export default Home