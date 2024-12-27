import{r as d,a as ie,c as p,w as oe,o as v,b as m,d as t,e as a,v as u,t as o,n as f,F as U,f as A,g as ae,h as $}from"./index-DCAnP7jv.js";const ue={class:""},de={class:"w-full px-2 bg-gray-900"},re={class:"flex justify-between p-1 text-sm"},ce={class:""},pe={class:"flex justify-between"},ve={class:"flex justify-between"},me={class:""},fe={class:"flex justify-between"},xe={class:"flex justify-between"},ye={class:"flex justify-between"},ge={class:""},he={class:"text-right"},_e={class:"text-right"},be={class:"text-right"},we={class:"text-center"},Pe={class:""},Se={class:"h-6 flex gap-2 text-sm items-center"},Ce={class:"flex"},Fe={class:"w-full"},Ve={class:""},Ue={class:"flex justify-between"},Ae=["id","onUpdate:modelValue"],Be=["id","onUpdate:modelValue"],Oe={class:""},Te=["id","onClick"],De=["id","onClick"],je={key:0,class:"fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"},Le={class:"bg-gray-700 rounded-lg shadow-lg w-1/2 max-w-md p-2 text-center"},$e={class:"text-sm text-white"},Ie={class:"max-h-14 overflow-y-auto px-2"},Me={class:"flex justify-between mt-1 items-center"},qe=["id","onUpdate:modelValue"],Re=["id","onUpdate:modelValue"],Ne={class:""},ze={class:"text-gray-500 text-xs"},Ge=["id","onClick"],Xe={class:"flex justify-between mt-1 mb-1 items-center"},Ee={class:"flex items-center"},He=["id","name","onUpdate:modelValue"],Ye=["id","onUpdate:modelValue","onInput"],Je={class:"text-gray-500"},Ke={class:"text-xs"},Qe={class:"flex items-center"},We=["id","name","onUpdate:modelValue"],Ze=["id","onUpdate:modelValue","onInput"],ke={class:"text-gray-500"},et={class:"text-xs"},I=.02,M=.055,nt={__name:"FullCode",setup(tt){let q=1;const c=d(null),g=d(null),h=d(null),_=d(null),b=d(null),B=d(null),r=d([D()]),O=d([]),T=p(()=>(c.value*h.value/100).toFixed(2)),R=p(()=>(c.value*_.value/100).toFixed(2)),N=p(()=>(c.value*b.value/100).toFixed(2)),z=p(()=>(g.value*T.value).toFixed(2)),P=p(()=>r.value.reduce((e,n)=>e+n.orders.reduce((l,s)=>(s.selectedSwitch==="tp"&&s.tp?l+=parseFloat(s.tp)||0:s.selectedSwitch==="sl"&&s.sl&&(l+=parseFloat(s.sl)||0),l),0),0).toFixed(2)),G=p(()=>[...O.value].sort((e,n)=>e.localeCompare(n)));function X(){return q++}function S(){O.value=r.value.filter(e=>e.symbol).map(e=>e.symbol)}function D(){const e=ie({id:X(),symbol:"",date:"",orders:[],isSaved:!1,totalActiveTpAndSl:p(()=>e.orders.reduce((l,s)=>(s.selectedSwitch==="tp"&&s.tp?l+=parseFloat(s.tp)||0:s.selectedSwitch==="sl"&&s.sl&&(l+=parseFloat(s.sl)||0),l),0).toFixed(2))}),n={id:1,buyPrice:B.value,amount:null,slPrice:null,tpPrice:null,selectedSwitch:null};return e.orders.push(n),oe(()=>e.symbol,()=>{S()}),e}function E(){const e=D();r.value.unshift(e),S()}function H(e){r.value=r.value.filter(n=>n.id!==e),S()}function Y(e){const n={id:e.orders.length+1,buyPrice:B.value,amount:null,buyOrder:null,amountMath:null,slPrice:null,sl:null,slPriceMath:null,tpPrice:null,tp:null,tpPriceMath:null,selectedSwitch:"sl"};e.orders.unshift(n);const l=r.value.findIndex(s=>s.id===e.id);if(l!==-1){const[s]=r.value.splice(l,1);r.value.unshift(s)}}function J(e,n){const l=e.orders.findIndex(s=>s.id===n);l!==-1&&e.orders.splice(l,1)}function C(e){return!e.buyPrice||!e.amount?0:(e.buyPrice*e.amount).toFixed(2)}function j(e){const n=parseFloat(e.slPrice);if(!n||!e.buyPrice||!e.amount)return 0;const s=C(e)*I/100,i=n*e.amount*M/100;return((n-e.buyPrice)*e.amount-s-i).toFixed(2)}function L(e){const n=parseFloat(e.tpPrice);if(!n||!e.buyPrice||!e.amount)return 0;const s=C(e)*I/100,i=n*e.amount*M/100;return((n-e.buyPrice)*e.amount-s-i).toFixed(2)}function F(e){return e>=1e4?0:e>=1e3?1:e>=100||e>=10?2:e>=1?3:e>=.1?4:5}function K(e){if(e===0)return 4;if(e===1)return 3;if(e===2)return 2;if(e===3)return 1;if(e>=4)return 0}const Q=e=>{if(!e.buyPrice||e.buyPrice<=0)return 0;const n=F(e.buyPrice),l=K(n),s=c.value*h.value/100;return+(g.value*s/e.buyPrice).toFixed(l)},W=e=>{if(!e.buyPrice||!e.amount||e.amount<=0)return null;const n=F(e.buyPrice);return+((c.value*b.value/100-e.buyPrice*e.amount)*-1/e.amount).toFixed(n)},Z=e=>{if(!e.buyPrice||!e.amount||e.amount<=0)return null;const n=F(e.buyPrice);return+((c.value*_.value/100+e.buyPrice*e.amount)/e.amount).toFixed(n)},x=(e,n)=>e.selectedSwitch===n?n==="sl"?"text-red-500":"text-green-500":"text-white",k=p(()=>P.value>0?"text-green-500":P.value<0?"text-red-500":"text-white"),ee=e=>{const n=e.totalActiveTpAndSl;return n>0?"text-green-500":n<0?"text-red-500":"text-white"},y=d(!1),V=d("");let w=null;const te=e=>{V.value="Delete this block?",w=()=>H(e),y.value=!0},se=(e,n)=>{V.value="Delete this order?",w=()=>J(e,n),y.value=!0},ne=()=>{w&&w(),y.value=!1},le=()=>{y.value=!1};return(e,n)=>(v(),m("div",ue,[t("div",de,[t("div",re,[t("div",ce,[t("div",pe,[n[5]||(n[5]=t("div",{class:""},"Deposit, $:",-1)),a(t("input",{id:"deposit",type:"number","onUpdate:modelValue":n[0]||(n[0]=l=>c.value=l),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-right"},null,512),[[u,c.value]])]),t("div",ve,[n[6]||(n[6]=t("div",{class:""},"Leverage:",-1)),a(t("input",{id:"leverage",type:"number","onUpdate:modelValue":n[1]||(n[1]=l=>g.value=l),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-right"},null,512),[[u,g.value]])])]),t("div",me,[t("div",fe,[n[7]||(n[7]=t("div",{class:""},"Margin:",-1)),a(t("input",{id:"coefRisk",type:"number","onUpdate:modelValue":n[2]||(n[2]=l=>h.value=l),step:"0.01",min:"0",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,512),[[u,h.value]])]),t("div",xe,[n[8]||(n[8]=t("div",{class:""},"TP:",-1)),a(t("input",{id:"takeProfit",type:"number","onUpdate:modelValue":n[3]||(n[3]=l=>_.value=l),step:"0.01",min:"0",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,512),[[u,_.value]])]),t("div",ye,[n[9]||(n[9]=t("div",{class:""},"SL:",-1)),a(t("input",{id:"stopLoss",type:"number","onUpdate:modelValue":n[4]||(n[4]=l=>b.value=l),step:"0.01",min:"0",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,512),[[u,b.value]])])]),t("div",ge,[t("div",he,o(T.value)+" $",1),t("div",_e,o(R.value)+" $",1),t("div",be,o(N.value)+" $",1)]),t("div",we,[t("button",{onClick:E,class:"px-2 border border-green-600 font-bold text-green-600"},"ADD"),n[10]||(n[10]=t("div",{class:""},"TP",-1)),t("div",{class:f(k.value)},o(P.value),3)])]),n[13]||(n[13]=t("hr",{class:"border-green-600 mt-1"},null,-1)),t("div",Pe,[t("div",Se,[n[11]||(n[11]=t("div",{class:""},"Symbols:",-1)),t("ul",Ce,[(v(!0),m(U,null,A(G.value,l=>(v(),m("li",{key:l,class:"uppercase"},o(l)+" . ",1))),128))])]),n[12]||(n[12]=t("hr",{class:"border-green-600"},null,-1))])]),t("div",Fe,[(v(!0),m(U,null,A(r.value,l=>(v(),m("div",{key:l.id,class:"px-2 mt-2 text-sm"},[t("div",Ve,[t("div",Ue,[a(t("input",{id:"symbol-"+l.id,type:"text","onUpdate:modelValue":s=>l.symbol=s,placeholder:"Symbol",class:"w-[10ch] px-2 text-center font-bold bg-gray-900 border uppercase"},null,8,Ae),[[u,l.symbol]]),a(t("input",{id:"date-"+l.id,type:"date","onUpdate:modelValue":s=>l.date=s,class:"w-[10ch] bg-gray-900 border text-center"},null,8,Be),[[u,l.date]]),t("div",Oe,[t("span",{class:f(ee(l))},o(l.totalActiveTpAndSl),3)]),t("button",{id:"remove-block-"+l.id,onClick:s=>te(l.id),class:"px-2 font-bold text-red-600 border border-red-600"},"X Block",8,Te),t("button",{id:"add-order-"+l.id,onClick:s=>Y(l),class:"px-2 border border-green-600 font-extrabold text-green-600"}," + ",8,De),y.value?(v(),m("div",je,[t("div",Le,[t("p",$e,o(V.value),1),t("div",{class:"mt-2 flex justify-center space-x-4"},[t("button",{onClick:ne,class:"bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded transition"}," Yes "),t("button",{onClick:le,class:"bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded transition"}," No ")])])])):ae("",!0)]),n[16]||(n[16]=t("hr",{class:"border-gray-600 mt-2 mb-1"},null,-1)),t("div",Ie,[(v(!0),m(U,null,A(l.orders,s=>(v(),m("div",{key:s.id,class:""},[t("div",Me,[t("span",null,o(s.id),1),a(t("input",{id:"buyPrice-"+l.id+"-"+s.id,type:"number","onUpdate:modelValue":i=>s.buyPrice=i,placeholder:"Buy Price",class:"w-[6ch] bg-gray-900 text-center"},null,8,qe),[[u,s.buyPrice]]),a(t("input",{id:"amount-"+l.id+"-"+s.id,type:"number","onUpdate:modelValue":i=>s.amount=i,placeholder:"Amount",class:"w-[6ch] bg-gray-900 text-center"},null,8,Re),[[u,s.amount]]),t("span",Ne,o(C(s)),1),t("div",ze,[t("span",null,"("+o(Q(s))+" - ",1),t("span",null,o(z.value)+")",1)]),t("button",{id:"removeOrder-"+l.id+"-"+s.id,onClick:i=>se(l,s.id),class:"px-2 font-bold text-red-600 border border-red-600"},"X",8,Ge)]),t("div",Xe,[t("div",Ee,[a(t("input",{id:"sl-"+l.id+"-"+s.id,type:"radio",name:"switchGroup"+s.id,"onUpdate:modelValue":i=>s.selectedSwitch=i,value:"sl",class:"accent-red-600"},null,8,He),[[$,s.selectedSwitch]]),t("span",{class:f(x(s,"sl"))},"SL",2)]),a(t("input",{id:"slPrice-"+l.id+"-"+s.id,type:"number","onUpdate:modelValue":i=>s.slPrice=i,onInput:i=>s.sl=j(s),placeholder:"SLprice",class:f(["w-[6ch] bg-gray-900 text-center",x(s,"sl")])},null,42,Ye),[[u,s.slPrice]]),t("span",{class:f(x(s,"sl"))},o(j(s)),3),t("div",Je,[t("span",Ke,"("+o(W(s))+")",1)]),t("div",Qe,[a(t("input",{id:"tp-"+l.id+"-"+s.id,type:"radio",name:"switchGroup"+s.id,"onUpdate:modelValue":i=>s.selectedSwitch=i,value:"tp",class:"accent-green-600"},null,8,We),[[$,s.selectedSwitch]]),t("span",{class:f(x(s,"tp"))},"TP",2)]),a(t("input",{id:"tpPrice-"+l.id+"-"+s.id,type:"number","onUpdate:modelValue":i=>s.tpPrice=i,onInput:i=>s.tp=L(s),placeholder:"TPprice",class:f(["w-[6ch] bg-gray-900 text-center",x(s,"tp")])},null,42,Ze),[[u,s.tpPrice]]),t("span",{class:f(x(s,"tp"))},o(L(s)),3),t("div",ke,[t("span",et,"("+o(Z(s))+")",1)])]),n[14]||(n[14]=t("hr",{class:"border-gray-600"},null,-1))]))),128)),n[15]||(n[15]=t("hr",{class:"border-green-600"},null,-1))])]),n[17]||(n[17]=t("div",{class:"border bg-gray-700 mt-2 text-center"},"--- CHART ---",-1))]))),128))])]))}};export{nt as default};
