const getDateFromString = dateString => {
    const [day, month, year] = dateString.split('.');
    return new Date(`${year}-${month}-${day}`);
};
const filters = {
    byTextAndTitle(list = [], { byTextAndTitle: value }) {
        return value && value.trim() ?
            list.filter(item => `${item.text} ${item.title}`.toLowerCase().includes(value.toLowerCase())) :
            list;
    },
    byDate(list, { from, to }) {
        const listFrom = from ? list.filter(item => getDateFromString(item.date) >= from) : list;
        return to ? listFrom.filter(item => getDateFromString(item.date) <= to) : listFrom;
    }
};

const filter = (form, items) => {
    return Object.keys(filters).reduce((acc, filterName) => {
        return filters[filterName](acc, form);
    }, items);
};

export default filter;