export const addPosition = array => {
    let position = 0;
    return array.map( elem => {
        position = position + 1;
        return {...elem, position};
    })
};