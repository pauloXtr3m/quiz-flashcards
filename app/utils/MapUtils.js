export const toArray = map => {
    const arrayObj = [];

    Object.keys(map).forEach(key => arrayObj.push(map[key]));

    return arrayObj;
};