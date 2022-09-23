import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

const BackDrop = (props) => {
    return (
        <div className='backdrop' onClick={props.onHideCart}></div>
    )
}

const ModalOverLays = (props) => {
    return (
        <div className='modal'>
            <div className='content'>{props.children}</div>
        </div>
    )
}

const PortalElement = document.getElementById('overlays'); 

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop onHideCart={props.onHideCart} />, PortalElement)}
            {ReactDOM.createPortal(
                <ModalOverLays>
                    {props.children}
                </ModalOverLays>,
                PortalElement
            )}
        </>
    )
}

export default Modal