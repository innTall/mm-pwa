import{r as a,o as b,a as v,b as t,n as f,u as i,t as m,g as n,i as o}from"./index-BKeFs_j8.js";const x={class:""},g={class:"p-2 text-sm"},y={class:"flex justify-between border px-2 py-1"},w={class:"text-center font-bold"},U={__name:"DepositBinance",setup(B){const c=a(null),s=a(null),r=a(null),d=a(null),u=a(null),p=(r.value+d.value+u.value).toFixed(2);return(V,e)=>(b(),v("div",x,[t("div",g,[t("div",y,[e[5]||(e[5]=t("div",{class:""},"BINANCE Balance",-1)),t("div",w,[t("p",{class:f({"text-green-500 font-bold":i(p)>s.value,"text-red-500 font-bold":i(p)<=s.value})}," Total: "+m(i(p)),3)])]),n(t("input",{id:"date",type:"number","onUpdate:modelValue":e[0]||(e[0]=l=>c.value=l),step:"1",placeholder:"Date",class:"w-[8ch] bg-gray-900 font-bold text-center"},null,512),[[o,c.value]]),n(t("input",{id:"deposit",type:"number","onUpdate:modelValue":e[1]||(e[1]=l=>s.value=l),step:"5",placeholder:"Deposit","appearance-none":"",required:"",class:"w-[8ch] bg-gray-900 font-bold text-center"},null,512),[[o,s.value]]),n(t("input",{id:"wallet",type:"number","onUpdate:modelValue":e[2]||(e[2]=l=>r.value=l),step:"0.005",placeholder:"Wallet","appearance-none":"",required:"",class:"w-[8ch] bg-gray-900 font-bold text-center"},null,512),[[o,r.value]]),n(t("input",{id:"orders",type:"number","onUpdate:modelValue":e[3]||(e[3]=l=>d.value=l),step:"0.5",placeholder:"Orders","appearance-none":"",required:"",class:"w-[8ch] bg-gray-900 font-bold text-center"},null,512),[[o,d.value]]),n(t("input",{id:"profit",type:"number","onUpdate:modelValue":e[4]||(e[4]=l=>u.value=l),step:"0.05",placeholder:"Profit","appearance-none":"",required:"",class:"w-[8ch] bg-gray-900 font-bold text-center"},null,512),[[o,u.value]])])]))}};export{U as default};
