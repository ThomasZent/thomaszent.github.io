$P={},$P.Base=class{static uuidGen(s){return s?(s^16*Math.random()>>s/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,$P.Base.uuidGen)}constructor(){this._uuid=$P.Base.uuidGen()}get uuid(){return this._uuid}},$P.Coord=class{static addCoords(s,t){return new $P.Coord(s.x+t.x,s.y+t.y)}static multCoord(s,t){return new $P.Coord(s.x*t,s.y*t)}static multCoords(s,t){return new $P.Coord(s.x*t.x,s.y*t.y)}constructor(s=0,t=0){this._x=s,this._y=t}set x(s){this._x=s}set y(s){this._y=s}get x(){return this._x}get y(){return this._y}copy(){return new $P.Coord(this._x,this._y)}toArr(){return[this._x,this._y]}},$P.Canvas=class{constructor(s,t=200,e=100){this._id=s,this._el=document.getElementById(s),this._width=t,this._height=e,this._el.width=t,this._el.height=e}set width(s){this._width=s,this._el.width=s}set height(s){this._height=s,this._el.height=s}get width(){return this._width}get height(){return this._height}get el(){return this._el}},$P.updateLoop=function(s,t=4){var e=Date.now();window.setInterval(function(){let t=Date.now(),i=t-e;e=t,s.update(i)},t)},$P.Prop=class extends $P.Base{static toDegrees(s){return s/Math.PI*180}static toRadians(s){return s/180*Math.PI}static perSecond(s){return s/1e3}constructor(s=new $P.Coord(0,0),t=0,e=[new $P.Coord(-10,-10),new $P.Coord(10,-10),new $P.Coord(10,10),new $P.Coord(-10,10)]){super(),this._pos=s,this._radians=t,this._bounds=e,this._stage}set _x(s){this._pos.x=s}set _y(s){this._pos.y=s}set x(s){this._pos.x=s}set y(s){this._pos.y=s}set radians(s){this._radians=s}set degrees(s){this._radians=$P.Prop.toRadians(s)}set _degrees(s){this._radians=$P.Prop.toRadians(s)}set bounds(s){this._bounds=s}set stage(s){this._stage=s}get _x(){return this._pos.x}get _y(){return this._pos.y}get x(){return this._pos.x}get y(){return this._pos.y}get radians(){return this._radians}get degrees(){return $P.Prop.toDegrees(this._radians)}get _degrees(){return $P.Prop.toDegrees(this._radians)}get bounds(){return this._bounds}get stage(){return this._stage}get index(){return this.stage?this.stage.props.indexOf(this):-1}get _index(){return this.stage?this.stage.props.indexOf(this):-1}move(s){return this._pos=$P.Coord.addCoords(this._pos,s),this._pos}rotate(s){return this._radians+=s,this._radians>=2*Math.PI?(this._radians-=2*Math.PI,this._radians):this._radians<0?(this._radians+=2*Math.PI,this._radians):void 0}rotateDegrees(s){return this._degrees+=s,this._radians>=2*Math.PI?(this._radians-=2*Math.PI,this._degrees):this._radians<0?(this._radians+=2*Math.PI,this._degrees):void 0}beforeUpdate(){}update(s){this.rotateDegrees($P.Prop.perSecond(180)*s)}afterUpdate(){}draw(s,t){s.save(),s.translate(t.x,t.y),s.rotate(this._radians),s.beginPath(),s.moveTo(this._bounds[0].x,this._bounds[0].y);for(var e=1;e<this._bounds.length;e++)s.lineTo(this._bounds[e].x,this._bounds[e].y);s.lineTo(this._bounds[0].x,this._bounds[0].y),s.closePath(),s.stroke(),s.fill(),s.restore()}init(){}destroy(){}},$P.Stage=class extends $P.Base{constructor(){super(),this._props=[]}get props(){return this._props}getIndex(s){return this._props.indexOf(s)}addProp(s,t=-1,e=!1){let i;return t>=0?(this._props.splice(t,0,s),i=this._props.length):i=this._props.push(s),s.stage=this,s.init(e),i}addProps(s,t=-1,e=!1){if(t>=0)for(var i in s)this._props.splice(t,0,s[i]),s[i].stage=this,s[i].init(e);else for(var i in s)this._props.push(s[i]),s[i].stage=this,s[i].init(e);return this._props.length}removeProp(s,t=!1){let e=s.index;return-1!==e&&(this._props[e].destroy(t),this._props[e].stage=null,this._props.splice(e,1),e)}removePropByID(s,t=!1){for(var e in this._props)if(this._props[e].uuid===s){return this._props[e].destroy(t),this._props[e].stage=null,{prop:this._props.splice(e,1)[0],index:e}}return!1}removePropByIndex(s,t=!1){if(this._props[s]){return this._props[s].destroy(t),this._props[s].stage=null,this._props.splice(s,1)[0]}return!1}moveProp(s,t){let e,i=this._props.splice(s,1)[0];return t<0||t>=this._props.length?e=this._props.push(i)-1:(this._props.splice(t,0,i),t)}update(s){for(var t in this._props)this._props[t].beforeUpdate(s);for(t in this._props)this._props[t].update(s);for(t in this._props)this._props[t].afterUpdate(s);return!0}},$P.Camera=class extends $P.Base{constructor(s,t,e=new $P.Coord(-100,-50),i=new $P.Coord(0,0),r=new $P.Coord(200,100),h=new $P.Coord(1,1),o=!0){super(),this._canvas=t,this._ctx=this._canvas.el.getContext("2d"),this._stage=s,this._stagePos=e,this._canvasPos=i,this._dimensions=r,this._scale=h,this._clip=o,this._back="black",this._stroke="",this._lineWidth=1}set canvas(s){this._canvas=s,this._ctx=this._canvas.el.getContext("2d")}set stage(s){this._stage=s}set stagePos(s){this._stagePos=s}set canvasPos(s){this.canvasPos=s}set width(s){this._dimensions.x=s}set height(s){this._dimensions.y=s}set dimensions(s){this._dimensions=s}set scale(s){this._scale=s}set clip(s){this._clip=s}set back(s){this._back=s}set stroke(s){this._stroke=s}set lineWidth(s){this._lineWidth=s}get canvas(){return this._canvas}get stage(){return this._stage}get stagePos(){return this._stagePos}get canvasPos(){return this._canvasPos}get width(){return this._dimensions.x}get height(){return this._dimensions.y}get dimensions(){return this._dimensions}get scale(){return this._scale}get clip(){return this._clip}get back(){return this._back}get stroke(){return this._stroke}get lineWidth(){return this._lineWidth}center(s){return this._stagePos.x=s.x-this._dimensions.x/2,this._stagePos.y=s.y-this._dimensions.y/2,this._stagePos}draw(){for(var s in this._ctx.save(),this._ctx.beginPath(),this._back&&(this._ctx.fillStyle=this._back,this._ctx.fillRect(this._canvasPos.x,this._canvasPos.y,this._dimensions.x,this._dimensions.y)),this._stroke&&(this._ctx.strokeStyle=this._stroke,this._ctx.lineWidth=this._lineWidth,this._ctx.strokeRect(this._canvasPos.x,this._canvasPos.y,this._dimensions.x,this._dimensions.y)),this._clip&&(this._ctx.rect(this._canvasPos.x,this._canvasPos.y,this._dimensions.x,this._dimensions.y),this._ctx.clip()),this._ctx.scale(this._scale.x,this._scale.y),this._ctx.strokeStyle="black",this._ctx.fillStyle="green",this._stage.props){let t=this._stage.props[s],e=new $P.Coord(t.x-this._stagePos.x,t.y-this._stagePos.y);e.x+=this._canvasPos.x/this._scale.x,e.y+=this._canvasPos.y/this._scale.y,t.draw(this._ctx,e)}this._ctx.closePath(),this._ctx.restore()}};export{$P as default};