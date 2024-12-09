import{d as E,r as b,c as I,k as M,s as L,o as P,a as _,b as e,h as R,g as c,i as p,u as o,l as k,t as u,F as D,e as q,f as Y,j as G}from"./index-C3ngkTNG.js";import{_ as H}from"./FooterBinance-BH_Q8DKM.js";const T=E("spotBinance",()=>{const g=b(5100),B=b(.02),O=b(1.2);let N=1;const f=b(!1),F=b(""),a=b(null),w=I(()=>Number(g.value*B.value).toFixed(2)),m=b([h()]);function U(){return N++}function h(){const l=U(),r=M({id:l,symbol:"",start:"",end:"",orders:[],isSaved:!1,summary:I(()=>C(r))}),i=V(1);return r.orders.push(i),r}function C(l){const r=l.orders.reduce((v,x)=>v+(x.amount||0),0),i=l.orders.reduce((v,x)=>v+(x.buyOrder||0),0),y=l.orders.reduce((v,x)=>v+(x.sellOrder||0),0),X=l.orders.reduce((v,x)=>v+(x.profit||0),0);return{avgBuyPrice:r?Number((i/r).toFixed(4)):0,avgSellPrice:r?Number((y/r).toFixed(4)):0,totalProfit:Number(X.toFixed(2)),totalBuyOrders:Number(i.toFixed(2)),totalAmount:Number(r.toFixed(3))}}function $(l){return l===1?+w.value:+w.value*Math.pow(O.value,l-1)}function S(l){const r=+l.buyPrice||1,i=+l.sellPrice||null,y=1+.001;l.buyOrder=+($(l.id)*y).toFixed(2),l.amount=+(l.buyOrder/r).toFixed(2),l.sellOrder=i?+(i*l.amount*(1-.001)).toFixed(2):0,l.profit=+(l.sellOrder-l.buyOrder).toFixed(2)}function V(l){return M({id:l,buyPrice:null,sellPrice:null,amount:0,buyOrder:+($(l)*1.001).toFixed(2),sellOrder:0,profit:0,isManualBuyOrder:!1})}function A(l){const r=l.orders.length+1,i=V(r);l.orders.push(i)}function j(){const l=h();m.value.unshift(l)}function t(l){F.value="Delete this block?",a.value=()=>{m.value=m.value.filter(r=>r.id!==l)},f.value=!0}function n(l,r){F.value="Delete this order?",a.value=()=>{const i=m.value.find(y=>y.id===l);i&&(i.orders=i.orders.filter(y=>y.id!==r))},f.value=!0}function s(){a.value&&(a.value(),a.value=null),f.value=!1}function d(){f.value=!1,a.value=null}return{deposit:g,coefRisk:B,firstBuyOrder:w,coefNextBuyOrder:O,activeBlocks:m,showConfirmDialog:f,confirmMessage:F,addBlock:j,addOrder:A,removeBlock:t,removeOrder:n,confirmAction:s,cancelAction:d,recalculateOrder:S,clearBuyPrice:l=>{l.buyPrice=null},clearSellPrice:l=>{l.sellPrice=null}}},{persist:!1}),J={class:"flex justify-between text-center p-1 text-sm"},K={for:"deposit"},Q={for:"coefCost"},W={for:"coefRisk"},Z={class:"mb-2"},ee={class:"flex justify-between"},te=["id","onUpdate:modelValue"],ne=["id","onUpdate:modelValue"],le=["id","onUpdate:modelValue"],se=["id","onClick"],oe=["id","onClick"],re={class:"flex justify-between"},ie=["id","onUpdate:modelValue","onInput","onFocus"],ue=["id","onUpdate:modelValue","onInput","onFocus"],de=["id","onClick"],ae={class:"flex justify-between mt-2 text-center"},ce={class:""},pe={class:""},fe={class:""},me={class:""},ye={class:""},ve={key:0,class:"fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"},xe={class:"bg-gray-700 rounded-lg shadow-lg w-1/2 max-w-md p-2 text-center"},be={class:"text-sm text-white"},ge={class:"mt-2 flex justify-center space-x-4"},Be={class:"fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900"},Fe={__name:"SpotBinance",setup(z){const{deposit:g,coefRisk:B,coefNextBuyOrder:O,firstBuyOrder:N,activeBlocks:f,showConfirmDialog:F,confirmMessage:a}=L(T()),{addBlock:w,addOrder:m,removeBlock:U,removeOrder:h,confirmAction:C,cancelAction:$,recalculateOrder:S,clearBuyPrice:V,clearSellPrice:A}=T();return(j,t)=>(P(),_(D,null,[e("div",null,[e("div",J,[e("div",null,[e("label",K,[t[6]||(t[6]=R("Deposit: ")),c(e("input",{id:"deposit",type:"number","onUpdate:modelValue":t[0]||(t[0]=n=>k(g)?g.value=n:null),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,512),[[p,o(g)]])])]),e("div",null,[e("label",Q,[t[7]||(t[7]=R("CoefCost: ")),c(e("input",{id:"coefCost",type:"number","onUpdate:modelValue":t[1]||(t[1]=n=>k(O)?O.value=n:null),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,512),[[p,o(O)]])])]),e("div",null,[e("label",W,[t[8]||(t[8]=R("CoefRisk: ")),c(e("input",{id:"coefRisk",type:"number","onUpdate:modelValue":t[2]||(t[2]=n=>k(B)?B.value=n:null),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,512),[[p,o(B)]])])]),e("div",null,"First Order: "+u(o(N)),1),e("button",{id:"addBlock",onClick:t[3]||(t[3]=(...n)=>o(w)&&o(w)(...n)),class:"h-8 px-2 text-sm border border-green-600 font-bold text-green-600"}," ADD ")]),t[20]||(t[20]=e("hr",{class:"border-green-600"},null,-1)),(P(!0),_(D,null,q(o(f),n=>(P(),_("div",{key:n.id,class:"p-2 text-sm"},[e("div",Z,[e("div",ee,[c(e("input",{id:`symbol-${n.id}`,type:"text","onUpdate:modelValue":s=>n.symbol=s,placeholder:"Symbol",class:"w-[8ch] bg-gray-900 border text-center border-green-600 text-green-400 uppercase"},null,8,te),[[p,n.symbol]]),c(e("input",{id:`start-${n.id}`,type:"date","onUpdate:modelValue":s=>n.start=s,class:"w-[10ch] bg-gray-900 border text-center"},null,8,ne),[[p,n.start]]),c(e("input",{id:`end-${n.id}`,type:"date","onUpdate:modelValue":s=>n.end=s,class:"w-[10ch] bg-gray-900 border text-center"},null,8,le),[[p,n.end]]),e("button",{id:`removeBlock-${n.id}`,onClick:s=>o(U)(n.id),class:"px-2 font-bold text-red-600 border border-red-600"},"X Block",8,se),e("button",{id:`addOrder-${n.id}`,onClick:s=>o(m)(n),class:"px-2 border border-green-600 font-extrabold text-green-600"},"+",8,oe)])]),(P(!0),_(D,null,q(n.orders,s=>(P(),_("div",{key:s.id,class:"mb-1"},[e("div",re,[e("span",null,u(s.id),1),c(e("input",{id:`buyPrice-${n.id}-${s.id}`,type:"number","onUpdate:modelValue":d=>s.buyPrice=d,placeholder:"Buy Price",class:"w-[6ch] bg-gray-900 text-center text-yellow-400",onInput:d=>o(S)(s),onFocus:d=>o(V)(s)},null,40,ie),[[p,s.buyPrice,void 0,{number:!0}]]),e("span",null,u(s.amount),1),e("span",null,u(s.buyOrder),1),c(e("input",{id:`sellPrice-${n.id}-${s.id}`,type:"number","onUpdate:modelValue":d=>s.sellPrice=d,placeholder:"Sell Price",class:"w-[6ch] bg-gray-900 text-center text-yellow-400",onInput:d=>o(S)(s),onFocus:d=>o(A)(s)},null,40,ue),[[p,s.sellPrice,void 0,{number:!0}]]),e("span",null,u(s.sellOrder),1),e("span",null,u(s.profit),1),e("button",{id:`removeOrder-${n.id} -${s.id}`,onClick:d=>o(h)(n.id,s.id),class:"px-2 border border-red-600 font-bold text-red-600"},"X",8,de)])]))),128)),e("div",ae,[e("div",ce,[t[9]||(t[9]=e("span",null,"Sum, $:",-1)),t[10]||(t[10]=e("br",null,null,-1)),e("span",null,u(n.summary.totalBuyOrders),1)]),e("div",pe,[t[11]||(t[11]=e("span",null,"Buy:",-1)),t[12]||(t[12]=e("br",null,null,-1)),e("span",null,u(n.summary.avgBuyPrice.toFixed(4)),1)]),e("div",fe,[t[13]||(t[13]=e("span",null,"Amount:",-1)),t[14]||(t[14]=e("br",null,null,-1)),e("span",null,u(n.summary.totalAmount),1)]),e("div",me,[t[15]||(t[15]=e("span",null,"Sell:",-1)),t[16]||(t[16]=e("br",null,null,-1)),e("span",null,u(n.summary.avgSellPrice.toFixed(4)),1)]),e("div",ye,[t[17]||(t[17]=e("span",null,"TP:",-1)),t[18]||(t[18]=e("br",null,null,-1)),e("span",null,u(n.summary.totalProfit),1)])]),t[19]||(t[19]=e("hr",{class:"border-green-600 mt-2"},null,-1))]))),128)),o(F)?(P(),_("div",ve,[e("div",xe,[e("p",be,u(o(a)),1),e("div",ge,[e("button",{onClick:t[4]||(t[4]=(...n)=>o(C)&&o(C)(...n)),class:"bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded transition"}," Yes "),e("button",{onClick:t[5]||(t[5]=(...n)=>o($)&&o($)(...n)),class:"bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded transition"}," No ")])])])):Y("",!0)]),e("footer",Be,[G(H)])],64))}};export{Fe as default};
