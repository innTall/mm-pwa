import{d as y,r as g,c as V,s as b,w as A,o as u,a as v,b as t,n as U,u as l,t as x,F as D,e as N,p as T,g as c,i as p,f as j,j as q}from"./index-CsSnTqQK.js";import{_ as C}from"./FooterBitget-CWjIjU2R.js";const B=y("depoBitget",()=>{const r=g([{date:null,deposit:null,wallet:null,orders:null,profit:null,isActive:!0}]),d=V(()=>r.value.map(s=>s.deposit!==null&&s.wallet!==null&&s.orders!==null&&s.profit!==null?(s.deposit+s.wallet+s.orders+s.profit).toFixed(2):"0.00")),f=()=>{r.value.unshift({date:null,deposit:null,wallet:null,orders:null,profit:null,isActive:!0})},m=s=>{r.value[s].isActive=!1},n=g(null);return{blocks:r,lastBalance:n,updateLastBalance:()=>{d.value.length>0&&(n.value=d.value[d.value.length-1])},balances:d,addBlock:f,deactivateBlock:m}},{persist:!0}),L={class:""},S={class:"p-2 text-sm"},F={class:"flex justify-between border px-2 py-1"},z={class:"text-center"},E={class:"flex justify-between text-center"},O=["onUpdate:modelValue","disabled"],P=["onUpdate:modelValue","disabled"],W=["onUpdate:modelValue","disabled"],$=["onUpdate:modelValue","disabled"],G=["onUpdate:modelValue","disabled"],I={class:""},M=["onClick"],R={class:"fixed bottom-0 left-0 w-full h-12 z-10 bg-gray-900"},K={__name:"DepositBitget",setup(r){const{addBlock:d,deactivateBlock:f,updateLastBalance:m}=B(),{blocks:n,balances:i,lastBalance:s}=b(B()),w=h=>{f(h),d()};return A(i,()=>{m()}),(h,o)=>(u(),v("div",L,[t("div",S,[t("div",F,[o[0]||(o[0]=t("div",{class:""},"BITGET Balance",-1)),t("div",z,[t("p",{class:U({"text-green-500 font-bold":l(i)>l(n).deposit,"text-red-500 font-bold":l(i)<=l(n).deposit})}," Total: "+x(l(i).value),3)])]),(u(!0),v(D,null,N(l(n),(e,_)=>(u(),v("div",{key:_,class:"p-2 text-sm"},[o[1]||(o[1]=T('<div class="flex justify-between text-center text-xs"><div class="">Date:</div><div class="">Deposit:</div><div class="">Wallet:</div><div class="">Orders:</div><div class="">Profit:</div><div class="">Balance:</div></div>',1)),t("div",E,[c(t("input",{id:"date",type:"date","onUpdate:modelValue":a=>e.date=a,step:"1",placeholder:"Date",disabled:!e.isActive,class:"w-[7ch] bg-gray-900 text-center"},null,8,O),[[p,e.date]]),c(t("input",{id:"deposit",type:"number","onUpdate:modelValue":a=>e.deposit=a,step:"5",placeholder:"Deposit","appearance-none":"",required:"",disabled:!e.isActive,class:"w-[7ch] bg-gray-900 text-center"},null,8,P),[[p,e.deposit]]),c(t("input",{id:"wallet",type:"number","onUpdate:modelValue":a=>e.wallet=a,step:"0.005",placeholder:"Wallet","appearance-none":"",required:"",disabled:!e.isActive,class:"w-[7ch] bg-gray-900 text-center"},null,8,W),[[p,e.wallet]]),c(t("input",{id:"orders",type:"number","onUpdate:modelValue":a=>e.orders=a,step:"0.5",placeholder:"Orders","appearance-none":"",required:"",disabled:!e.isActive,class:"w-[7ch] bg-gray-900 text-center"},null,8,$),[[p,e.orders]]),c(t("input",{id:"profit",type:"number","onUpdate:modelValue":a=>e.profit=a,step:"0.05",placeholder:"Profit","appearance-none":"",required:"",disabled:!e.isActive,class:"w-[7ch] bg-gray-900 text-center"},null,8,G),[[p,e.profit]]),t("div",I,x(l(i)[_]),1)]),e.isActive?(u(),v("button",{key:0,onClick:a=>w(_),class:"mt-2 px-4 py-1 bg-green-600 text-white"}," Add New Block ",8,M)):j("",!0),o[2]||(o[2]=t("hr",{class:"border-green-600"},null,-1))]))),128))]),t("div",R,[q(C,{lastBalance:l(s)},null,8,["lastBalance"])])]))}};export{K as default};
