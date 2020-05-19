const sortByDate = (obj) => {
    const sortedObj = obj.sort((a, b) => {
        let dateA = new Date(a.date), dateB = new Date(b.date);
        return dateB - dateA;
    });
    return sortedObj;
}

export { sortByDate }