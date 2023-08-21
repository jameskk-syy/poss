
export function formatDate(date,type){
    date = new Date(date)
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const dt = date.getDate()
    if(type==='MONTH') return `${year}-${month>=10?month:'0'+month}`
    return `${year}-${month>=10?month:'0'+month}-${dt>=10?dt:'0'+dt}`
}

export function sum(array) {
  return array.reduce((a,b)=>a+b,0)
}

export function groupBy(array, property) {
  return array.reduce((result, obj) => {
    const key = obj[property];
          if (!result[key]) {
      result[key] = [];
    }

    result[key].push(obj);

    return result;
  }, {});
}

