(()=>{var e={};e.id=883,e.ids=[883],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1345:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>i.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d}),a(2185),a(1506),a(9644),a(5866);var s=a(3191),r=a(8716),l=a(7922),i=a.n(l),n=a(5231),o={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>n[e]);a.d(t,o);let d=["",{children:["map",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,2185)),"/media/github/skool.ai/school-marketplace/app/map/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,1506)),"/media/github/skool.ai/school-marketplace/app/layout.tsx"],loading:[()=>Promise.resolve().then(a.bind(a,9644)),"/media/github/skool.ai/school-marketplace/app/loading.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}],c=["/media/github/skool.ai/school-marketplace/app/map/page.tsx"],p="/map/page",m={require:a,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/map/page",pathname:"/map",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},8369:(e,t,a)=>{Promise.resolve().then(a.bind(a,469))},469:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>z});var s=a(326),r=a(7577),l=a(5047),i=a(434),n=a(3265),o=a(5795),d=a(9086),c=a(6333),p=a(9389),m=a(7636),u=a(7650),x=a(3734),h=a(4019),f=a(1664),b=a(2018),g=a(8951),j=a(5800);let y=(0,n.default)(async()=>{},{loadableGenerated:{modules:["app/map/page.tsx -> react-leaflet"]},ssr:!1}),v=(0,n.default)(async()=>{},{loadableGenerated:{modules:["app/map/page.tsx -> react-leaflet"]},ssr:!1}),N=(0,n.default)(async()=>{},{loadableGenerated:{modules:["app/map/page.tsx -> react-leaflet"]},ssr:!1}),k=(0,n.default)(async()=>{},{loadableGenerated:{modules:["app/map/page.tsx -> react-leaflet"]},ssr:!1}),w=e=>{let t=Math.round(e/12);return t>=1e5?`₹${(t/1e5).toFixed(1)}L`:t>=1e3?`₹${(t/1e3).toFixed(0)}K`:`₹${t.toLocaleString()}`},_=(0,n.default)(async()=>{},{loadableGenerated:{modules:["app/map/page.tsx -> leaflet"]},ssr:!1});function z(){let e=(0,l.useRouter)(),[t,a]=(0,r.useState)(null),[n,z]=(0,r.useState)(!1),[P,Z]=(0,r.useState)(null);return(0,s.jsxs)("div",{className:"min-h-screen bg-background",children:[s.jsx(o.E.header,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},className:"fixed top-0 left-0 right-0 z-[1000] bg-card/95 backdrop-blur-md border-b border-border safe-top",children:(0,s.jsxs)("div",{className:"flex items-center justify-between px-4 h-14",children:[s.jsx(f.z,{variant:"ghost",size:"icon",onClick:()=>e.back(),children:s.jsx(c.Z,{className:"w-5 h-5"})}),(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[s.jsx("div",{className:"w-2 h-2 bg-success rounded-full animate-pulse"}),s.jsx("h1",{className:"font-semibold text-foreground",children:"Schools Near You"})]}),s.jsx(f.z,{variant:"ghost",size:"icon",asChild:!0,children:s.jsx(i.default,{href:"/schools",children:s.jsx(p.Z,{className:"w-5 h-5"})})})]})}),s.jsx(o.E.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{delay:.1},className:"fixed top-14 left-0 right-0 z-[999] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border-b border-border/50 px-4 py-2",children:(0,s.jsxs)("div",{className:"flex items-center justify-between max-w-lg mx-auto",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 text-sm",children:[s.jsx(m.Z,{className:"w-4 h-4 text-primary"}),(0,s.jsxs)("span",{className:"text-muted-foreground",children:[s.jsx("span",{className:"font-semibold text-foreground",children:g.X_.length})," schools found"]})]}),(0,s.jsxs)("div",{className:"flex items-center gap-2 text-sm text-muted-foreground",children:[s.jsx(u.Z,{className:"w-4 h-4"}),"Delhi NCR"]})]})}),s.jsx("div",{className:"pt-[104px] pb-24 h-screen",children:n&&P?(0,s.jsxs)(y,{center:[28.5494,77.209],zoom:11,className:"w-full h-full z-0",scrollWheelZoom:!0,zoomControl:!1,children:[s.jsx(v,{attribution:'\xa9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),s.jsx(_,{schools:g.X_}),g.X_.map(e=>s.jsx(N,{position:[e.lat,e.lng],icon:P,eventHandlers:{click:()=>a(e)},children:s.jsx(k,{className:"school-popup",children:(0,s.jsxs)("div",{className:"p-0 min-w-[260px] overflow-hidden rounded-2xl",children:[(0,s.jsxs)("div",{className:"relative h-32",children:[s.jsx("img",{src:e.images[0],alt:e.name,className:"w-full h-full object-cover"}),s.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"}),(0,s.jsxs)("div",{className:"absolute top-2 right-2 flex items-center gap-1 bg-success/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold",children:[s.jsx(x.Z,{className:"w-3 h-3 fill-current"}),e.rating]}),(0,s.jsxs)("div",{className:"absolute bottom-2 left-2 right-2",children:[s.jsx("h3",{className:"font-bold text-white text-sm line-clamp-1",children:e.name}),s.jsx("p",{className:"text-white/80 text-xs line-clamp-1",children:e.address})]})]}),(0,s.jsxs)("div",{className:"p-3 bg-card",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[s.jsx("span",{className:"px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded",children:e.board}),(0,s.jsxs)("span",{className:"text-xs text-muted-foreground",children:[e.distance," km"]})]}),(0,s.jsxs)("span",{className:"text-primary font-bold text-sm",children:[w(e.annualFee),"/mo"]})]}),s.jsx(i.default,{href:`/school/${e.slug}`,children:s.jsx(f.z,{className:"w-full h-9 text-xs font-bold rounded-xl",children:"View School"})})]})]})})},e.id))]}):s.jsx("div",{className:"flex flex-col items-center justify-center h-full",children:s.jsx(j.$,{size:48})})}),s.jsx(d.M,{children:t&&s.jsx(o.E.div,{initial:{y:100,opacity:0},animate:{y:0,opacity:1},exit:{y:100,opacity:0},className:"fixed bottom-28 left-4 right-4 z-[1000]",children:(0,s.jsxs)("div",{className:"relative bg-card/95 backdrop-blur-md rounded-2xl shadow-premium border border-white/10 p-4",children:[s.jsx("button",{onClick:()=>a(null),className:"absolute top-2 right-2 p-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors",children:s.jsx(h.Z,{className:"w-4 h-4 text-muted-foreground"})}),s.jsx(i.default,{href:`/school/${t.slug}`,children:(0,s.jsxs)("div",{className:"flex gap-4",children:[s.jsx("img",{src:t.images[0],alt:t.name,className:"w-20 h-20 rounded-xl object-cover shrink-0"}),(0,s.jsxs)("div",{className:"flex-1 min-w-0",children:[s.jsx("div",{className:"flex items-start justify-between gap-2 mb-1",children:s.jsx("h3",{className:"font-bold text-foreground truncate pr-6",children:t.name})}),(0,s.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,s.jsxs)("div",{className:"flex items-center gap-1 bg-success/10 text-success px-2 py-0.5 rounded text-xs font-semibold",children:[s.jsx(x.Z,{className:"w-3 h-3 fill-current"}),t.rating]}),s.jsx("span",{className:"text-xs px-2 py-0.5 bg-muted rounded font-medium",children:t.board})]}),(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("span",{className:"text-primary font-bold text-sm",children:[w(t.annualFee),"/month"]}),(0,s.jsxs)("span",{className:"text-xs text-muted-foreground",children:[t.distance," km away"]})]})]})]})})]})})}),s.jsx(b.Z,{}),s.jsx("style",{children:`
        .custom-school-marker {
          background: transparent;
          border: none;
        }
        .marker-container {
          position: relative;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .marker-glow {
          position: absolute;
          width: 36px;
          height: 36px;
          background: hsl(var(--primary));
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.4;
          animation: marker-pulse 2s infinite;
        }
        .marker-core {
          position: relative;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2);
          z-index: 2;
          transition: transform 0.2s ease;
        }
        .marker-core:hover {
          transform: scale(1.1);
        }
        .marker-icon {
          width: 18px;
          height: 18px;
          color: white;
        }
        @keyframes marker-pulse {
          0% { transform: scale(0.8); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.4; }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 1rem;
          padding: 0;
          overflow: hidden;
          background: transparent !important;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .leaflet-popup-tip-container {
          margin-top: -1px;
        }
        .leaflet-popup-tip {
          background: hsl(var(--card)) !important;
        }
        .school-popup .leaflet-popup-close-button {
          display: none !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
        }
        .leaflet-control-zoom a {
          background: hsl(var(--card)) !important;
          color: hsl(var(--foreground)) !important;
          border: none !important;
        }
        .leaflet-control-zoom a:hover {
          background: hsl(var(--muted)) !important;
        }
      `})]})}},6333:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});let s=(0,a(2881).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},9389:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});let s=(0,a(2881).Z)("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]])},7506:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});let s=(0,a(2881).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},7650:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});let s=(0,a(2881).Z)("Navigation",[["polygon",{points:"3 11 22 2 13 21 11 13 3 11",key:"1ltx0t"}]])},3265:(e,t,a)=>{"use strict";a.d(t,{default:()=>r.a});var s=a(3353),r=a.n(s)},3353:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return l}});let s=a(1174);a(326),a(7577);let r=s._(a(7028));function l(e,t){var a;let s={loading:e=>{let{error:t,isLoading:a,pastDelay:s}=e;return null}};"function"==typeof e&&(s.loader=e);let l={...s,...t};return(0,r.default)({...l,modules:null==(a=l.loadableGenerated)?void 0:a.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7028:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let s=a(326),r=a(7577),l=a(933),i=a(6618);function n(e){return{default:e&&"default"in e?e.default:e}}let o={loader:()=>Promise.resolve(n(()=>null)),loading:null,ssr:!0},d=function(e){let t={...o,...e},a=(0,r.lazy)(()=>t.loader().then(n)),d=t.loading;function c(e){let n=d?(0,s.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,o=t.ssr?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.PreloadCss,{moduleIds:t.modules}),(0,s.jsx)(a,{...e})]}):(0,s.jsx)(l.BailoutToCSR,{reason:"next/dynamic",children:(0,s.jsx)(a,{...e})});return(0,s.jsx)(r.Suspense,{fallback:n,children:o})}return c.displayName="LoadableComponent",c}},2018:(e,t,a)=>{"use strict";a.d(t,{Z:()=>h});var s=a(326),r=a(9798),l=a(8307),i=a(6283),n=a(7636),o=a(7427),d=a(9635),c=a(434),p=a(5047),m=a(1223),u=a(5795);let x=[{icon:r.Z,label:"Home",path:"/"},{icon:l.Z,label:"Search",path:"/schools"},{icon:i.Z,label:"Applied",path:"/applied"},{icon:n.Z,label:"Map",path:"/map"},{icon:o.Z,label:"Saved",path:"/saved"},{icon:d.Z,label:"Profile",path:"/profile"}],h=()=>{let e=(0,p.usePathname)();return s.jsx("div",{className:"fixed bottom-16 left-0 right-0 z-50 px-4 md:px-0 pb-[env(safe-area-inset-bottom)]",children:s.jsx("nav",{className:"max-w-md mx-auto glass rounded-2xl shadow-premium border-white/20 px-2 py-2",children:s.jsx("div",{className:"flex items-center justify-around h-14",children:x.map(t=>{let a=e===t.path;return(0,s.jsxs)(c.default,{href:t.path,className:"relative flex flex-col items-center justify-center min-w-[64px] transition-all duration-300",children:[a&&s.jsx(u.E.div,{layoutId:"active-tab",className:"absolute inset-0 bg-primary/10 rounded-xl -z-10",transition:{type:"spring",bounce:.2,duration:.6}}),(0,s.jsxs)(u.E.div,{whileTap:{scale:.9},className:(0,m.cn)("flex flex-col items-center gap-1",a?"text-primary":"text-muted-foreground"),children:[s.jsx(t.icon,{className:(0,m.cn)("w-5 h-5 transition-all duration-300",a&&"scale-110 drop-shadow-[0_0_8px_rgba(226,55,68,0.3)]"),strokeWidth:a?2.5:2}),s.jsx("span",{className:(0,m.cn)("text-[10px] font-medium transition-all duration-300",a?"opacity-100 translate-y-0":"opacity-70"),children:t.label})]}),a&&s.jsx(u.E.div,{layoutId:"active-indicator",className:"absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(226,55,68,0.8)]"})]},t.path)})})})})}},5800:(e,t,a)=>{"use strict";a.d(t,{$:()=>i});var s=a(326),r=a(7506),l=a(1223);let i=({size:e=24,className:t,...a})=>s.jsx("div",{className:(0,l.cn)("flex justify-center items-center",t),...a,children:s.jsx(r.Z,{className:"animate-spin text-primary",size:e})})},2185:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>s});let s=(0,a(8570).createProxy)(String.raw`/media/github/skool.ai/school-marketplace/app/map/page.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[890,331,882,951],()=>a(1345));module.exports=s})();