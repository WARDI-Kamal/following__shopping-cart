const DOLLAR_FORMATER = new Intl.NumberFormat(undefined,{
  currency:"USD",
  style:"currency"
})

export function formatCurrency(nb:number){
  return DOLLAR_FORMATER.format(nb)
}