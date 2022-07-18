import React from "react";
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

    const renderBodyCols = (item): JSX.Element => {
        return mockHead.map(header => {
            return <td key={header.field} className={styles.tableCell}>{item[header.field]}</td>
        });
    };
    const renderBodyRows = (item): JSX.Element => {
        return <tr key={item.id}>{renderBodyCols(item)}</tr>;
    };
    const renderHeaderCol = (item): JSX.Element => {
        return <th 
            key={item.field} 
            scope="col" 
            className={styles.tableHeaderCol}
        >{item.field}</th>
    }
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {mockHead.map(header => renderHeaderCol(header))}
                    </tr>
                </thead>
                <tbody>
                    {mockData.map(item => renderBodyRows(item))}
                </tbody>
            </table>
        </>
    );
};
  
export default Table;