/**
 * Function to get localstorage object item.
 * 
 * @param { String } name - The name of the localstorage item.
 * @returns { Object } - The object from the localstorage.
 */
export function getLocalObject(name){
    let obj = JSON.parse(localStorage.getItem(name));
    return obj;
}

/**
 * Function to set localstorage object item.
 * 
 * @param { String } name - The name of the localstorage item.
 * @param { Object } obj - The object to be stored.
 */
export function setLocalObject(name, obj){
    localStorage.setItem(name, JSON.stringify(obj));
}