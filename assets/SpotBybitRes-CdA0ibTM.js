import{d as N,r as C,c as U,s as R,w as T,o as f,a as b,b as t,t as m,u,F as M,f as j,g as D,h as i,v as x,i as $,j as v,k as P}from"./index-BZ3FHD24.js";import{_ as O}from"./FooterBybit-BuLPApg-.js";const S=N("spotBybitRes",()=>{const r=C([{date:null,symbol:"",buy:null,amnt:null,sell:null,activeMetric:"roi"}]),h=1e-4,g=1e-4,B=e=>Number(e.buy*e.amnt+e.buy*e.amnt*h).toFixed(2),y=e=>Number((e.sell/e.buy-1)*100).toFixed(2),c=e=>Number((e.sell-e.buy)*e.amnt-e.sell*e.amnt*g).toFixed(2),V=U(()=>r.value.reduce((e,s,l)=>{var p;if(s.activeMetric==="tp"){const _=parseFloat((p=n.value[l])==null?void 0:p.tp)||0;return e+_}return e},0).toFixed(2)),n=U(()=>r.value.map(e=>({cost:B(e),roi:y(e),tp:c(e)})));return{blocks:r,blockMetrics:n,isBlockComplete:e=>e.date&&e.symbol&&e.buy>0&&e.amnt>0&&e.sell>0,addBlock:()=>{r.value.unshift({date:null,symbol:"",buy:null,amnt:null,sell:null,activeMetric:"roi"})},removeBlock:e=>{e>=0&&e<r.value.length&&r.value.splice(e,1)},totalProfit:V}},{persist:!0}),E={class:"container min-h-screen mb-10 px-2 py-1 text-sm"},I={class:"flex justify-between border px-2 py-1"},z={class:"text-center font-bold"},A={class:""},L={class:"container flex justify-between py-1 items-center"},X={class:"flex items-center gap-3"},Y={key:0,class:"text-right"},q=["onClick"],G={class:"text-yellow-400 font-bold"},H={class:"flex justify-between"},J={class:"flex gap-3"},K=["for"],Q=["id","name","onUpdate:modelValue"],W={class:""},Z=["for"],k=["id","name","onUpdate:modelValue"],ee={class:""},te={class:"flex justify-between px-2"},se={class:""},oe=["id","onUpdate:modelValue","disabled"],le=["id","onUpdate:modelValue","disabled"],ae=["id","onUpdate:modelValue","disabled"],ne=["id","onUpdate:modelValue","disabled"],re=["id","onUpdate:modelValue","disabled"],ie={class:"font-bold"},de={class:"fixed bottom-0 left-0 w-full h-12 z-10 bg-gray-900"},pe={__name:"SpotBybitRes",setup(r){const{isBlockComplete:h,addBlock:g,removeBlock:B}=S(),{blocks:y,blockMetrics:c,totalProfit:V}=R(S());C(!0),T(()=>y.value.map(o=>({...o})),o=>{const e=o[0];h(e)&&g()},{deep:!0});const n=o=>{o&&typeof o=="object"&&"value"in o?o.value="":o=""},d=o=>o.activeMetric==="roi",w=o=>o.activeMetric==="roi";return(o,e)=>(f(),b(M,null,[t("div",E,[t("div",I,[e[5]||(e[5]=t("div",{class:""},"BYBIT Spot Order",-1)),t("div",z,[t("div",A,"Total Profit: $, "+m(u(V)),1)])]),(f(!0),b(M,null,j(u(y),(s,l)=>{var p,_,F;return f(),b("div",{key:l,class:"mb-2"},[t("div",L,[t("div",X,[w(s)?(f(),b("div",Y,[t("button",{class:"w-5 bg-red-600 text-white hover:bg-red-700",onClick:a=>u(B)(l)}," X ",8,q)])):D("",!0),t("div",G,"Order "+m(l+1),1)]),t("div",H,[t("div",J,[t("label",{for:"roi-"+l,class:"flex items-center"},[i(t("input",{id:"roi-"+l,type:"radio",name:"metric-"+l,value:"roi","onUpdate:modelValue":a=>s.activeMetric=a,class:"mr-1"},null,8,Q),[[x,s.activeMetric]]),e[6]||(e[6]=$(" ROI, % "))],8,K),t("span",W,m((p=u(c)[l])==null?void 0:p.roi),1),t("label",{for:"tp-"+l,class:"flex items-center"},[i(t("input",{id:"tp-"+l,type:"radio",name:"metric-"+l,value:"tp","onUpdate:modelValue":a=>s.activeMetric=a,class:"mr-1"},null,8,k),[[x,s.activeMetric]]),e[7]||(e[7]=$(" TP, $ "))],8,Z),t("span",ee,m((_=u(c)[l])==null?void 0:_.tp),1)])])]),t("div",te,[t("div",se,[i(t("input",{id:"date-"+l,type:"date","onUpdate:modelValue":a=>s.date=a,placeholder:"Date",class:"w-[8ch] bg-gray-900 text-center appearance-none",disabled:!d(s),onFocus:e[0]||(e[0]=a=>n(o.date))},null,40,oe),[[v,s.date]]),i(t("input",{id:"symbol-"+l,type:"text","onUpdate:modelValue":a=>s.symbol=a,placeholder:"Symbol",class:"w-[6ch] bg-gray-900 text-center uppercase",disabled:!d(s),onFocus:e[1]||(e[1]=a=>n(o.symbol))},null,40,le),[[v,s.symbol]]),i(t("input",{id:"buy-"+l,type:"number","onUpdate:modelValue":a=>s.buy=a,placeholder:"Buy",class:"w-[8ch] bg-gray-900 text-center text-green-400 appearance-none",disabled:!d(s),onFocus:e[2]||(e[2]=a=>n(o.buy))},null,40,ae),[[v,s.buy]]),i(t("input",{id:"amnt-"+l,type:"number","onUpdate:modelValue":a=>s.amnt=a,placeholder:"Amnt",class:"w-[6ch] bg-gray-900 text-center appearance-none",disabled:!d(s),onFocus:e[3]||(e[3]=a=>n(o.amnt))},null,40,ne),[[v,s.amnt]]),i(t("input",{id:"sell-"+l,type:"number","onUpdate:modelValue":a=>s.sell=a,placeholder:"Sell",class:"w-[8ch] bg-gray-900 text-center text-red-600 appearance-none",disabled:!d(s),onFocus:e[4]||(e[4]=a=>{n(o.sell)})},null,40,re),[[v,s.sell]])]),t("div",ie,m((F=u(c)[l])==null?void 0:F.cost),1)]),e[8]||(e[8]=t("hr",{class:"border-green-600 mt-1"},null,-1))])}),128))]),t("footer",de,[P(O)])],64))}};export{pe as default};
