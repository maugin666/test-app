import React from "react";
import styles from './Table.module.css';

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

    const renderBodyCols = (item: TableHeaderColumn): JSX.Element => {
        return headers.map(header => {
            return <td key={header.field} className={styles.tableCell}>{item[header.field]}</td>
        });
    };
    const renderBodyRows = (item: ContentItem): JSX.Element => {
        return <tr key={item.id}>{renderBodyCols(item)}</tr>;
    };
    const renderHeaderCol = (item: ContentItem): JSX.Element => {
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