(this.webpackJsonp15k=this.webpackJsonp15k||[]).push([[0],{69:function(e,t,n){},76:function(e,t,n){"use strict";n.r(t);var o=n(5),a=n(0),c=n.n(a),r=n(9),i=n.n(r),u=(n(69),n(20)),s=n(11),l=n(104),d=n(110),f=n(108),j=n(111),b=n(40),O=n.n(b),h=function(e){var t=Object(a.useState)(null),n=Object(s.a)(t,2),c=n[0],r=n[1],i=Object(a.useState)(null),u=Object(s.a)(i,2),b=u[0],h=u[1],m=Object(a.useState)(null),p=Object(s.a)(m,2),v=p[0],g=p[1],y=Object(a.useState)(""),S=Object(s.a)(y,2),x=S[0],E=S[1],w=function(t){t.preventDefault(),e.platform.getSearchService().geocode({q:x},(function(t){var n=t.items[0];if(n){var o=n.position,a=n.title,c=n.address,i=c.county,u=c.postalCode;e.onResult({coords:o,county:i,postalCode:u}),E(a)}else r("Nothing found for this input.")}),(function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.error("GEOCODING ERROR!",t),r("Something went wrong. Please try again.")}))};return Object(a.useEffect)((function(){h(null),g(null),"hotSpot"==e.location.countyStatus?h('\n        The county of "'.concat(e.location.county,'" has been declared a \n        COVID-19 hot spot due to a 7 day incident value of \n        ').concat(Math.round(e.location.incidenceValue)," per 100.000 \n        inhabitants. You may not travel further than 15km from your home \n        at this moment. (Last updated: ").concat(e.location.updatedAt,")\n      ")):e.location.incidenceValue&&g('\n        The county of "'.concat(e.location.county,'" has a 7 day incident value of \n        ').concat(Math.round(e.location.incidenceValue)," per 100.000 inhabitants\n        ").concat("riskArea"==e.location.countyStatus?" and is considered a high risk area.":"."," \n        (Last updated: ").concat(e.location.updatedAt,")\n      "))}),[e.location]),Object(o.jsxs)(l.a,{elevation:3,className:"form",children:[Object(o.jsx)("form",{onSubmit:w,children:Object(o.jsx)(d.a,{fullWidth:!0,label:"Search for address",variant:"outlined",value:x,onChange:function(e){r(!1),E(e.target.value)},onBlur:w,error:!!c})}),b&&Object(o.jsx)(j.a,{severity:"warning",className:"addendum",action:Object(o.jsx)(f.a,{"aria-label":"close",color:"inherit",size:"small",onClick:function(){return h(null)},children:Object(o.jsx)(O.a,{fontSize:"inherit"})}),children:b}),c&&!v&&Object(o.jsx)(j.a,{severity:"error",className:"addendum",action:Object(o.jsx)(f.a,{"aria-label":"close",color:"inherit",size:"small",onClick:function(){return r(null)},children:Object(o.jsx)(O.a,{fontSize:"inherit"})}),children:c}),v&&!b&&Object(o.jsx)(j.a,{severity:"info",className:"addendum",action:Object(o.jsx)(f.a,{"aria-label":"close",color:"inherit",size:"small",onClick:function(){return g(null)},children:Object(o.jsx)(O.a,{fontSize:"inherit"})}),children:v})]})},m=n(53),p=n.n(m),v=n(54),g=n.n(v),y=n(112),S=n(109),x=function(e){var t=Object(a.useState)("car"),n=Object(s.a)(t,2),c=n[0],r=n[1];return Object(o.jsx)(l.a,{elevation:3,className:"travel-mode-select",children:Object(o.jsxs)(y.a,{value:c,exclusive:!0,onChange:function(t,n){r(n),e.onChange(n)},children:[Object(o.jsx)(S.a,{value:"car",children:Object(o.jsx)(p.a,{})}),Object(o.jsx)(S.a,{value:"pedestrian",children:Object(o.jsx)(g.a,{})})]})})},E=n(13),w=function(e){var t=Object(a.useRef)(null),n=Object(a.useState)(null),r=Object(s.a)(n,2),i=r[0],u=r[1],l=Object(a.useState)(null),d=Object(s.a)(l,2),f=d[0],j=d[1];Object(a.useLayoutEffect)((function(){if(t.current){var n=new E.a.service.Platform({apikey:e.apiKey});j(n);var o=n.createDefaultLayers(),a=new E.a.Map(t.current,o.vector.normal.map,{pixelRatio:window.devicePixelRatio,center:e.center,zoom:e.zoom});new E.a.mapevents.Behavior(new E.a.mapevents.MapEvents(a));return u(a),function(){return a.dispose()}}}),[t]),Object(a.useEffect)((function(){if(i){var t=function(e){i.getViewPort().resize()},n=function(t){var n=i.screenToGeo(t.currentPointer.viewportX,t.currentPointer.viewportY);e.onClick(n)};return window.addEventListener("resize",t),i.addEventListener("tap",n),function(){window.removeEventListener("resize",t),i.removeEventListener("tap",n)}}}),[i]),Object(a.useEffect)((function(){i&&(i.setCenter(e.center),e.zoomBounds?i.getViewModel().setLookAtData({bounds:e.zoomBounds}):i.setZoom(e.zoom))}),[e.center,e.zoom,e.zoomBounds]);return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("div",{className:"map",ref:t}),i?function(){var t=e.children;if(t)return c.a.Children.map(t,(function(e){if(e)return c.a.cloneElement(e,{map:i,platform:f})}))}():"Loading\u2026"]})},C=function(e){return Object(a.useEffect)((function(){var t=new E.a.map.Marker(e.location.coords);return e.map.addObject(t),function(){return e.map.removeObject(t)}}),[e.location.coords]),null},k=function(e){var t=Object(a.useState)("#00BEEC"),n=Object(s.a)(t,2),o=n[0],c=n[1];return Object(a.useEffect)((function(){c("hotSpot"==e.location.countyStatus?"#FF443F":"#00BEEC")}),[e.location.countyStatus]),Object(a.useEffect)((function(){var t={fillColor:"rgba(255, 255, 255, 0)",strokeColor:o,lineDash:[3,3],lineWidth:3},n=new E.a.map.Circle(e.location.coords,e.radius,{style:t});return e.map.addObject(n),e.onBoundsChange(n.getBoundingBox()),function(){return e.map.removeObject(n)}}),[e.location,o]),null},z=function(e){var t=Object(a.useState)(null),n=Object(s.a)(t,2),o=n[0],c=n[1],r={lineWidth:0};return Object(a.useEffect)((function(){e.platform.getRoutingService(null,8);var t={start:"geo!".concat(e.location.coords.lat,",").concat(e.location.coords.lng),range:e.range,rangetype:e.rangeType||"distance",mode:"shortest;".concat(e.travelMode)};fetch("https://isoline.route.ls.hereapi.com/routing/7.2/calculateisoline.json?"+function(e){var t="";for(var n in e)""!=t&&(t+="&"),t+=n+"="+encodeURIComponent(e[n]);return t}(Object(u.a)(Object(u.a)({},t),{},{apikey:e.platform.a}))).then((function(e){return e.json()})).then((function(e){var t=e.response.isoline[0].component[0].shape.map((function(e){return e.split(",")})).flat().map((function(e){return+e}));c(E.a.geo.LineString.fromLatLngArray(t))}))}),[e.location.coords,e.range,e.travelMode]),Object(a.useEffect)((function(){if(o){var t=new E.a.map.Polygon(o,e.radius,{style:r});return e.map.addObject(t),function(){return e.map.removeObject(t)}}}),[o]),null},P=function(e){if(!e.hereAPIKey)throw"HERE API Key required.";return[function(t){var n=new E.a.service.Platform({apiKey:e.hereAPIKey}).getSearchService();return new Promise((function(e,o){n.reverseGeocode({at:[t.lat,t.lng,0].join(",")},(function(t){e(t.items[0].address.county)}),o)}))},function(e){return fetch("https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=GEN,cases_per_population,county,last_update,cases7_per_100k,cases_per_100k&returnGeometry=false&outSR=4326&f=json").then((function(e){return e.json()})).then((function(t){return function(e){var t=e.features.map((function(e){var t,n=e.attributes;return[n.GEN,{county:n.GEN,incidenceValue:n.cases7_per_100k,countyStatus:(t=n.cases7_per_100k,t>200?"hotSpot":t>50?"riskArea":"ok"),updatedAt:n.last_update}]}));return Object.fromEntries(t)}(t)[e]}))}]},L="mPpQR16YV3tZ3YpokLwD4hFCEpwCKJWXe9Q-wv4EXIU",B={lat:51.354050638053394,lng:10.688718943513482},A=function(e){var t=Object(a.useState)({coords:B}),n=Object(s.a)(t,2),c=n[0],r=n[1],i=Object(a.useState)("car"),l=Object(s.a)(i,2),d=l[0],f=l[1],j=Object(a.useState)(),b=Object(s.a)(j,2),O=b[0],m=b[1],p=P({hereAPIKey:L}),v=Object(s.a)(p,2),g=v[0],y=v[1];Object(a.useEffect)((function(){navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(e){var t;r({coords:(t=e.coords,{lat:t.latitude,lng:t.longitude})})}))}),[]),Object(a.useEffect)((function(){c.coords&&S()&&!c.county&&g(c.coords).then((function(e){r(Object(u.a)(Object(u.a)({},c),{},{county:e}))})).catch(console.error),c.coords&&c.county&&S()&&!c.countyStatus&&y(c.county).then((function(e){e&&r(Object(u.a)(Object(u.a)({},c),e))}))}),[c]);var S=function(){return!Object.is(c.coords,B)};return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)(w,{center:c.coords,zoom:S()?12:8,zoomBounds:O,onClick:function(){},apiKey:L,children:[S()&&Object(o.jsx)(C,{location:c}),S()&&Object(o.jsx)(k,{location:c,radius:15e3,onBoundsChange:m}),S()&&Object(o.jsx)(z,{location:c,range:15e3,travelMode:d}),Object(o.jsx)(h,{onResult:function(e){var t=e.coords,n=e.county;r({coords:t,county:n})},location:c}),Object(o.jsx)(x,{onChange:f})]})})},R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,114)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),o(e),a(e),c(e),r(e)}))};i.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(A,{})}),document.getElementById("root")),R()}},[[76,1,2]]]);
//# sourceMappingURL=main.6278f9b0.chunk.js.map