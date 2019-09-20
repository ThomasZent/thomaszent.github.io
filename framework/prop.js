var $P={Base:class{static uuidGen(t){return t?(t^16*Math.random()>>t/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,$P.Base.uuidGen)}constructor(){this._uuid=$P.Base.uuidGen()}get uuid(){return this._uuid}},Coord:class{static addCoords(t,s){return new $P.Coord(t.x+s.x,t.y+s.y)}static multCoord(t,s){return new $P.Coord(t.x*s,t.y*s)}static multCoords(t,s){return new $P.Coord(t.x*s.x,t.y*s.y)}static divCoords(t,s){return new $P.Coord(t.x/s.x,t.y/s.y)}static dist(t,s){return Math.sqrt(Math.pow(s.x-t.x,2)+Math.pow(s.y-t.y,2))}constructor(t=0,s=0){this._x=t,this._y=s}set x(t){this._x=t}set y(t){this._y=t}get x(){return this._x}get y(){return this._y}copy(){return new $P.Coord(this._x,this._y)}toArr(){return[this._x,this._y]}},Canvas:class{constructor(t,s=200,e=100){this._id=t,this._el=document.getElementById(t),this._width=s,this._height=e,this._el.width=s,this._el.height=e}set width(t){this._width=t,this._el.width=t}set height(t){this._height=t,this._el.height=t}get width(){return this._width}get height(){return this._height}get el(){return this._el}},updateLoop:function(t,s=4){var e=Date.now();window.setInterval(function(){let s=Date.now(),i=s-e;e=s,t.update(i)},s)}};$P.Prop=class extends $P.Base{static toDegrees(t){return t/Math.PI*180}static toRadians(t){return t/180*Math.PI}static perSecond(t){return t/1e3}constructor(t=new $P.Coord(0,0),s=0,e=[new $P.Coord(-10,-10),new $P.Coord(10,-10),new $P.Coord(10,10),new $P.Coord(-10,10)]){super(),this._pos=t,this._radians=s,this._bounds=e,this._stage}set _x(t){this._pos.x=t}set _y(t){this._pos.y=t}set pos(t){this._pos=t}set x(t){this._pos.x=t}set y(t){this._pos.y=t}set radians(t){this._radians=t}set degrees(t){this._radians=$P.Prop.toRadians(t)}set _degrees(t){this._radians=$P.Prop.toRadians(t)}set bounds(t){this._bounds=t}set stage(t){this._stage=t}get _x(){return this._pos.x}get _y(){return this._pos.y}get pos(){return this._pos}get x(){return this._pos.x}get y(){return this._pos.y}get radians(){return this._radians}get degrees(){return $P.Prop.toDegrees(this._radians)}get _degrees(){return $P.Prop.toDegrees(this._radians)}get bounds(){return this._bounds}get stage(){return this._stage}get index(){return this.stage?this.stage.props.indexOf(this):-1}get _index(){return this.stage?this.stage.props.indexOf(this):-1}move(t){return this._pos=$P.Coord.addCoords(this._pos,t),this._pos}rotate(t){return this._radians+=t,this._radians>=2*Math.PI?(this._radians-=2*Math.PI,this._radians):this._radians<0?(this._radians+=2*Math.PI,this._radians):void 0}rotateDegrees(t){return this._degrees+=t,this._radians>=2*Math.PI?(this._radians-=2*Math.PI,this._degrees):this._radians<0?(this._radians+=2*Math.PI,this._degrees):void 0}beforeUpdate(){}update(t){this.rotateDegrees($P.Prop.perSecond(180)*t)}afterUpdate(){}draw(t,s){t.save(),t.translate(s.x,s.y),t.rotate(this._radians),t.beginPath(),t.moveTo(this._bounds[0].x,this._bounds[0].y);for(var e=1;e<this._bounds.length;e++)t.lineTo(this._bounds[e].x,this._bounds[e].y);t.lineTo(this._bounds[0].x,this._bounds[0].y),t.closePath(),t.stroke(),t.fill(),t.restore()}init(){}destroy(){}},$P.Stage=class extends $P.Base{constructor(){super(),this._props=[]}get props(){return this._props}getIndex(t){return this._props.indexOf(t)}addProp(t,s=-1,e=!1){let i;return s>=0?(this._props.splice(s,0,t),i=this._props.length):i=this._props.push(t),t.stage=this,t.init(e),i}addProps(t,s=-1,e=!1){if(s>=0)for(var i in t)this._props.splice(s,0,t[i]),t[i].stage=this,t[i].init(e);else for(var i in t)this._props.push(t[i]),t[i].stage=this,t[i].init(e);return this._props.length}removeProp(t,s=!1){let e=t.index;return-1!==e&&(this._props[e].destroy(s),this._props[e].stage=null,this._props.splice(e,1),e)}removePropByID(t,s=!1){for(var e in this._props)if(this._props[e].uuid===t){return this._props[e].destroy(s),this._props[e].stage=null,{prop:this._props.splice(e,1)[0],index:e}}return!1}removePropByIndex(t,s=!1){if(this._props[t]){return this._props[t].destroy(s),this._props[t].stage=null,this._props.splice(t,1)[0]}return!1}moveProp(t,s){let e,i=this._props.splice(t,1)[0];return s<0||s>=this._props.length?e=this._props.push(i)-1:(this._props.splice(s,0,i),s)}update(t){for(var s in this._props)this._props[s].beforeUpdate(t);for(s in this._props)this._props[s].update(t);for(s in this._props)this._props[s].afterUpdate(t);return!0}},$P.Camera=class extends $P.Base{constructor(t,s,e=new $P.Coord(-100,-50),i=new $P.Coord(0,0),r=new $P.Coord(200,100),h=new $P.Coord(1,1),o=!0){super(),this._canvas=s,this._ctx=this._canvas.el.getContext("2d"),this._stage=t,this._stagePos=e,this._canvasPos=i,this._dimensions=r,this._scale=h,this._clip=o,this._back="black",this._stroke="",this._lineWidth=1}set canvas(t){this._canvas=t,this._ctx=this._canvas.el.getContext("2d")}set stage(t){this._stage=t}set stagePos(t){this._stagePos=t}set canvasPos(t){this.canvasPos=t}set width(t){this._dimensions.x=t}set height(t){this._dimensions.y=t}set dimensions(t){this._dimensions=t}set scale(t){this._scale=t}set clip(t){this._clip=t}set back(t){this._back=t}set stroke(t){this._stroke=t}set lineWidth(t){this._lineWidth=t}get canvas(){return this._canvas}get stage(){return this._stage}get stagePos(){return this._stagePos}get canvasPos(){return this._canvasPos}get width(){return this._dimensions.x}get height(){return this._dimensions.y}get dimensions(){return this._dimensions}get scale(){return this._scale}get clip(){return this._clip}get back(){return this._back}get stroke(){return this._stroke}get lineWidth(){return this._lineWidth}center(t){return this._stagePos.x=t.x-this._dimensions.x/2,this._stagePos.y=t.y-this._dimensions.y/2,this._stagePos}draw(){for(var t in this._ctx.save(),this._ctx.beginPath(),this._back&&(this._ctx.fillStyle=this._back,this._ctx.fillRect(this._canvasPos.x,this._canvasPos.y,this._dimensions.x,this._dimensions.y)),this._stroke&&(this._ctx.strokeStyle=this._back,this._ctx.lineWidth=this._lineWidth,this._ctx.strokeRect(this._canvasPos.x,this._canvasPos.y,this._dimensions.x,this._dimensions.y)),this._clip&&(this._ctx.rect(this._canvasPos.x,this._canvasPos.y,this._dimensions.x,this._dimensions.y),this._ctx.clip()),this._ctx.scale(this._scale.x,this._scale.y),this._ctx.strokeStyle="black",this._ctx.fillStyle="green",this._stage.props){let s=this._stage.props[t],e=$P.Coord.addCoords(s.pos,$P.Coord.multCoord(this._stagePos,-1));e=$P.Coord.addCoords(e,$P.Coord.divCoords(this._canvasPos,this._scale)),s.draw(this._ctx,e)}this._ctx.closePath(),this._ctx.restore()}};export default $P;