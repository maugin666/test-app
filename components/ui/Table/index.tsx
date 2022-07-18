import React, { useReducer, useEffect } from "react";
import styles from './Table.module.css';


const Table = (props) => {
    const mockData = [
        {
            id: 1,
            name: 'Jon Snow',
            email: 'qwerty'
        },
        {
            id: 2,
            name: 'Kitty Cat',
            email: 'qwerty'
        },
        {
            id: 3,
            name: 'Death',
            email: 'qwerty'
        },
        {
            id: 4,
            name: 'Funny bottle',
            email: 'qwerty'
        }
    ];
    const mockHead = [
        {
            field: 'id'
        },
        {
            field: 'name'
        },
        {
            field: 'email'
        }
    ];
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                    {mockHead.map((el, i) => <td key={i}>{el.field}</td>)}
                    </tr>
                </thead>
                <tbody>
                    {mockData.map(el => <tr key={el.id}>{el.map(item => <td>{item}</td>)}</tr>)}
                </tbody>
            </table>
        </>
    );
};
  
export default Table;