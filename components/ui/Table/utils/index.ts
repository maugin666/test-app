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
