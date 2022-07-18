export const filterItems = (items: any[], field: string, value: string): any[] => {
    console.log(items, field, value)
    return items.filter(item => item[field].toLowerCase().includes(value.toLowerCase()))};

export const sortDirection = (direction: string): string => direction === 'asc' ? 'desc' : 'asc';

export const sortItems = (items: any[], direction: string, field: string): any[] => items.sort((a, b) => {
    if (sortDirection(direction) === 'asc') {
        return a[field] < b[field] ? -1 : 1;
    }
    if (sortDirection(direction) === 'desc') {
        return a[field] > b[field] ? -1 : 1;
    }
    return 0;
});

export const sliceItems = (items: any[], currentPage: string, perPage: number): any[] => {
    const firstPageIndex = (Number(currentPage) - 1) * perPage;
    const lastPageIndex = firstPageIndex + perPage;
    return items.slice(firstPageIndex, lastPageIndex);
};
