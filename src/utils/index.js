exports.serializeQueryParams = (params) => {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
        const value = params[key];
        if (Array.isArray(value)) {
            value.forEach(val => searchParams.append(key, val));
        } else if (value !== undefined && value !== null) {
            searchParams.append(key, value);
        }
    });

    return searchParams.toString();
};

