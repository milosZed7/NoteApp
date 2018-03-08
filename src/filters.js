const getDateFromString = dateString => {
    const [day, month, year] = dateString.split('.');
    return new Date(year, month - 1, day);
};
const filters = {
    byText(list = [], { byText: value }) {
        return value ? list.filter(item => item.text.includes(value)) : list;
    },
    byTitle(list = [], { byTitle: value }) {
        return value ? list.filter(item => item.title.includes(value)) : list;
    },
    byDate(list, { from, to }) {
        const listFrom = from ? list.filter(item => getDateFromString(item.date) >= from) : list;
        return to ? listFrom.filter(item => getDateFromString(item.date) <= to) : listFrom;
    }
};

const filter = (form, items) => {
    console.log(items);
    return Object.keys(filters).reduce((acc, filterName) => {
        return filters[filterName](acc, form);
    }, items);
};

export default filter;