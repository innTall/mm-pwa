import{s as R,r as k,o as c,a as m,b as t,l as W,h as a,m as Z,i as p,p as b,j as u,u as o,T as tt,k as O,t as i,F as P,f as T,n as x,g as et,v as j}from"./index-BWSlYKa9.js";import{u as A,_ as st}from"./FooterBinance-p5YQKgQa.js";const lt={class:"container"},nt={class:"container fixed top-20 left-10 bg-gray-800 text-white z-10 border rounded-3xl p-2 w-1/2"},ot={class:"text-right text-xs"},it={for:"depo"},dt={for:"lev"},at={for:"mar"},rt={for:"tp"},ut={for:"sl"},pt={for:"off"},ct={__name:"SettingsBinance",setup(q){const{deposit:f,leverage:y,coefRisk:_,takeProfit:h,stopLoss:w,offlineMode:V}=R(A()),S=k(!1);return(C,e)=>(c(),m("div",lt,[t("button",{onClick:e[0]||(e[0]=d=>S.value=!0),class:"text-sm"},"Set"),(c(),W(tt,{to:"body"},[a(t("div",nt,[t("form",{onSubmit:e[8]||(e[8]=(...d)=>C.submitForm&&C.submitForm(...d))},[t("div",ot,[t("label",it,[e[9]||(e[9]=p("Deposit: ")),a(t("input",{id:"depo",type:"number","onUpdate:modelValue":e[1]||(e[1]=d=>b(f)?f.value=d:null),step:"1",required:"",class:"w-1/4 bg-gray-900 font-bold text-right"},null,512),[[u,o(f)]]),e[10]||(e[10]=p("$ "))]),e[19]||(e[19]=t("br",null,null,-1)),t("label",dt,[e[11]||(e[11]=p("Leverage: ")),a(t("input",{id:"lev",type:"number","onUpdate:modelValue":e[2]||(e[2]=d=>b(y)?y.value=d:null),step:"1",required:"",class:"w-1/4 bg-gray-900 font-bold text-right"},null,512),[[u,o(y)]])]),e[20]||(e[20]=t("br",null,null,-1)),t("label",at,[e[12]||(e[12]=p("Margin: ")),a(t("input",{id:"mar",type:"number","onUpdate:modelValue":e[3]||(e[3]=d=>b(_)?_.value=d:null),step:"1",required:"",class:"w-1/4 bg-gray-900 font-bold text-right"},null,512),[[u,o(_)]]),e[13]||(e[13]=p("% "))]),e[21]||(e[21]=t("br",null,null,-1)),t("label",rt,[e[14]||(e[14]=p("TakeProfit: ")),a(t("input",{id:"tp",type:"number","onUpdate:modelValue":e[4]||(e[4]=d=>b(h)?h.value=d:null),step:"0.1",required:"",class:"w-1/4 bg-gray-900 font-bold text-right"},null,512),[[u,o(h)]]),e[15]||(e[15]=p("% "))]),e[22]||(e[22]=t("br",null,null,-1)),t("label",ut,[e[16]||(e[16]=p("StopLoss: ")),a(t("input",{id:"sl",type:"number","onUpdate:modelValue":e[5]||(e[5]=d=>b(w)?w.value=d:null),step:"0.1",required:"",class:"w-1/4 bg-gray-900 font-bold text-right"},null,512),[[u,o(w)]]),e[17]||(e[17]=p("% "))]),e[23]||(e[23]=t("br",null,null,-1)),t("label",pt,[e[18]||(e[18]=p("Offline Mode: ")),a(t("input",{id:"off",type:"number","onUpdate:modelValue":e[6]||(e[6]=d=>b(V)?V.value=d:null),step:"1",required:"",class:"w-1/4 bg-gray-900 font-bold text-right"},null,512),[[u,o(V)]])])]),t("div",null,[t("button",{onClick:e[7]||(e[7]=d=>S.value=!1),class:"bg-gray-900 p-1 border rounded-md"},"Close")])],32)],512),[[Z,S.value]])]))]))}},mt={class:""},vt={class:"fixed w-full h-16 top-[10] z-10 px-2 bg-gray-900"},xt={class:"flex justify-between gap-1 text-center"},gt={class:"px-2 py-1 border rounded-lg items-center hover:bg-gray-700"},bt={class:""},ft={class:"text-sm"},yt={class:""},_t={class:"text-sm"},ht={class:""},wt={class:"text-sm"},Vt={class:""},St={class:"text-xs"},$t={class:"text-sm"},Ct={class:""},Ut={class:"text-xs"},Pt={class:"text-sm"},Bt={class:""},Tt={class:"h-6 flex gap-2 text-sm items-center"},kt={class:"flex"},At={class:"fixed w-full pt-16 pb-12"},Mt={class:""},Dt={class:"flex justify-between"},Lt=["id","onUpdate:modelValue"],Ot=["id","onUpdate:modelValue"],jt={class:""},Rt=["id","onClick"],qt=["id","onClick"],zt={key:0,class:"fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"},Nt={class:"bg-gray-700 rounded-lg shadow-lg w-1/2 max-w-md p-2 text-center"},Ft={class:"text-sm text-white"},It={class:"max-h-14 overflow-y-auto px-2"},Gt={class:"flex justify-between mt-1 items-center"},Xt=["id","onUpdate:modelValue"],Et=["id","onUpdate:modelValue"],Ht={class:""},Yt={class:"text-gray-500 text-xs"},Jt=["id","onClick"],Kt={class:"flex justify-between mt-1 mb-1 items-center"},Qt={class:"flex items-center"},Wt=["id","name","onUpdate:modelValue"],Zt=["id","onUpdate:modelValue","onInput"],te={class:"text-gray-500"},ee={class:"text-xs"},se={class:"flex items-center"},le=["id","name","onUpdate:modelValue"],ne=["id","onUpdate:modelValue","onInput"],oe={class:"text-gray-500"},ie={class:"text-xs"},de={class:"fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900"},ue={__name:"MarginBinance",setup(q){const{deposit:f,leverage:y,margin:_,tpCost:h,slCost:w,buyOrderMath:V,takeProfit:S,stopLoss:C,activeBlocks:e,sortedSymbols:d}=R(A()),{addBlock:M,removeBlock:z,addOrder:N,removeOrder:F,calculateBuyOrder:I,infoAmount:G,infoSlPrice:X,infoTpPrice:E,calculateSl:D,calculateTp:L}=A(),g=(v,l)=>v.selectedSwitch===l?l==="sl"?"text-red-500":"text-green-500":"text-white",H=v=>{const l=v.totalActiveTpAndSl;return l>0?"text-green-500":l<0?"text-red-500":"text-white"},$=k(!1),B=k("");let U=null;const Y=v=>{B.value="Delete this block?",U=()=>z(v),$.value=!0},J=(v,l)=>{B.value="Delete this order?",U=()=>F(v,l),$.value=!0},K=()=>{U&&U(),$.value=!1},Q=()=>{$.value=!1};return(v,l)=>(c(),m(P,null,[t("div",mt,[t("div",vt,[t("div",xt,[t("div",gt,[O(ct)]),t("div",bt,[l[1]||(l[1]=t("div",{class:"text-xs"},"Depo",-1)),t("div",ft,i(o(f))+"$",1)]),t("div",yt,[l[2]||(l[2]=t("div",{class:"text-xs"},"Lever",-1)),t("div",_t,i(o(y)),1)]),t("div",ht,[l[3]||(l[3]=t("div",{class:"text-xs"},"Margin",-1)),t("div",wt,i(o(_))+"$",1)]),t("div",Vt,[t("div",St,"TP-"+i(o(S))+"%",1),t("div",$t,i(o(h))+"$",1)]),t("div",Ct,[t("div",Ut,"SL-"+i(o(C))+"%",1),t("div",Pt,i(o(w))+"$",1)]),t("button",{onClick:l[0]||(l[0]=(...n)=>o(M)&&o(M)(...n)),class:"px-2 py-1 text-sm border rounded-lg hover:bg-gray-700"},"Add")]),l[6]||(l[6]=t("hr",{class:"border-green-600 mt-1"},null,-1)),t("div",Bt,[t("div",Tt,[l[4]||(l[4]=t("div",{class:""},"Symbols:",-1)),t("ul",kt,[(c(!0),m(P,null,T(o(d),n=>(c(),m("li",{key:n,class:"uppercase"},i(n)+" . ",1))),128))])]),l[5]||(l[5]=t("hr",{class:"border-green-600"},null,-1))])]),t("div",At,[(c(!0),m(P,null,T(o(e),n=>(c(),m("div",{key:n.id,class:"px-2 mt-2 text-sm"},[t("div",Mt,[t("div",Dt,[a(t("input",{id:"symbol-"+n.id,type:"text","onUpdate:modelValue":s=>n.symbol=s,placeholder:"Symbol",class:"w-[10ch] px-2 text-center font-bold bg-gray-900 border uppercase"},null,8,Lt),[[u,n.symbol]]),a(t("input",{id:"date-"+n.id,type:"date","onUpdate:modelValue":s=>n.date=s,class:"w-[10ch] bg-gray-900 border text-center"},null,8,Ot),[[u,n.date]]),t("div",jt,[t("span",{class:x(H(n))},i(n.totalActiveTpAndSl),3)]),t("button",{id:"remove-block-"+n.id,onClick:s=>Y(n.id),class:"px-2 font-bold text-red-600 border border-red-600"},"X Block",8,Rt),t("button",{id:"add-order-"+n.id,onClick:s=>o(N)(n),class:"px-2 border border-green-600 font-extrabold text-green-600"}," + ",8,qt),$.value?(c(),m("div",zt,[t("div",Nt,[t("p",Ft,i(B.value),1),t("div",{class:"mt-2 flex justify-center space-x-4"},[t("button",{onClick:K,class:"bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded transition"}," Yes "),t("button",{onClick:Q,class:"bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded transition"}," No ")])])])):et("",!0)]),l[9]||(l[9]=t("hr",{class:"border-gray-600 mt-2 mb-1"},null,-1)),t("div",It,[(c(!0),m(P,null,T(n.orders,s=>(c(),m("div",{key:s.id,class:""},[t("div",Gt,[t("span",null,i(s.id),1),a(t("input",{id:"buyPrice-"+n.id+"-"+s.id,type:"number","onUpdate:modelValue":r=>s.buyPrice=r,placeholder:"Buy Price",class:"w-[6ch] bg-gray-900 text-center"},null,8,Xt),[[u,s.buyPrice]]),a(t("input",{id:"amount-"+n.id+"-"+s.id,type:"number","onUpdate:modelValue":r=>s.amount=r,placeholder:"Amount",class:"w-[6ch] bg-gray-900 text-center"},null,8,Et),[[u,s.amount]]),t("span",Ht,i(o(I)(s)),1),t("div",Yt,[t("span",null,"("+i(o(G)(s))+" - ",1),t("span",null,i(o(V))+")",1)]),t("button",{id:"removeOrder-"+n.id+"-"+s.id,onClick:r=>J(n,s.id),class:"px-2 font-bold text-red-600 border border-red-600"},"X",8,Jt)]),t("div",Kt,[t("div",Qt,[a(t("input",{id:"sl-"+n.id+"-"+s.id,type:"radio",name:"switchGroup"+s.id,"onUpdate:modelValue":r=>s.selectedSwitch=r,value:"sl",class:"accent-red-600"},null,8,Wt),[[j,s.selectedSwitch]]),t("span",{class:x(g(s,"sl"))},"SL",2)]),a(t("input",{id:"slPrice-"+n.id+"-"+s.id,type:"number","onUpdate:modelValue":r=>s.slPrice=r,onInput:r=>s.sl=o(D)(s),placeholder:"SLprice",class:x(["w-[6ch] bg-gray-900 text-center",g(s,"sl")])},null,42,Zt),[[u,s.slPrice]]),t("span",{class:x(g(s,"sl"))},i(o(D)(s)),3),t("div",te,[t("span",ee,"("+i(o(X)(s))+")",1)]),t("div",se,[a(t("input",{id:"tp-"+n.id+"-"+s.id,type:"radio",name:"switchGroup"+s.id,"onUpdate:modelValue":r=>s.selectedSwitch=r,value:"tp",class:"accent-green-600"},null,8,le),[[j,s.selectedSwitch]]),t("span",{class:x(g(s,"tp"))},"TP",2)]),a(t("input",{id:"tpPrice-"+n.id+"-"+s.id,type:"number","onUpdate:modelValue":r=>s.tpPrice=r,onInput:r=>s.tp=o(L)(s),placeholder:"TPprice",class:x(["w-[6ch] bg-gray-900 text-center",g(s,"tp")])},null,42,ne),[[u,s.tpPrice]]),t("span",{class:x(g(s,"tp"))},i(o(L)(s)),3),t("div",oe,[t("span",ie,"("+i(o(E)(s))+")",1)])]),l[7]||(l[7]=t("hr",{class:"border-gray-600"},null,-1))]))),128)),l[8]||(l[8]=t("hr",{class:"border-green-600"},null,-1))])]),l[10]||(l[10]=t("div",{class:"h-64 w-full border bg-gray-700 mt-2 text-center"},"--- CHART ---",-1))]))),128))])]),t("footer",de,[O(st)])],64))}};export{ue as default};
