import{d as S,r as h,c as V,s as b,w as M,o as c,a as v,b as t,n as U,u as d,t as x,F as A,f as D,x as y,h as i,j as n,g as j,k as q}from"./index-CP36KnGk.js";import{_ as N}from"./FooterBybit-DsgvXl96.js";const w=S("depoBybit",()=>{const u=h([{date:null,deposit:null,wallet:null,ordersSpot:null,profitSpot:null,ordersMargin:null,profitMargin:null,isActive:!0}]),r=V(()=>u.value.map(s=>s.deposit!==null&&s.wallet!==null&&s.ordersSpot!==null&&s.profitSpot!==null&&s.ordersMargin!==null&&s.profitMargin!==null?(s.deposit+s.wallet+s.ordersSpot+s.profitSpot+s.ordersMargin+s.profitMargin).toFixed(2):"0.00")),f=()=>{u.value.unshift({date:null,deposit:null,wallet:null,ordersSpot:null,profitSpot:null,ordersMargin:null,profitMargin:null,isActive:!0})},g=s=>{u.value[s].isActive=!1},o=h(null);return{blocks:u,balances:r,lastBalance:o,updateLastBalance:()=>{r.value.length>0&&(o.value=r.value[r.value.length-1])},addBlock:f,deactivateBlock:g}},{persist:!0}),C={class:""},L={class:"p-2 text-sm"},O={class:"flex justify-between border px-2 py-1"},P={class:"text-center font-bold"},T={class:"flex justify-between"},F=["onUpdate:modelValue","disabled"],z=["onUpdate:modelValue","disabled"],W=["onUpdate:modelValue","disabled"],$={class:""},E={class:"flex justify-between"},I=["onUpdate:modelValue","disabled"],R=["onUpdate:modelValue","disabled"],Y=["onUpdate:modelValue","disabled"],G=["onUpdate:modelValue","disabled"],H=["onClick"],J={class:"fixed bottom-0 left-0 w-full h-12 z-10 bg-gray-900"},X={__name:"DepositBybit",setup(u){const{addBlock:r,deactivateBlock:f,updateLastBalance:g}=w(),{blocks:o,balances:p,lastBalance:s}=b(w()),B=_=>{f(_),r()};return M(p,()=>{g()}),(_,l)=>(c(),v("div",C,[t("div",L,[t("div",O,[l[0]||(l[0]=t("div",{class:""},"BYBIT Balance",-1)),t("div",P,[t("p",{class:U({"text-green-500 font-bold":d(p)>d(o).deposit,"text-red-500 font-bold":d(p)<=d(o).deposit})}," Total Balance: "+x(d(p).value),3)])]),(c(!0),v(A,null,D(d(o),(e,m)=>(c(),v("div",{key:m,class:"p-2 text-sm"},[l[1]||(l[1]=y('<div class="flex justify-between text-center text-xs"><div class="">Date:</div><div class="">Deposit:</div><div class="">Wallet:</div><div class="">Balance:</div></div>',1)),t("div",T,[i(t("input",{id:"date",type:"date","onUpdate:modelValue":a=>e.date=a,step:"1",placeholder:"Date",disabled:!e.isActive,class:"w-[8ch] bg-gray-900 text-center"},null,8,F),[[n,e.date]]),i(t("input",{id:"deposit",type:"number","onUpdate:modelValue":a=>e.deposit=a,step:"5",placeholder:"Deposit","appearance-none":"",required:"",disabled:!e.isActive,class:"w-[8ch] bg-gray-900 text-center"},null,8,z),[[n,e.deposit]]),i(t("input",{id:"wallet",type:"number","onUpdate:modelValue":a=>e.wallet=a,step:"0.005",placeholder:"Wallet","appearance-none":"",required:"",disabled:!e.isActive,class:"w-[8ch] bg-gray-900 text-center"},null,8,W),[[n,e.wallet]]),t("div",$,x(d(p)[m]),1)]),l[2]||(l[2]=y('<div class="flex justify-between text-xs"><div class="">OrdersSpot:</div><div class="">ProfitSpot:</div><div class="">OrdersMargin:</div><div class="">ProfitMargin:</div></div>',1)),t("div",E,[i(t("input",{id:"ordersSpot",type:"number","onUpdate:modelValue":a=>e.ordersSpot=a,step:"0.5",placeholder:"Orders","appearance-none":"",disabled:!e.isActive,required:"",class:"w-[8ch] bg-gray-900 text-center"},null,8,I),[[n,e.ordersSpot]]),i(t("input",{id:"profitSpot",type:"number","onUpdate:modelValue":a=>e.profitSpot=a,step:"0.05",placeholder:"Profit","appearance-none":"",disabled:!e.isActive,required:"",class:"w-[8ch] bg-gray-900 text-center"},null,8,R),[[n,e.profitSpot]]),i(t("input",{id:"ordersMargin",type:"number","onUpdate:modelValue":a=>e.ordersMargin=a,step:"0.5",placeholder:"Orders","appearance-none":"",disabled:!e.isActive,required:"",class:"w-[8ch] bg-gray-900 text-center"},null,8,Y),[[n,e.ordersMargin]]),i(t("input",{id:"profitMargin",type:"number","onUpdate:modelValue":a=>e.profitMargin=a,step:"0.05",placeholder:"Profit","appearance-none":"",disabled:!e.isActive,required:"",class:"w-[8ch] bg-gray-900 text-center"},null,8,G),[[n,e.profitMargin]])]),e.isActive?(c(),v("button",{key:0,onClick:a=>B(m),class:"mt-2 px-4 py-1 bg-green-600 text-white"}," Add New Block ",8,H)):j("",!0),l[3]||(l[3]=t("hr",{class:"border-green-600"},null,-1))]))),128))]),t("div",J,[q(N,{lastBalance:d(s)},null,8,["lastBalance"])])]))}};export{X as default};
