import{d as x,r as C,c as F,s as N,w as S,o as f,a as h,b as t,t as p,u as d,F as $,e as T,p as R,f as i,v as w,g as U,h as m}from"./index-BSGElEoq.js";const M=x("binanceStore",()=>{const r=C([{date:null,symbol:"",buy:null,amnt:null,sell:null,activeMetric:"roi"}]),b=1e-4,g=1e-4,V=e=>Number(e.buy*e.amnt+e.buy*e.amnt*b).toFixed(2),v=e=>Number((e.sell/e.buy-1)*100).toFixed(2),u=e=>Number((e.sell-e.buy)*e.amnt-e.sell*e.amnt*g).toFixed(2),B=F(()=>r.value.reduce((e,y,_)=>{var c;if(y.activeMetric==="tp"){const o=parseFloat((c=n.value[_])==null?void 0:c.tp)||0;return e+o}return e},0).toFixed(2)),n=F(()=>r.value.map(e=>({cost:V(e),roi:v(e),tp:u(e)})));return{blocks:r,blockMetrics:n,isBlockComplete:e=>e.date&&e.symbol&&e.buy>0&&e.amnt>0&&e.sell>0,addBlock:()=>{r.value.unshift({date:null,symbol:"",buy:null,amnt:null,sell:null,activeMetric:"roi"})},removeBlock:e=>{e>=0&&e<r.value.length&&r.value.splice(e,1)},totalProfit:B}},{persist:!0}),j={class:"px-2 py-2 text-sm"},P={class:"flex justify-between border px-2 py-1"},D={class:"text-center font-bold"},O={class:""},A={class:"container flex justify-between py-1 items-center"},E={class:"flex items-center gap-3"},I={key:0,class:"text-right"},L=["onClick"],X={class:"text-yellow-400 font-bold"},q={class:"flex gap-3"},z=["for"],G=["id","name","onUpdate:modelValue"],H={class:""},J=["for"],K=["id","name","onUpdate:modelValue"],Q={class:""},W={class:"flex justify-between px-2"},Y={class:""},Z=["id","onUpdate:modelValue"],k=["id","onUpdate:modelValue"],ee=["id","onUpdate:modelValue"],te=["id","onUpdate:modelValue"],se=["id","onUpdate:modelValue"],oe={class:"font-bold"},ae={__name:"BinanceSpotResult",setup(r){const{isBlockComplete:b,addBlock:g,removeBlock:V}=M(),{blocks:v,blockMetrics:u,totalProfit:B}=N(M());S(()=>v.value.map(l=>({...l})),l=>{const s=l[0];b(s)&&g()},{deep:!0});const n=l=>{l&&typeof l=="object"&&"value"in l?l.value="":l=""};return(l,s)=>(f(),h("div",j,[t("div",P,[s[5]||(s[5]=t("div",{class:""},"BINANCE Spot Order",-1)),t("div",D,[t("div",O,"Total Profit: $, "+p(d(B)),1)])]),(f(!0),h($,null,T(d(v),(a,e)=>{var y,_,c;return f(),h("div",{key:e,class:"mb-2"},[t("div",A,[t("div",E,[a.activeMetric==="roi"?(f(),h("div",I,[t("button",{class:"w-5 bg-red-600 text-white hover:bg-red-700",onClick:o=>d(V)(e)}," X ",8,L)])):R("",!0),t("div",X,"Order "+p(e+1),1)]),t("div",q,[t("label",{for:"roi-"+e,class:"flex items-center"},[i(t("input",{id:"roi-"+e,type:"radio",name:"metric-"+e,value:"roi","onUpdate:modelValue":o=>a.activeMetric=o,class:"mr-1"},null,8,G),[[w,a.activeMetric]]),s[6]||(s[6]=U(" ROI, % "))],8,z),t("span",H,p((y=d(u)[e])==null?void 0:y.roi),1),t("label",{for:"tp-"+e,class:"flex items-center"},[i(t("input",{id:"tp-"+e,type:"radio",name:"metric-"+e,value:"tp","onUpdate:modelValue":o=>a.activeMetric=o,class:"mr-1"},null,8,K),[[w,a.activeMetric]]),s[7]||(s[7]=U(" TP, $ "))],8,J),t("span",Q,p((_=d(u)[e])==null?void 0:_.tp),1)])]),t("div",W,[t("div",Y,[i(t("input",{id:"date-"+e,type:"date","onUpdate:modelValue":o=>a.date=o,placeholder:"Date",class:"w-[8ch] bg-gray-900 text-center appearance-none",onFocus:s[0]||(s[0]=o=>n(l.date))},null,40,Z),[[m,a.date]]),i(t("input",{id:"symbol-"+e,type:"text","onUpdate:modelValue":o=>a.symbol=o,placeholder:"Symbol",class:"w-[6ch] bg-gray-900 text-center",onFocus:s[1]||(s[1]=o=>n(l.symbol))},null,40,k),[[m,a.symbol]]),i(t("input",{id:"buy-"+e,type:"number","onUpdate:modelValue":o=>a.buy=o,placeholder:"Buy",class:"w-[8ch] bg-gray-900 text-center text-green-400 appearance-none",onFocus:s[2]||(s[2]=o=>n(l.buy))},null,40,ee),[[m,a.buy]]),i(t("input",{id:"amnt-"+e,type:"number","onUpdate:modelValue":o=>a.amnt=o,placeholder:"Amnt",class:"w-[6ch] bg-gray-900 text-center appearance-none",onFocus:s[3]||(s[3]=o=>n(l.amnt))},null,40,te),[[m,a.amnt]]),i(t("input",{id:"sell-"+e,type:"number","onUpdate:modelValue":o=>a.sell=o,placeholder:"Sell",class:"w-[8ch] bg-gray-900 text-center text-red-600 appearance-none",onFocus:s[4]||(s[4]=o=>n(l.sell))},null,40,se),[[m,a.sell]])]),t("div",oe,p((c=d(u)[e])==null?void 0:c.cost),1)]),s[8]||(s[8]=t("hr",{class:"border-green-600 mt-1"},null,-1))])}),128))]))}};export{ae as default};
