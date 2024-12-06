import{d as h,r as w,c as S,k as D,s as N,o as O,a as B,b as e,h as C,g as u,i as a,u as d,l as U,t as r,F as k,e as A}from"./index-BQiCjAHQ.js";const R=h("spotBitget",()=>{const c=w(1700),m=w(.02),y=w(1.2);let F=1;const f=S(()=>+(c.value*m.value).toFixed(2)),p=w([P()]);function V(){return F++}function P(){const s=V(),o=D({id:s,symbol:"",open:"",close:"",orders:[],isSaved:!1,summary:S(()=>{const i=o.orders.reduce((x,g)=>x+g.tokenAmount,0),$=o.orders.reduce((x,g)=>x+g.buyOrder,0),I=o.orders.reduce((x,g)=>x+g.sellOrder,0),T=o.orders.length>0?o.orders[o.orders.length-1].profit:0;return{avgBuyPrice:i?$/i:0,avgSellPrice:i?I/i:0,totalProfit:T,totalBuyOrders:$,totalTokenAmount:i}})}),b={id:1,buyPrice:1.2345,sellPrice:1.456,tokenAmount:0,buyOrder:f.value,sellOrder:0,profit:0};return v(b,null),o.orders.push(b),o}function v(s,o){o?s.buyOrder=+(o.buyOrder*y.value).toFixed(2):s.buyOrder=+f.value.toFixed(2),s.tokenAmount=+(s.buyOrder/s.buyPrice).toFixed(2),s.sellOrder=+(s.sellPrice*s.tokenAmount*(1-.001)).toFixed(2),s.profit=+(s.sellOrder-s.buyOrder).toFixed(2)}function t(){const s=P();p.value.unshift(s)}function l(s){const o=s.orders[s.orders.length-1],b=+(o.buyPrice-.1).toFixed(4),i={id:s.orders.length+1,buyPrice:b,sellPrice:+(b+.2).toFixed(4),tokenAmount:0,buyOrder:0,sellOrder:0,profit:0};v(i,o),s.orders.push(i)}function n(s){p.value=p.value.filter(o=>o.id!==s)}return{deposit:c,coefOfRisk:m,coefNextOrderCost:y,firstOrderCost:f,activeBlocks:p,addBlock:t,addOrder:l,removeBlock:n}},{persist:!1}),j={class:"flex justify-between text-center p-1 text-sm"},q={for:"deposit"},E={for:"coefCost"},L={for:"coefRisk"},M={class:"mb-2"},z={class:"flex justify-between"},G=["id","onUpdate:modelValue"],H=["id","onUpdate:modelValue"],J=["id","onUpdate:modelValue"],K=["id","onClick"],Q={class:"flex justify-between"},W=["id","onUpdate:modelValue","onInput"],X=["id","onUpdate:modelValue","onInput"],Y=["id","onClick"],Z={class:"flex justify-between mt-2 text-center"},ee={class:""},te={class:""},le={class:""},se={class:""},ne={class:""},re={__name:"SpotBitget",setup(_){const{deposit:c,coefOfRisk:m,coefNextOrderCost:y,firstOrderCost:F,activeBlocks:f}=N(R()),{addBlock:p,addOrder:V,removeBlock:P}=R();return(v,t)=>(O(),B("div",null,[e("div",j,[e("div",null,[e("label",q,[t[4]||(t[4]=C("Deposit: ")),u(e("input",{id:"deposit",type:"number","onUpdate:modelValue":t[0]||(t[0]=l=>U(c)?c.value=l:null),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,512),[[a,d(c)]])])]),e("div",null,[e("label",E,[t[5]||(t[5]=C("CoefCost: ")),u(e("input",{id:"coefCost",type:"number","onUpdate:modelValue":t[1]||(t[1]=l=>U(y)?y.value=l:null),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,512),[[a,d(y)]])])]),e("div",null,[e("label",L,[t[6]||(t[6]=C("CoefRisk: ")),u(e("input",{id:"coefRisk",type:"number","onUpdate:modelValue":t[2]||(t[2]=l=>U(m)?m.value=l:null),step:"1",min:"1",required:"",class:"w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center"},null,512),[[a,d(m)]])])]),e("div",null,"First Order: "+r(d(F)),1),e("button",{id:"addBlock",class:"border px-1 bg-gray-700",onClick:t[3]||(t[3]=(...l)=>d(p)&&d(p)(...l))},"ADD")]),t[18]||(t[18]=e("hr",{class:"border-green-600 mt-2"},null,-1)),(O(!0),B(k,null,A(d(f),l=>(O(),B("div",{key:l.id,class:"p-2 mt-2"},[e("div",M,[e("div",z,[u(e("input",{id:`symbol-${l.id}`,type:"text","onUpdate:modelValue":n=>l.symbol=n,placeholder:"Symbol",class:"w-[8ch] bg-gray-900 border text-center border-green-600 text-green-400 uppercase"},null,8,G),[[a,l.symbol]]),u(e("input",{id:`open-${l.id}`,type:"date","onUpdate:modelValue":n=>l.open=n,class:"w-[10ch] bg-gray-900 border text-center"},null,8,H),[[a,l.open]]),u(e("input",{id:`close-${l.id}`,type:"date","onUpdate:modelValue":n=>l.close=n,class:"w-[10ch] bg-gray-900 border text-center"},null,8,J),[[a,l.close]]),e("button",{id:`removeBlock-${l.id}`,onClick:n=>d(P)(l.id),class:"border bg-gray-700"},"Remove",8,K)])]),(O(!0),B(k,null,A(l.orders,n=>(O(),B("div",{key:n.id,class:"mb-1"},[e("div",Q,[e("span",null,r(n.id),1),u(e("input",{id:`buyPrice-${l.id}-${n.id}`,type:"number","onUpdate:modelValue":s=>n.buyPrice=s,placeholder:"Buy Price",class:"w-[6ch] bg-gray-900 text-center text-yellow-400",onInput:s=>v.recalculateOrder(n)},null,40,W),[[a,n.buyPrice]]),e("span",null,r(n.tokenAmount),1),e("span",null,r(n.buyOrder),1),u(e("input",{id:`sellPrice-${l.id}-${n.id}`,type:"number","onUpdate:modelValue":s=>n.sellPrice=s,placeholder:"Sell Price",class:"w-[6ch] bg-gray-900 text-center text-yellow-400",onInput:s=>v.recalculateOrder(n)},null,40,X),[[a,n.sellPrice]]),e("span",null,r(n.sellOrder),1),e("span",null,r(n.profit),1),e("button",{id:`addOrder-${l.id}`,onClick:s=>d(V)(l),class:"border px-1 bg-gray-700"},"Add Order",8,Y)])]))),128)),e("div",Z,[e("div",ee,[t[7]||(t[7]=e("span",null,"Sum, $:",-1)),t[8]||(t[8]=e("br",null,null,-1)),e("span",null,r(l.summary.totalBuyOrders.toFixed(2)),1)]),e("div",te,[t[9]||(t[9]=e("span",null,"Buy:",-1)),t[10]||(t[10]=e("br",null,null,-1)),e("span",null,r(l.summary.avgBuyPrice.toFixed(4)),1)]),e("div",le,[t[11]||(t[11]=e("span",null,"Amount:",-1)),t[12]||(t[12]=e("br",null,null,-1)),e("span",null,r(l.summary.totalTokenAmount.toFixed(2)),1)]),e("div",se,[t[13]||(t[13]=e("span",null,"Sell:",-1)),t[14]||(t[14]=e("br",null,null,-1)),e("span",null,r(l.summary.avgSellPrice.toFixed(4)),1)]),e("div",ne,[t[15]||(t[15]=e("span",null,"TP:",-1)),t[16]||(t[16]=e("br",null,null,-1)),e("span",null,r(l.summary.totalProfit.toFixed(2)),1)])]),t[17]||(t[17]=e("hr",{class:"border-green-600 mt-2"},null,-1))]))),128))]))}};export{re as default};
