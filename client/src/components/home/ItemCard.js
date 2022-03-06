import React from 'react'
import ToastAutoHide from '../ToastAutoHide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'

function addressOverflow(address) {
    return `${address.substring(0, 3)}...${address.substring(39, 42)}`
}

function ItemCard(props) {
        const navigate = useNavigate()
        return (
        <div className='col-12 col-sm-6 col-lg-4 col-xl-3 mb-4' onClick={() => navigate(`/item/${props.item._id}`)}>
            <div className='card shadow-sm'>
                <img src={props.item.picture} className="w-100" style={{ objectFit: 'cover', height: '250px' }} alt={props.item.name} />
                <div className="card-body">
                    <h5 className="card-title text-truncate">{props.item.name}</h5>
                    <h6 className="card-subtitle text-muted mb-2">Owner: {addressOverflow(props.item.owner)}</h6>
                    <div className='row'>
                        <div className='col text-start'>
                            <div className="card-text text-nowrap overflow-hidden text-secondary" style={{ textOverflow: 'ellipsis' }}>
                                <ToastAutoHide message='Copy' feedback='Copied!' title={addressOverflow(props.item._id)} content={props.item._id} />
                            </div>
                        </div>
                        <div className='col text-end'>
                            <p className="card-text">
                                <FontAwesomeIcon icon={faEthereum} className='text-primary' /> {(Number(props.item.price) / 1000000000000000000).toFixed(5)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;