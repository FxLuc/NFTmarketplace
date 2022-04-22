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
    const [expanded, setExpanded] = React.useState(false);
    return (
        <Navbar expand="lg" bg="white" fixed="top" className='shadow-sm' expanded={expanded} >
            <Container>
                <Navbar.Brand onClick={() => navigate('/')} className='fw-bold fs-4'>
                    <img
                        src="/brand_V.png"
                        alt="findex_logo"
                        height="40"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="col"></Nav>
                    <Nav className="col-12 col-lg-6 me-4">
                        <form
                            className="input-group"
                            onSubmit={e => {
                                setExpanded(true)
                                e.preventDefault()
                                const value = document.getElementById('search').value
                                if (value) {
                                    props.handleKeywordsChange(value)
                                    navigate('/search')
                                }
                            }}
                        >
                            <label className="input-group-text bg-white" htmlFor='search'><FontAwesomeIcon icon={faSearch} /></label>
                            <input type="search" className="form-control" name='search' id='search' placeholder="Find index, item name, and address" />
                        </form>
                    </Nav>
                    <Nav className="col"></Nav>

                    <Nav>
                        <Nav.Link
                            className='fw-bold me-4'
                            onClick={() => {
                                navigate('/create')
                                setExpanded(false)
                            }}>
                            Create
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                setExpanded(false)
                                navigate('/checkRawData')
                            }}
                            className='fw-bold me-4'>
                            Check
                        </Nav.Link>
                        {(props.isLogin === true)
                            ? <NavDropdown
                                className='fw-bold'
                                title={addressOverflow(props.account._id)}
                                id="collasible-nav-dropdown">
                                <NavDropdown.Item
                                    onClick={() => {
                                        setExpanded(false)
                                        navigate('/profile')
                                    }}> Profile </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => {
                                        setExpanded(false)
                                        navigate('/setting')
                                    }}> Setting
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    onClick={() => {
                                        setExpanded(false)
                                        props.logout()
                                    }}> Logout </NavDropdown.Item>
                            </NavDropdown>
                            : <Nav.Link
                                className='fw-bold me-4'
                                onClick={() => {
                                    setExpanded(false)
                                    navigate('/profile')
                                }}> Login
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default NavigationBar;