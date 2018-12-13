export const toArray = map => {
    const arrayObj = [];

    Object.keys(map).forEach(key => arrayObj.push(map[key]));

    return arrayObj;
};

export const toArrayWithPosition = map => {
    const arrayObj = [];
    let position = 1 ;
    Object.keys(map).forEach(key => {
        arrayObj.push({...map[key], position});
        position = position + 1;
    });

    return arrayObj;
};