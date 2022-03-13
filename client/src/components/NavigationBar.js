import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function addressOverflow(address) {
    return `${address.substr(0, 3)}...${address.substr(39, 42)}`
}

function NavigationBar(props) {
    const navigate = useNavigate()
    return (
        <Navbar collapseOnSelect expand="lg" bg="white" fixed="top" className='shadow-sm'>
            <Container>
                <Navbar.Brand onClick={() => navigate('/')} className='fw-bold fs-4'>
                    <img
                        src="/logo_F_primary.png"
                        alt="findex_logo"
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                    />{' '}
                    FINDEX
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="col"></Nav>
                    <Nav className="col-12 col-lg-6 me-4">
                        <form
                            className="input-group"
                            onSubmit={ e => {
                                    e.preventDefault()
                                    const value = document.getElementById('search').value
                                    if (value) {
                                        props.handleKeywordsChange(value)
                                        navigate('/search')
                                    }
                                }
                            }
                        >
                            <label className="input-group-text bg-white" htmlFor='search'><FontAwesomeIcon icon={faSearch} /></label>
                            <input type="search" className="form-control" name='search' id='search' placeholder="Find index, item name, and address" />
                        </form>
                    </Nav>
                    <Nav>
                        <Nav.Link className='fw-bold me-4' onClick={() => navigate('/create')}>Create</Nav.Link>
                        <Nav.Link onClick={() => navigate('/checkRawData')} className='fw-bold me-4'>Check</Nav.Link>
                        <NavDropdown className='fw-bold' title={addressOverflow(props.account._id)} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate('/setting')}>Setting</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => navigate('/signout')}>Sign out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default NavigationBar;