export const getValue = (attribute, productData) => {
    for(let key in productData) {
        const attributes = productData[key].attributes;
        for(let _key in attributes) {
            if(_key === attribute) {
                return attributes[_key].value;
            }
        }
    }
}

export const getPrice = () => {
    
}

export const generateUrl = (selectedFilters, navigate, location) => {
    const urlData = [];
    for(let i in selectedFilters) {
        if(selectedFilters[i] !== undefined) {
            for(let k in selectedFilters[i]) {
                const j = k.split("-");
                let url = '';
                switch (j[1]) {
                    case 'price':
                    case 'number':
                        if( selectedFilters[i][k].length > 1) {
                            url = `${j[0]}=${ selectedFilters[i][k][0]}-${ selectedFilters[i][k][1]}`;
                        } else {
                            url = `${j[0]}=${ selectedFilters[i][k][0]}`;
                        }
                        urlData.push(url);
                    break;
                    case 'select':
                    case 'multiselect':
                    case 'checkbox':
                    case 'radio':
                        urlData.push(`${j[0]}=${selectedFilters[i][k]}`);
                    break;
                    default:
                        urlData.push(`${j[0]}=${selectedFilters[i][k]}`);
                    break;
                }
            }
        }
    }
    if(urlData.length === 0) {
        navigate(`${location.pathname}`);
    } else {
        navigate(`${location.pathname}?${urlData.join("&")}`);
    }
}

export const findTheIndex = (selectedFilters, key) => {
    for(let i in selectedFilters) {
        for(let j in selectedFilters[i]) {
            if(j === key) {
                return i;
            }
        }
    }
    return selectedFilters.length;
}

export const getToolbarValue = (settings, config) => {
    const isMatch = settings.find(setting => setting.path === config);
    if(!isMatch) {
        return;
    }
    return settings.find(setting => setting.path === config).value;
}
