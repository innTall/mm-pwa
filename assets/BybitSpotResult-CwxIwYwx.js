import{d as $,r as S,c as w,s as C,w as N,o as f,a as b,b as t,t as p,u as d,F,e as T,f as j,g as i,v as U,h as M,i as m,j as R}from"./index-0WflRAGp.js";import{_ as P}from"./FooterBybit-unNf4peY.js";const x=$("bybitStore",()=>{const r=S([{date:null,symbol:"",buy:null,amnt:null,sell:null,activeMetric:"roi"}]),h=1e-4,g=1e-4,V=e=>Number(e.buy*e.amnt+e.buy*e.amnt*h).toFixed(2),y=e=>Number((e.sell/e.buy-1)*100).toFixed(2),u=e=>Number((e.sell-e.buy)*e.amnt-e.sell*e.amnt*g).toFixed(2),B=w(()=>r.value.reduce((e,v,_)=>{var c;if(v.activeMetric==="tp"){const o=parseFloat((c=n.value[_])==null?void 0:c.tp)||0;return e+o}return e},0).toFixed(2)),n=w(()=>r.value.map(e=>({cost:V(e),roi:y(e),tp:u(e)})));return{blocks:r,blockMetrics:n,isBlockComplete:e=>e.date&&e.symbol&&e.buy>0&&e.amnt>0&&e.sell>0,addBlock:()=>{r.value.unshift({date:null,symbol:"",buy:null,amnt:null,sell:null,activeMetric:"roi"})},removeBlock:e=>{e>=0&&e<r.value.length&&r.value.splice(e,1)},totalProfit:B}},{persist:!0}),D={class:"container min-h-screen mb-10 px-2 py-1 text-sm"},O={class:"flex justify-between border px-2 py-1"},I={class:"text-center font-bold"},z={class:""},A={class:"container flex justify-between py-1 items-center"},E={class:"flex items-center gap-3"},L={key:0,class:"text-right"},X=["onClick"],Y={class:"text-yellow-400 font-bold"},q={class:"flex justify-between"},G={class:"flex gap-3"},H=["for"],J=["id","name","onUpdate:modelValue"],K={class:""},Q=["for"],W=["id","name","onUpdate:modelValue"],Z={class:""},k={class:"flex justify-between px-2"},ee={class:""},te=["id","onUpdate:modelValue"],se=["id","onUpdate:modelValue"],oe=["id","onUpdate:modelValue"],le=["id","onUpdate:modelValue"],ae=["id","onUpdate:modelValue"],ne={class:"font-bold"},re={class:"fixed bottom-0 left-0 w-full h-12 z-10 bg-gray-900"},ue={__name:"BybitSpotResult",setup(r){const{isBlockComplete:h,addBlock:g,removeBlock:V}=x(),{blocks:y,blockMetrics:u,totalProfit:B}=C(x());N(()=>y.value.map(l=>({...l})),l=>{const s=l[0];h(s)&&g()},{deep:!0});const n=l=>{l&&typeof l=="object"&&"value"in l?l.value="":l=""};return(l,s)=>(f(),b(F,null,[t("div",D,[t("div",O,[s[5]||(s[5]=t("div",{class:""},"BYBIT Spot Order",-1)),t("div",I,[t("div",z,"Total Profit: $, "+p(d(B)),1)])]),(f(!0),b(F,null,T(d(y),(a,e)=>{var v,_,c;return f(),b("div",{key:e,class:"mb-2"},[t("div",A,[t("div",E,[a.activeMetric==="roi"?(f(),b("div",L,[t("button",{class:"w-5 bg-red-600 text-white hover:bg-red-700",onClick:o=>d(V)(e)}," X ",8,X)])):j("",!0),t("div",Y,"Order "+p(e+1),1)]),t("div",q,[t("div",G,[t("label",{for:"roi-"+e,class:"flex items-center"},[i(t("input",{id:"roi-"+e,type:"radio",name:"metric-"+e,value:"roi","onUpdate:modelValue":o=>a.activeMetric=o,class:"mr-1"},null,8,J),[[U,a.activeMetric]]),s[6]||(s[6]=M(" ROI, % "))],8,H),t("span",K,p((v=d(u)[e])==null?void 0:v.roi),1),t("label",{for:"tp-"+e,class:"flex items-center"},[i(t("input",{id:"tp-"+e,type:"radio",name:"metric-"+e,value:"tp","onUpdate:modelValue":o=>a.activeMetric=o,class:"mr-1"},null,8,W),[[U,a.activeMetric]]),s[7]||(s[7]=M(" TP, $ "))],8,Q),t("span",Z,p((_=d(u)[e])==null?void 0:_.tp),1)])])]),t("div",k,[t("div",ee,[i(t("input",{id:"date-"+e,type:"date","onUpdate:modelValue":o=>a.date=o,placeholder:"Date",class:"w-[8ch] bg-gray-900 text-center appearance-none",onFocus:s[0]||(s[0]=o=>n(l.date))},null,40,te),[[m,a.date]]),i(t("input",{id:"symbol-"+e,type:"text","onUpdate:modelValue":o=>a.symbol=o,placeholder:"Symbol",class:"w-[6ch] bg-gray-900 text-center uppercase",onFocus:s[1]||(s[1]=o=>n(l.symbol))},null,40,se),[[m,a.symbol]]),i(t("input",{id:"buy-"+e,type:"number","onUpdate:modelValue":o=>a.buy=o,placeholder:"Buy",class:"w-[8ch] bg-gray-900 text-center text-green-400 appearance-none",onFocus:s[2]||(s[2]=o=>n(l.buy))},null,40,oe),[[m,a.buy]]),i(t("input",{id:"amnt-"+e,type:"number","onUpdate:modelValue":o=>a.amnt=o,placeholder:"Amnt",class:"w-[6ch] bg-gray-900 text-center appearance-none",onFocus:s[3]||(s[3]=o=>n(l.amnt))},null,40,le),[[m,a.amnt]]),i(t("input",{id:"sell-"+e,type:"number","onUpdate:modelValue":o=>a.sell=o,placeholder:"Sell",class:"w-[8ch] bg-gray-900 text-center text-red-600 appearance-none",onFocus:s[4]||(s[4]=o=>n(l.sell))},null,40,ae),[[m,a.sell]])]),t("div",ne,p((c=d(u)[e])==null?void 0:c.cost),1)]),s[8]||(s[8]=t("hr",{class:"border-green-600 mt-1"},null,-1))])}),128))]),t("footer",re,[R(P)])],64))}};export{ue as default};
