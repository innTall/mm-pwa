import{d as ee,r as m,k as te,c as h,w as se,s as ne,o as y,a as x,b as t,g as r,i as p,u as o,l as F,t as a,n as g,F as I,e as H,f as le,v as W,j as ie}from"./index-v05G3KWM.js";import{_ as oe}from"./FooterBitget-e9iSDpjq.js";const Z=ee("marginBitget",()=>{let P=1;const c=m(5100),V=m(10),U=m(5),R=m(20),A=m(5),f=m(2),_=m(null),u=m([L()]),O=m([]),S=h(()=>(c.value*U.value/100).toFixed(2)),q=h(()=>(c.value*A.value/100).toFixed(2)),D=h(()=>(c.value*f.value/100).toFixed(2)),N=h(()=>(V.value*S.value).toFixed(2)),z=h(()=>u.value.reduce((e,i)=>e+i.orders.reduce((n,s)=>(s.selectedSwitch==="tp"&&s.tp?n+=parseFloat(s.tp)||0:s.selectedSwitch==="sl"&&s.sl&&(n+=parseFloat(s.sl)||0),n),0),0).toFixed(2)),G=h(()=>[...O.value].sort((e,i)=>e.localeCompare(i)));function X(){return P++}function T(){O.value=u.value.filter(e=>e.symbol).map(e=>e.symbol)}function L(){const e=te({id:X(),symbol:"",date:"",orders:[],isSaved:!1,totalActiveTpAndSl:h(()=>e.orders.reduce((n,s)=>(s.selectedSwitch==="tp"&&s.tp?n+=parseFloat(s.tp)||0:s.selectedSwitch==="sl"&&s.sl&&(n+=parseFloat(s.sl)||0),n),0).toFixed(2))}),i={id:1,buyPrice:_.value,amount:null,slPrice:null,tpPrice:null,selectedSwitch:null};return e.orders.push(i),se(()=>e.symbol,()=>{T()}),e}function E(){const e=L();u.value.unshift(e),T()}function M(e){u.value=u.value.filter(i=>i.id!==e),T()}function $(e){const i={id:e.orders.length+1,buyPrice:_.value,amount:null,buyOrder:null,amountMath:null,slPrice:null,sl:null,slPriceMath:null,tpPrice:null,tp:null,tpPriceMath:null,selectedSwitch:"sl"};e.orders.push(i);const n=u.value.findIndex(s=>s.id===e.id);if(n!==-1){const[s]=u.value.splice(n,1);u.value.unshift(s)}}function v(e,i){const n=e.orders.findIndex(s=>s.id===i);n!==-1&&e.orders.splice(n,1)}function j(e){return!e.buyPrice||!e.amount?0:(e.buyPrice*e.amount).toFixed(2)}function Y(e){const i=parseFloat(e.slPrice);if(!i||!e.buyPrice||!e.amount)return null;const s=j(e)*.1/100,l=i*e.amount*.1/100;return((i-e.buyPrice)*e.amount-s-l).toFixed(2)}function b(e){const i=parseFloat(e.tpPrice);if(!i||!e.buyPrice||!e.amount)return null;const s=j(e)*.1/100,l=i*e.amount*.1/100;return((i-e.buyPrice)*e.amount-s-l).toFixed(2)}function w(e){return e>=1e4?0:e>=1e3?1:e>=100||e>=10?2:e>=1?3:e>=.1?4:5}function C(e){if(e===0)return 4;if(e===1)return 3;if(e===2)return 2;if(e===3)return 1;if(e>=4)return 0}return{deposit:c,leverage:V,coefRisk:U,coefCost:R,takeProfit:A,stopLoss:f,activeBlocks:u,activeSymbols:O,sortedSymbols:G,totalActiveTpAndSl:z,margin:S,tpCost:q,slCost:D,buyOrderMath:N,addBlock:E,removeBlock:M,addOrder:$,removeOrder:v,calculateBuyOrder:j,calculateSl:Y,calculateTp:b,infoAmount:e=>{if(!e.buyPrice||e.buyPrice<=0)return 0;const i=w(e.buyPrice),n=C(i),s=c.value*U.value/100;return+(V.value*s/e.buyPrice).toFixed(n)},infoSlPrice:e=>{if(!e.buyPrice||!e.amount||e.amount<=0)return null;const i=w(e.buyPrice);return+((c.value*f.value/100-e.buyPrice*e.amount)*-1/e.amount).toFixed(i)},infoTpPrice:e=>{if(!e.buyPrice||!e.amount||e.amount<=0)return null;const i=w(e.buyPrice);return+((c.value*A.value/100+e.buyPrice*e.amount)/e.amount).toFixed(i)}}},{persist:!1}),ae={class:""},ue={class:"flex justify-between p-1 text-sm"},de={class:""},re={class:"flex justify-between"},ce=["id"],pe={class:"flex justify-between"},me=["id"],fe={class:"flex justify-between"},ve=["id"],ye={class:""},xe={class:"flex justify-between"},ge=["id"],he={class:"flex justify-between"},_e=["id"],be={class:"flex justify-between"},we=["id"],Pe={class:""},Se={class:"text-right"},Ce={class:"text-right"},Fe={class:"text-right"},Be={class:"text-center"},Ve={class:"px-1"},Ue={class:"flex gap-2 text-sm"},Ae={class:"flex"},Oe={class:""},Te={class:"flex justify-between"},je=["id","onUpdate:modelValue"],De=["id","onUpdate:modelValue"],Le={class:""},Me=["id","onClick"],$e=["id","onClick"],Ie={key:0,class:"fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"},Re={class:"bg-gray-700 rounded-lg shadow-lg w-1/2 max-w-md p-2 text-center"},qe={class:"text-sm text-white"},Ne={class:"flex justify-between mt-1 items-center"},ze=["id","onUpdate:modelValue"],Ge=["id","onUpdate:modelValue"],Xe={class:""},Ee={class:"text-gray-500 text-xs"},Ye=["id","onClick"],He={class:"flex justify-between mt-1 mb-1 items-center"},Je={class:"flex items-center"},Ke=["id","name","onUpdate:modelValue"],Qe=["id","onUpdate:modelValue","onInput"],We={class:"text-gray-500"},Ze={class:"text-xs"},ke={class:"flex items-center"},et=["id","name","onUpdate:modelValue"],tt=["id","onUpdate:modelValue","onInput"],st={class:"text-gray-500"},nt={class:"text-xs"},lt={class:"fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900"},at={__name:"MarginBitget",setup(k){const{deposit:B,leverage:P,coefRisk:c,margin:V,tpCost:U,slCost:R,buyOrderMath:A,coefCost:f,takeProfit:_,stopLoss:u,activeBlocks:O,totalActiveTpAndSl:S,sortedSymbols:q}=ne(Z()),{addBlock:D,removeBlock:N,addOrder:z,removeOrder:G,calculateBuyOrder:X,infoAmount:T,infoSlPrice:L,infoTpPrice:E,calculateSl:M,calculateTp:$}=Z(),v=(i,n)=>i.selectedSwitch===n?n==="sl"?"text-red-500":"text-green-500":"text-white",j=h(()=>S.value>0?"text-green-500":S.value<0?"text-red-500":"text-white"),Y=i=>{const n=i.totalActiveTpAndSl;return n>0?"text-green-500":n<0?"text-red-500":"text-white"},b=m(!1),w=m("");let C=null;const J=i=>{w.value="Delete this block?",C=()=>N(i),b.value=!0},K=(i,n)=>{w.value="Delete this order?",C=()=>G(i,n),b.value=!0},Q=()=>{C&&C(),b.value=!1},e=()=>{b.value=!1};return(i,n)=>(y(),x(I,null,[t("div",ae,[t("div",ue,[t("div",de,[t("div",re,[n[7]||(n[7]=t("div",{class:""},"Deposit, $:",-1)),r(t("input",{id:"deposit-"+o(B),type:"number","onUpdate:modelValue":n[0]||(n[0]=s=>F(B)?B.value=s:null),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-right"},null,8,ce),[[p,o(B)]])]),t("div",pe,[n[8]||(n[8]=t("div",{class:""},"Leverage:",-1)),r(t("input",{id:"leverage-"+o(P),type:"number","onUpdate:modelValue":n[1]||(n[1]=s=>F(P)?P.value=s:null),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-right"},null,8,me),[[p,o(P)]])]),t("div",fe,[n[9]||(n[9]=t("div",{class:""},"CoefCost, %:",-1)),r(t("input",{id:"coefCost-"+o(f),type:"number","onUpdate:modelValue":n[2]||(n[2]=s=>F(f)?f.value=s:null),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-right"},null,8,ve),[[p,o(f)]])])]),t("div",ye,[t("div",xe,[n[10]||(n[10]=t("div",{class:""},"Margin:",-1)),r(t("input",{id:"coefRisk-"+o(c),type:"number","onUpdate:modelValue":n[3]||(n[3]=s=>F(c)?c.value=s:null),step:"0.01",min:"0",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,8,ge),[[p,o(c)]])]),t("div",he,[n[11]||(n[11]=t("div",{class:""},"TP:",-1)),r(t("input",{id:"takeProfit-"+o(_),type:"number","onUpdate:modelValue":n[4]||(n[4]=s=>F(_)?_.value=s:null),step:"0.01",min:"0",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,8,_e),[[p,o(_)]])]),t("div",be,[n[12]||(n[12]=t("div",{class:""},"SL:",-1)),r(t("input",{id:"stopLoss-"+o(u),type:"number","onUpdate:modelValue":n[5]||(n[5]=s=>F(u)?u.value=s:null),step:"0.01",min:"0",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,8,we),[[p,o(u)]])])]),t("div",Pe,[t("div",Se,a(o(V))+" $",1),t("div",Ce,a(o(U))+" $",1),t("div",Fe,a(o(R))+" $",1)]),t("div",Be,[t("button",{onClick:n[6]||(n[6]=(...s)=>o(D)&&o(D)(...s)),class:"px-2 border border-green-600 font-bold text-green-600"},"ADD"),n[13]||(n[13]=t("div",{class:""},"TP",-1)),t("div",{class:g(j.value)},a(o(S)),3)])]),n[17]||(n[17]=t("hr",{class:"border-green-600 mt-1"},null,-1)),t("div",Ve,[t("div",Ue,[n[14]||(n[14]=t("div",{class:""},"Symbols:",-1)),t("ul",Ae,[(y(!0),x(I,null,H(o(q),s=>(y(),x("li",{key:s,class:"uppercase"},a(s)+" . ",1))),128))])]),n[15]||(n[15]=t("hr",{class:"border-green-600"},null,-1))]),(y(!0),x(I,null,H(o(O),s=>(y(),x("div",{key:s.id,class:"p-2 mt-1 text-sm"},[t("div",Oe,[t("div",Te,[r(t("input",{id:"symbol-"+s.id,type:"text","onUpdate:modelValue":l=>s.symbol=l,placeholder:"Symbol",class:"w-[10ch] px-2 text-center font-bold bg-gray-900 border uppercase"},null,8,je),[[p,s.symbol]]),r(t("input",{id:"date-"+s.id,type:"date","onUpdate:modelValue":l=>s.date=l,class:"w-[10ch] bg-gray-900 border text-center"},null,8,De),[[p,s.date]]),t("div",Le,[t("span",{class:g(Y(s))},a(s.totalActiveTpAndSl),3)]),t("button",{id:"removeBlock-"+s.id,onClick:l=>J(s.id),class:"px-2 font-bold text-red-600 border border-red-600"},"X Block",8,Me),t("button",{id:"addOrder-"+s.id,onClick:l=>o(z)(s),class:"px-2 border border-green-600 font-extrabold text-green-600"}," + ",8,$e),b.value?(y(),x("div",Ie,[t("div",Re,[t("p",qe,a(w.value),1),t("div",{class:"mt-2 flex justify-center space-x-4"},[t("button",{onClick:Q,class:"bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded transition"}," Yes "),t("button",{onClick:e,class:"bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded transition"}," No ")])])])):le("",!0)]),(y(!0),x(I,null,H(s.orders,l=>(y(),x("div",{key:l.id,class:""},[t("div",Ne,[t("span",null,a(l.id),1),r(t("input",{id:"buyPrice-"+s.id+"-"+l.id,type:"number","onUpdate:modelValue":d=>l.buyPrice=d,placeholder:"Buy Price",class:"w-[6ch] bg-gray-900 text-center"},null,8,ze),[[p,l.buyPrice]]),r(t("input",{id:"amount-"+s.id+"-"+l.id,type:"number","onUpdate:modelValue":d=>l.amount=d,placeholder:"Amount",class:"w-[6ch] bg-gray-900 text-center"},null,8,Ge),[[p,l.amount]]),t("span",Xe,a(o(X)(l)),1),t("div",Ee,[t("span",null,"("+a(o(T)(l))+" - ",1),t("span",null,a(o(A))+")",1)]),t("button",{id:"removeOrder-"+s.id+"-"+l.id,onClick:d=>K(s,l.id),class:"px-2 font-bold text-red-600 border border-red-600"},"X",8,Ye)]),t("div",He,[t("div",Je,[r(t("input",{id:"sl-"+s.id+"-"+l.id,type:"radio",name:"switchGroup"+l.id,"onUpdate:modelValue":d=>l.selectedSwitch=d,value:"sl",class:"accent-red-600"},null,8,Ke),[[W,l.selectedSwitch]]),t("span",{class:g(v(l,"sl"))},"SL",2)]),r(t("input",{id:"slPrice-"+s.id+"-"+l.id,type:"number","onUpdate:modelValue":d=>l.slPrice=d,onInput:d=>l.sl=o(M)(l),placeholder:"SLprice",class:g(["w-[6ch] bg-gray-900 text-center",v(l,"sl")])},null,42,Qe),[[p,l.slPrice]]),t("span",{class:g(v(l,"sl"))},a(o(M)(l)),3),t("div",We,[t("span",Ze,"("+a(o(L)(l))+")",1)]),t("div",ke,[r(t("input",{id:"tp-"+s.id+"-"+l.id,type:"radio",name:"switchGroup"+l.id,"onUpdate:modelValue":d=>l.selectedSwitch=d,value:"tp",class:"accent-green-600"},null,8,et),[[W,l.selectedSwitch]]),t("span",{class:g(v(l,"tp"))},"TP",2)]),r(t("input",{id:"tpPrice-"+s.id+"-"+l.id,type:"number","onUpdate:modelValue":d=>l.tpPrice=d,onInput:d=>l.tp=o($)(l),placeholder:"TPprice",class:g(["w-[6ch] bg-gray-900 text-center",v(l,"tp")])},null,42,tt),[[p,l.tpPrice]]),t("span",{class:g(v(l,"tp"))},a(o($)(l)),3),t("div",st,[t("span",nt,"("+a(o(E)(l))+")",1)])])]))),128))]),n[16]||(n[16]=t("hr",{class:"border-green-600"},null,-1))]))),128))]),t("footer",lt,[ie(oe)])],64))}};export{at as default};
