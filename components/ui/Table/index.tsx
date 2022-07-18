import React, { useEffect, useReducer } from "react";
import styles from './Table.module.css';
import reducer, { initialState } from './reducers/index';

interface TableHeaderColumn {
    field: string;
    value: string;
    sortable: boolean;
    filterable: boolean;
}

interface ContentItem {

}
interface TableProps {
    items: ContentItem[];
    headers: TableHeaderColumn[];
    pagination?: boolean;
    perPage?: number;
}

const Table = ({ headers, items }: TableProps): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({
        type: 'init', 
        payload: {
            items,
        },
    });
    }, []);
    const renderBodyCols = (item: TableHeaderColumn): JSX.Element[] => {
        return headers.map(header => {
            return <td key={header.field} className={styles.tableCell}>{item[header.field]}</td>
        });
    };
    const renderBodyRows = (item: ContentItem): JSX.Element => {
        return <tr key={item.id}>{renderBodyCols(item)}</tr>;
    };
    const renderHeaderCol = (item: TableHeaderColumn): JSX.Element => {
        return <th 
            key={item.field} 
            scope="col" 
            className={styles.tableHeaderCol}
        >
            <span>{item.value}</span>
            {item.sortable && (
                <div className={styles.sortWrapper}>
                    <button 
                        type='button'
                        onClick={() => {
                            dispatch({type: 'sort', payload: {field: item.field}});
                        }}
                    >{state.sortedBy.field === item.field ? (state.sortedBy.direction === 'asc' ? '↓' : '↑') : '↓'}</button>
                </div>
            )}
        </th>
    };
    console.log(state)
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map(header => renderHeaderCol(header))}
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => renderBodyRows(item))}
                </tbody>
            </table>
        </>
    );
};
  
export default Table;