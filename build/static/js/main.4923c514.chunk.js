(this["webpackJsonpperf-mon"]=this["webpackJsonpperf-mon"]||[]).push([[0],{40:function(e,t,a){},41:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var s=a(1),c=a.n(s),i=a(32),n=a.n(i),r=(a(40),a(35)),l=a(16),m=(a(41),a(33)),d=a.n(m).a.connect("https://performance-monitor-0.herokuapp.com/");d.emit("clientAuth","askgjhasdfil935871893");var j=d;var o=function(e,t){if(e){var a=e.getContext("2d");a.shadowColor="black",a.shadowBlur=6,a.shadowOffsetX=1,a.shadowOffsetY=1,a.clearRect(0,0,500,500),a.fillStyle="rgba(0, 0, 0, 0.534)",a.beginPath(),a.arc(150,150,90,0*Math.PI,2*Math.PI),a.closePath(),a.fill(),a.lineWidth=10,a.strokeStyle=t<20?"#00ff00":t<40?"#337ab7":t<60?"yellow":"red",a.beginPath(),a.arc(150,150,100,1.5*Math.PI,2*Math.PI*t/100+1.5*Math.PI),a.stroke()}},h=a(0);var b=function(e){var t=document.getElementById("".concat(e.cpuData.cpuWidgetId));return o(t,e.cpuData.cpuLoad),Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{className:"cpu",children:[Object(h.jsxs)("h3",{className:"heading",children:["CPU Load ",Object(h.jsx)("i",{className:"fas fa-server"})]}),Object(h.jsxs)("div",{className:"canvas-wrapper",children:[Object(h.jsx)("canvas",{id:e.cpuData.cpuWidgetId,width:"300",height:"300"}),Object(h.jsxs)("div",{className:"cpu-text",children:[e.cpuData.cpuLoad,"%"]})]})]})})},f=a(34),x=a.n(f);var u=function(e){return Object(h.jsxs)("div",{className:"cpu-info",children:[Object(h.jsxs)("h1",{className:"heading text-center mb-4",children:[" ",Object(h.jsx)("i",{className:"fas fa-info-circle",style:{marginRight:"10px"}}),"System Info"]}),Object(h.jsxs)("h3",{className:"heading",children:["Linux"===e.infoData.osType?Object(h.jsx)("i",{className:"fab fa-linux",style:{marginRight:"5px"}}):Object(h.jsx)("i",{className:"fab fa-windows",style:{marginRight:"5px"}}),"Operating System"]}),Object(h.jsx)("div",{className:"widget-text",children:e.infoData.osType}),Object(h.jsxs)("h3",{className:"heading",children:[Object(h.jsx)("i",{className:"fas fa-clock",style:{marginRight:"5px"}}),"Time Online"]}),Object(h.jsx)("div",{className:"widget-text",children:x.a.duration(1e3*e.infoData.upTime).humanize()}),Object(h.jsxs)("h3",{className:"heading",children:[" ",Object(h.jsx)("i",{className:"fas fa-microchip",style:{marginRight:"5px"}}),"Processor information"]}),Object(h.jsxs)("div",{className:"widget-text",children:[Object(h.jsx)("strong",{children:"Type:"})," ",e.infoData.cpuModel]}),Object(h.jsxs)("div",{className:"widget-text",children:[Object(h.jsx)("strong",{children:"Number of Cores:"})," ",e.infoData.numCores]}),Object(h.jsxs)("div",{className:"widget-text",children:[Object(h.jsx)("strong",{children:"Clock Speed:"})," ",e.infoData.cpuSpeed/1e3,"GHz"]})]})};var O=function(e){var t=e.memData,a=t.totalMem,s=t.freeMem,c=t.memUsage,i=t.memWidgetId,n=document.getElementById("".concat(i));return o(n,100*c),Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{className:"mem",children:[Object(h.jsxs)("h3",{className:"heading",children:["Memory Usage ",Object(h.jsx)("i",{className:"fas fa-memory"})]}),Object(h.jsxs)("div",{className:"canvas-wrapper",children:[Object(h.jsx)("canvas",{id:i,width:"300",height:"300"}),Object(h.jsxs)("div",{className:"mem-text",children:[Math.floor(100*c),"%"]})]}),Object(h.jsxs)("div",{children:["Total Memory: ",Math.floor(a/1073741824*100)/100,"GB"]}),Object(h.jsxs)("div",{children:["Free Memory: ",Math.floor(s/1073741824*100)/100,"GB"]})]})})};a(75);var p=function(e){var t=e.data,a=t.osType,s=t.upTime,c=t.freeMem,i=t.totalMem,n=t.usedMem,r=t.memUsage,l=t.cpuModel,m=t.numCores,d=t.cpuLoad,j=t.cpuSpeed,o=t.macA,f=t.isActive,x="";f||(x=Object(h.jsxs)("div",{className:"not-active",children:[Object(h.jsx)("i",{className:"fas fa-exclamation-triangle m-3"}),"OFFLINE"]}));var p="cpu-widget-".concat(o),g="mem-widget-".concat(o);return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{className:"widget-container",children:[Object(h.jsxs)("h1",{style:{color:"".concat(f?"green":"red")},children:[" ",f?Object(h.jsxs)("span",{style:{fontFamily:"inherit",display:"flex",justifyContent:"center",alignItems:"center"},children:[" ",Object(h.jsx)("i",{className:"fas fa-check-square ",style:{marginRight:"5px"}}),"Active System"," "]}):Object(h.jsxs)("span",{style:{fontFamily:"inherit",display:"flex",justifyContent:"center",alignItems:"center"},children:[" ",Object(h.jsx)("i",{className:"fas fa-times-circle ",style:{marginRight:"5px"}}),"Inactive System"," "]})," "]}),Object(h.jsxs)("div",{className:"widget",children:[x,Object(h.jsx)(b,{cpuData:{cpuLoad:d,cpuWidgetId:p}}),Object(h.jsx)(O,{memData:{totalMem:i,usedMem:n,freeMem:c,memUsage:r,memWidgetId:g}}),Object(h.jsx)(u,{infoData:{macA:o,osType:a,upTime:s,cpuModel:l,numCores:m,cpuSpeed:j}})]})]})})};var g=function(e){var t=Object(s.useState)({}),a=Object(l.a)(t,2),c=a[0],i=a[1];Object(s.useEffect)((function(){return j.on("data",(function(e){i((function(t){var a=Object(r.a)({},t);return a[e.macA]=e,a}))})),function(){j.removeAllListeners("data")}}));var n=Object.entries(c).map((function(e){var t=Object(l.a)(e,2),a=t[0],s=t[1];return Object(h.jsx)(p,{data:s},a)}));return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("nav",{className:"nav",children:[Object(h.jsx)("div",{className:"logo",children:Object(h.jsx)("i",{className:"fas fa-chart-bar"})}),Object(h.jsx)("div",{className:"title",children:"Performance Monitor"}),Object(h.jsxs)("a",{className:"buttons",href:"https://github.com/amanaligit/performance-monitor",children:[Object(h.jsx)("i",{className:"fab fa-github"})," ",Object(h.jsx)("span",{className:"git",children:"Aman's GitHub"})]})]}),Object(h.jsx)("div",{style:{marginTop:"100px"},children:n})]})};n.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(g,{})}),document.getElementById("root"))}},[[76,1,2]]]);
//# sourceMappingURL=main.4923c514.chunk.js.map