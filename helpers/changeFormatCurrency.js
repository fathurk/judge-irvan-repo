let changeFormatCurrency = (data)=>{
   return data.toLocaleString('id-ID', {style: 'currency', currency:'IDR'})
}

module.exports = changeFormatCurrency


