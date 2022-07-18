import React, { useEffect, useReducer } from "react";
import styles from './Table.module.css';
import reducer, { initialState } from './reducers/index';
import Filter from './components/Filter';
import HeadButton from './components/HeadButton';
interface TableHeaderColumn {
    field: string;
    value: string;
    sortable: boolean;
    filterable: boolean;
}

interface ContentItem {
    id: number;
    name: string;
    age: number;
    email: string;
    birth_date: string;
    application_date: string;
    position_applied: string;
    status: string;
    year_of_experience: number;
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
    const renderBodyCols = (item: ContentItem): JSX.Element[] => {
        return headers.map((header: TableHeaderColumn) => {
            const name = header.field;
            return <td key={header.field} className={styles.tableCell}>{item[name]}</td>
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
                    <HeadButton 
                        handleClick={() => {
                            dispatch({type: 'sort', payload: {field: item.field}});
                        }}
                        content={state.sortedBy.field === item.field ? (state.sortedBy.direction === 'asc' ? '↓' : '↑') : '↓'}
                    />
                </div>
            )}
            {item.filterable && (
                <Filter handleFilterChange={(value: string) => {
                    dispatch({type: 'filter', payload: {field: item.field, value}});
                }}/>
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
                    {state.filteredItems.map((item: ContentItem) => renderBodyRows(item))}
                </tbody>
            </table>
        </>
    );
};
  
export default Table;