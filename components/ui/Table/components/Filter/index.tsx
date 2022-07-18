import React, { useState, useRef } from "react";
import ReactDOM from 'react-dom';
import styles from './Filter.module.css';
import HeadButton from '../HeadButton';

interface FilterProps {
    handleFilterChange: Function;
}

function Modal(props) {
    return ReactDOM.createPortal(
        props.children,
        props.parent
      );
}

function Content(props) {
    return (
        <div className={styles.filterPopup}>
            <input 
                type='text' 
                className={styles.input} 
                onChange={event => props.handleFilterChange(event.target.value)}
                autoFocus
            />
        </div>
    );
  }

const Filter = (props: FilterProps): JSX.Element => {
    const headColRef = useRef(null);
    const [popupOpened, togglePopup] = useState(false);

 return (
        <div className={styles.filterWrapper} ref={headColRef}>
            <HeadButton 
                handleClick={() => togglePopup(true)}
                content='✎'
            />
            
            {popupOpened && <>
            <div className={styles.overflow} onClick={() => togglePopup(false)}/>
                <Modal parent={headColRef.current}>
                <Content handleFilterChange={props.handleFilterChange}/>
            </Modal>
            </>}
        </div>
    )
};

export default Filter;
