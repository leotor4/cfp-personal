import label from '../labels/index';
const {paths} = require('../labels/index')

export const pathDivider = (paths2) => {

    paths2 = paths2.split('/');
    let response = [];
    let auxArray = [];

    for (let path of paths2) {
        if (label.paths) {
            auxArray.push(path);
            response.push({
                label: path,
                path: auxArray.join('/')
            });
        }    
    }

    // console.log("RES", response.filter((item,index) => index>0))
    response = response.filter((item,index) => index>0)
    return response;
}
export default pathDivider