(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(t,n,e){},19:function(t,n,e){"use strict";e.r(n);var i,o=e(0),r={gameWidth:800,gameHeight:600,reelsPosition:{x:120,y:60},buttonPosition:{x:300,y:440},FPSDisplayPosition:{x:220,y:560},totalReels:5,reelSpinningCycles:2,reelSpinningSpeedFactor:[5,10,15,20,30],totalReelCells:7,reelVisibleCells:3,reelCellHeight:100,reelCellWidth:102,reelVerticalPadding:25,reelHorizontalMargin:15,useEasyMode:!0},s=e.p+"assets/4b47a44dfec58e388f81716668f6b7f3.png",l=e.p+"assets/584548321fda602a2ac4f0965b5ab415.png",c=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)},function(t,n){function e(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}),a=function(t){function n(n){var e=t.call(this)||this;return e.position.set(n.buttonPosition.x,n.buttonPosition.y),e.btnActiveTexture=o.f.from("btnActiveImg"),e.btnInactiveTexture=o.f.from("btnInactiveImg"),e.btn=new o.d(e.btnActiveTexture),e.btn.buttonMode=!0,e.btn.interactive=!0,e.addChild(e.btn),e}return c(n,t),n.prototype.setActive=function(t){this.btn.texture=t?this.btnActiveTexture:this.btnInactiveTexture},n.prototype.onClick=function(t){var n=this;this.btn.on("click",(function(){return t(n)}))},n.load=function(t){t.add("btnActiveImg",s),t.add("btnInactiveImg",l)},n}(o.b),p=e.p+"assets/582cb73eb42daf0a295da68c5156de1d.png",u=function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)};return function(n,e){function i(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}}(),d=function(t){function n(n,e,i,r){void 0===r&&(r=0);var s=this,l=o.f.from("reelCellsImg"),c=e.reelCellHeight,a=e.reelVisibleCells,p=e.reelVerticalPadding,u=e.reelCellWidth,d=e.reelHorizontalMargin,h=e.reelSpinningCycles,f=e.totalReelCells,g=c*a+p;return(s=t.call(this,l,u,g)||this).appTicker=i,s.spinningOutcome=0,s.cellHeight=c,s.horizontalMargin=d,s.spinningCycles=h,s.totalCells=f,s.verticalPadding=p,s.reelIndex=n,s.spinningCyclesMeter=0,s.setTilePositionAt(r),s.setPosition(),s}return u(n,t),n.prototype.setPosition=function(){this.x=this.reelIndex*(this.width+this.horizontalMargin),this.y=0},n.prototype.setTilePositionAt=function(t){this.tilePosition.x=0,this.tilePosition.y=-t*this.cellHeight+Math.ceil(this.verticalPadding/2)},n.prototype.resetSpinningMeter=function(){this.spinningCyclesMeter=this.spinningCycles*this.cellHeight*this.totalCells},n.prototype.setSpinningOutcome=function(t){this.spinningOutcome=t,this.setTilePositionAt(t),this.resetSpinningMeter()},n.prototype.getSpinningOutcome=function(){return this.spinningOutcome},n.prototype.spin=function(t,n,e){var i=this;this.setSpinningOutcome(t);var o=function(){i.spinningCyclesMeter>0?(i.tilePosition.y+=n,i.spinningCyclesMeter-=n):i.spinningCyclesMeter<=0&&(i.spinningCyclesMeter<0&&(i.tilePosition.y+=i.spinningCyclesMeter,i.spinningCyclesMeter=0),i.appTicker.remove(o),e())};this.appTicker.add(o)},n.load=function(t){t.add("reelCellsImg",p)},n}(o.g),h=function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)};return function(n,e){function i(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}}(),f=function(t){function n(n,e){var i=t.call(this)||this;i.items=[],i.spinning=!1,i.totalReels=n.totalReels,i.useEasyMode=n.useEasyMode,i.spinningSpeedFactor=n.reelSpinningSpeedFactor,i.totalReelCells=n.totalReelCells,i.position.set(n.reelsPosition.x,n.reelsPosition.y);for(var o=0;o<i.totalReels;o+=1){var r=new d(o,n,e);i.items.push(r),i.addChild(r)}return i}return h(n,t),n.prototype.spin=function(t){var n=this;this.spinning=!0;for(var e=this.getSpinningOutcome(),i=this.totalReels,o=function(){(i-=1)||(t(),n.spinning=!1,n.checkResults())},r=0;r<this.items.length;r++)this.items[r].spin(e[r],this.spinningSpeedFactor[r],o)},n.prototype.areSpinning=function(){return this.spinning},n.prototype.getSpinningOutcome=function(){var t=[],n=function(t,n){return Math.floor(Math.random()*(n-t+1))+t},e=null;this.useEasyMode&&(n(0,10)<5&&(e=n(0,this.totalReelCells-1)));for(var i=0;i<this.totalReels;i+=1){var o=e||n(0,this.totalReelCells-1);t.push(o)}return t},n.prototype.checkResults=function(){var t=this.items[0].getSpinningOutcome();void 0===this.items.find((function(n){return n.getSpinningOutcome()!==t}))&&alert("You won!")},n.load=function(t){d.load(t)},n}(o.b),g=function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)};return function(n,e){function i(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}}(),y=function(t){function n(n,e){var i=t.call(this)||this;i.textStyle={fontSize:20,fill:16711680},i.position.set(n.FPSDisplayPosition.x,n.FPSDisplayPosition.y);var r=new o.e("",i.textStyle);return i.addChild(r),setInterval((function(){var t=e.FPS.toFixed(2);r.text="Timestamp: "+Date.now()+", FPS: "+t}),1e3),i}return g(n,t),n}(o.b),v=(e(18),r.gameWidth),w=r.gameHeight;window.onload=function(){return t=function(){var t=function(){var t=new o.a({backgroundColor:13882323,width:v,height:w});return t.renderer.resize(window.innerWidth,window.innerHeight),t.stage.scale.x=window.innerWidth/v,t.stage.scale.y=window.innerHeight/w,window.addEventListener("resize",(function(){t.renderer.resize(window.innerWidth,window.innerHeight),t.stage.scale.x=window.innerWidth/v,t.stage.scale.y=window.innerHeight/w})),t}(),n=t.stage,e=new a(r);n.addChild(e);var i=new f(r,t.ticker);n.addChild(i);var s=new y(r,t.ticker);n.addChild(s),e.onClick((function(t){i.areSpinning()||(t.setActive(!1),i.spin((function(){t.setActive(!0)})))})),function(t){document.body.appendChild(t.view)}(t)},n=o.c.shared,a.load(n),f.load(n),n.onComplete.once(t),void n.load();var t,n}}},[[19,1,2]]]);
//# sourceMappingURL=app.86824482bc07bf64fd9c.js.map