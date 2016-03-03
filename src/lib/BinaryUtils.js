(function (console, $hx_exports) { "use strict";
$hx_exports.by = $hx_exports.by || {};
$hx_exports.by.utils = $hx_exports.by.utils || {};
var by = {};
by.utils = {};
by.utils.BinaryUtils = $hx_exports.by.utils.BinaryUtils = function() { };
by.utils.BinaryUtils.addCommand = function(mainCmdId,subCmdId,structBodys,group) {
	if(group == null) group = "login";
	var body = null;
	var type = 0;
	var len = 0;
	var _g1 = 0;
	var _g = structBodys.length;
	while(_g1 < _g) {
		var i = _g1++;
		body = structBodys[i];
		type = body.type;
		switch(type) {
		case 1:case 2:
			body.length = 1;
			break;
		case 4:case 8:
			body.length = 2;
			break;
		case 16:case 32:case 64:case 128:
			body.length = 4;
			break;
		case 256:case 512:
			body.length = 8;
			break;
		case 1024:
			if(!body.length) throw "消息 mainCmdId:" + mainCmdId + ",subCmdId:" + mainCmdId + " name:" + body.name + "缺少length 属性";
			break;
		case 2048:
			if(!body.set) throw "消息 mainCmdId:" + mainCmdId + ",subCmdId:" + mainCmdId + " name:" + body.name + "缺少set 属性 例:set:[mainCmdId,subCmdId,'login']";
			var tmp_group;
			if(body.set.length > 2) tmp_group = body.set[2]; else tmp_group = "login";
			var tmp_body = by.utils.BinaryUtils.getCmd(tmp_group + "_" + body.set[0] + "_" + body.set[1]);
			if(tmp_body == null) throw "消息 [mainCmdId:" + mainCmdId + ",subCmdId:" + mainCmdId + "] name:" + body.name + "未找到 嵌套消息 [mainCmdId:" + body.set[0] + ",subCmdId:" + body.set[1] + ", group:" + tmp_group + "] 描述";
			body.cmd = tmp_group + "_" + body.set[0] + "_" + body.set[1];
			body.length = tmp_body.len;
			break;
		default:
			if(!body.array) throw "消息 mainCmdId:" + mainCmdId + ",subCmdId:" + mainCmdId + " name:" + body.name + "缺少array 属性 例:array:[5,5] array:[5] 等";
			var _type = type - (type & 4096);
			var _len = 0;
			var _size = body.array.length;
			var _array = body.array;
			switch(_type) {
			case 1:case 2:
				_len = 1;
				break;
			case 4:case 8:
				_len = 2;
				break;
			case 16:case 32:case 64:case 128:
				_len = 4;
				break;
			case 256:case 512:
				_len = 8;
				break;
			case 2048:
				if(!body.set) throw "消息 mainCmdId:" + mainCmdId + ",subCmdId:" + mainCmdId + " name:" + body.name + "缺少set 属性 例:set:[mainCmdId,subCmdId,'login'] 等";
				var tmp_group1;
				if(body.set.length > 2) tmp_group1 = body.set[2]; else tmp_group1 = "login";
				var tmp_body1 = by.utils.BinaryUtils.getCmd(tmp_group1 + "_" + body.set[0] + "_" + body.set[1]);
				if(tmp_body1 == null) throw "消息 [mainCmdId:" + mainCmdId + ",subCmdId:" + mainCmdId + "] name:" + body.name + "未找到 嵌套消息 [mainCmdId:" + body.set[0] + ",subCmdId:" + body.set[1] + ", group:" + tmp_group1 + "] 描述";
				body.cmd = tmp_group1 + "_" + body.set[0] + "_" + body.set[1];
				_len = tmp_body1.len;
				break;
			}
			body.len = _len;
			var s_count = 1;
			var _g2 = 0;
			while(_g2 < _size) {
				var j = _g2++;
				s_count = s_count * _array[j];
			}
			body.count = s_count;
			body.length = _len * s_count;
			if(body.mode == undefined) body.mode = "comLength";
		}
		len += body.length;
	}
	by.utils.BinaryUtils.structs[group + "_" + mainCmdId + "_" + subCmdId] = { body : structBodys, len : len};
};
by.utils.BinaryUtils.getCmd = function(cmdName) {
	var body = by.utils.BinaryUtils.structs[cmdName];
	if(!body) return null;
	return body;
};
by.utils.BinaryUtils.getCommand = function(mainCmdId,subCmdId,gropup) {
	if(gropup == null) gropup = "login";
	return by.utils.BinaryUtils.getCmd(gropup + "_" + mainCmdId + "_" + subCmdId);
};
by.utils.BinaryUtils.buffer2Obj = function(buffer,group) {
	if(group == null) group = "login";
	var uint8Array = new Uint8Array(buffer);
	return by.utils.BinaryUtils.uin8Array2Obj(uint8Array,group);
};
by.utils.BinaryUtils.uin8Array2Obj = function(uint8Array,group) {
	if(group == null) group = "login";
	var dataKind = uint8Array[0];
	if(dataKind & 4) uint8Array = by.utils.BinaryUtils.UnCompressBuffer(uint8Array);
	if(dataKind & 1) by.utils.BinaryUtils.unMapBuffer(uint8Array);
	var dataView = new DataView(uint8Array.buffer);
	var c_main = dataView.getUint16(4,true);
	var c_sub = dataView.getUint16(6,true);
	cc.log("解析====================================:",c_main,c_sub,group,uint8Array.length,uint8Array.buffer.byteLength,group + "_" + c_main + "_" + c_sub);
	var structBodys = by.utils.BinaryUtils.getCmd(group + "_" + c_main + "_" + c_sub);
	if(structBodys == null || structBodys.body == null) return { mainCmdId : c_main, subCmdId : c_sub, body : null};
	var len = structBodys.body.length;
	if(len > 0) {
		var obj = by.utils.BinaryUtils.bytes2Obj(dataView,structBodys,8);
		return { mainCmdId : c_main, subCmdId : c_sub, body : obj};
	}
	return { mainCmdId : c_main, subCmdId : c_sub, body : null};
};
by.utils.BinaryUtils.bytes2Obj = function(input,structBodys,pos) {
	if(structBodys == null) return null;
	var len = structBodys.body.length;
	if(len > 0) {
		var obj = { };
		var body = null;
		var type = 0;
		var struceBodyArr = structBodys.body;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			body = struceBodyArr[i];
			type = body.type;
			switch(type) {
			case 1:
				obj[body.name] = input.getUint8(pos);
				pos += 1;
				break;
			case 2:
				obj[body.name] = input.getUint8(pos) > 0;
				pos += 1;
				break;
			case 256:
				obj[body.name] = input.getFloat64(pos);
				pos += 8;
				break;
			case 128:
				obj[body.name] = input.getFloat32(pos,true);
				pos += 4;
				break;
			case 32:case 64:
				obj[body.name] = input.getInt32(pos,true);
				pos += 4;
				break;
			case 16:
				obj[body.name] = input.getUint32(pos,true);
				pos += 4;
				break;
			case 512:
				var low = input.getInt32(pos,true);
				pos += 4;
				var high = input.getInt32(pos,true);
				pos += 4;
				var i64 = new Long(low,high);
				obj[body.name] = i64.toNumber();
				break;
			case 4:
				obj[body.name] = input.getInt16(pos,true);
				pos += 2;
				break;
			case 8:
				obj[body.name] = input.getUint16(pos,true);
				pos += 2;
				break;
			case 1024:
				var _len = body.length;
				obj[body.name] = by.utils.Utf.readUtf16String(input,pos,_len);
				pos += _len;
				break;
			case 2048:
				var _bodys = by.utils.BinaryUtils.getCmd(body.cmd);
				if(!_bodys) obj[body.name] = null; else obj[body.name] = by.utils.BinaryUtils.bytes2Obj(input,_bodys,pos);
				pos += body.length;
				break;
			default:
				var _type = type - (type & 4096);
				if(_type > 0) {
					var _arr = [];
					var _length = body.length;
					var set_arr = body.array;
					var arrSize = set_arr.length;
					var _len1 = body.count;
					var mode = body.mode;
					if (mode == "comLength") {
						switch (_type) {
							case 1:
								var _g1 = 0;
								while (_g1 < _len1) {
									var j = _g1++;
									_arr.push(input.getUint8(pos));
									pos += 1;
								}
								break;
							case 2:
								var _g11 = 0;
								while (_g11 < _len1) {
									var j1 = _g11++;
									_arr.push(input.getUint8(pos) > 0);
									pos += 1;
								}
								break;
							case 256:
								var _g12 = 0;
								while (_g12 < _len1) {
									var j2 = _g12++;
									_arr.push(input.getFloat64(pos, true));
									pos += 8;
								}
								break;
							case 128:
								var _g13 = 0;
								while (_g13 < _len1) {
									var j3 = _g13++;
									_arr.push(input.getFloat32(pos, true));
									pos += 4;
								}
								break;
							case 32:
							case 64:
								var _g14 = 0;
								while (_g14 < _len1) {
									var j4 = _g14++;
									_arr.push(input.getInt32(pos, true));
									pos += 4;
								}
								break;
							case 16:
								var _g15 = 0;
								while (_g15 < _len1) {
									var j5 = _g15++;
									_arr.push(input.getUint32(pos, true));
									pos += 4;
								}
								break;
							case 512:
								var low1;
								var high1;
								var i641;
								var _g16 = 0;
								while (_g16 < _len1) {
									var j6 = _g16++;
									var low2 = input.getInt32(pos, true);
									pos += 4;
									var high2 = input.getInt32(pos, true);
									pos += 4;
									var i642 = new Long(low2, high2);
									_arr.push(i642.toNumber());
								}
								break;
							case 4:
								var _g17 = 0;
								while (_g17 < _len1) {
									var j7 = _g17++;
									_arr.push(input.getInt16(pos, true));
									pos += 2;
								}
								break;
							case 8:
								var _g18 = 0;
								while (_g18 < _len1) {
									var j8 = _g18++;
									_arr.push(input.getUint16(pos, true));
									pos += 2;
								}
								break;
							case 2048:
								var _bodys1 = by.utils.BinaryUtils.getCmd(body.cmd);
								if (_bodys1 == null) obj[body.name] = null; else {
									var _g19 = 0;
									while (_g19 < _len1) {
										var j9 = _g19++;
										_arr.push(by.utils.BinaryUtils.bytes2Obj(input, _bodys1, pos));
										pos = pos + _bodys1.len;
									}
								}
//						pos += _length;
								break;
						}
					}else {
						var retu = by.utils.BinaryUtils.bytes2Objadd(input,pos,_type,_arr,_len1,body);
						_arr = retu.arr;
						pos = retu.pos;
					}
					if(arrSize > 1) {
						var out_arr = _arr;
						var row = set_arr[0];
						var col = set_arr[1];
						if(arrSize > 2) {
							var _g110 = 2;
							while(_g110 < arrSize) {
								var s = _g110++;
								col = col * set_arr[s];
							}
						}
						out_arr = by.utils.BinaryUtils.oneArrayToTwo(out_arr,row,col);
						obj[body.name] = out_arr;
					} else obj[body.name] = _arr;
				} else {
					obj[body.name] = null;
					pos += body.length;
				}
			}
		}
		return obj;
	}
	return null;
};
by.utils.BinaryUtils.oneArrayToTwo = function(_arr,row,col) {
		var out_arr = [];
		var t_arr;
		var inx = 0;
		var _g = 0;
		while(_g < row) {
			var i = _g++;
			t_arr = [];
			var _g1 = 0;
			while(_g1 < col) {
				var j = _g1++;
				t_arr.push(_arr[inx]);
				inx += 1;
			}
			out_arr.push(t_arr);
		}
		return out_arr;
};
	by.utils.BinaryUtils.bytes2Objadd = function(input,pos,_type,_arr,_len1,body){
		var _len1 = input.byteLength;
							switch(_type) {
					case 1:
						var _g1 = 0;
						while(pos < _len1) {
							var j = _g1++;
							_arr.push(input.getUint8(pos));
							pos += 1;
						}
						break;
					case 2:
						var _g11 = 0;
						while(pos < _len1) {
							var j1 = _g11++;
							_arr.push(input.getUint8(pos) > 0);
							pos += 1;
						}
						break;
					case 256:
						var _g12 = 0;
						while(pos < _len1) {
							var j2 = _g12++;
							_arr.push(input.getFloat64(pos,true));
							pos += 8;
						}
						break;
					case 128:
						var _g13 = 0;
						while(pos < _len1) {
							var j3 = _g13++;
							_arr.push(input.getFloat32(pos,true));
							pos += 4;
						}
						break;
					case 32:case 64:
						var _g14 = 0;
						while(pos < _len1) {
							var j4 = _g14++;
							_arr.push(input.getInt32(pos,true));
							pos += 4;
						}
						break;
					case 16:
						var _g15 = 0;
						while(pos < _len1) {
							var j5 = _g15++;
							_arr.push(input.getUint32(pos,true));
							pos += 4;
						}
						break;
					case 512:
						var low1;
						var high1;
						var i641;
						var _g16 = 0;
						while(pos < _len1) {
							var j6 = _g16++;
							var low2 = input.getInt32(pos,true);
							pos += 4;
							var high2 = input.getInt32(pos,true);
							pos += 4;
							var i642 = new Long(low2,high2);
							_arr.push(i642.toNumber());
						}
						break;
					case 4:
						var _g17 = 0;
						while(pos < _len1) {
							var j7 = _g17++;
							_arr.push(input.getInt16(pos,true));
							pos += 2;
						}
						break;
					case 8:
						var _g18 = 0;
						while(pos < _len1) {
							var j8 = _g18++;
							_arr.push(input.getUint16(pos,true));
							pos += 2;
						}
						break;
					case 2048:
						var _bodys1 = by.utils.BinaryUtils.getCmd(body.cmd);
						if(_bodys1 == null) obj[body.name] = null; else {
							var _g19 = 0;
							while(pos < _len1) {
								var j9 = _g19++;
								_arr.push(by.utils.BinaryUtils.bytes2Obj(input,_bodys1,pos));
								pos = pos+_bodys1.len;
							}
						}
//						pos += _length;
						break;
					}
		return {arr : _arr,pos : pos};
	}
by.utils.BinaryUtils.obj2Bytes = function(obj,bytesWrite,structBodys,pos) {
	var len = structBodys.body.length;
	var srcPos = pos;
	if(len > 0) {
		var _tmp_obj = null;
		var dataLen = 0;
		var body = null;
		var type = 0;
		var body_arr = structBodys.body;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			body = body_arr[i];
			dataLen = body.length;
			_tmp_obj = obj[body.name];
			if(_tmp_obj == null || _tmp_obj == undefined) {
				pos += dataLen;
				continue;
			}
			type = body.type;
			switch(type) {
			case 1:case 2:
				bytesWrite.setUint8(pos,_tmp_obj);
				pos += 1;
				break;
			case 256:
				bytesWrite.setFloat64(pos,_tmp_obj,true);
				pos += 8;
				break;
			case 128:
				bytesWrite.setFloat32(pos,_tmp_obj,true);
				pos += 4;
				break;
			case 32:case 64:
				bytesWrite.setInt32(pos,_tmp_obj,true);
				pos += 4;
				break;
			case 16:
				bytesWrite.setUint32(pos,_tmp_obj,true);
				pos += 4;
				break;
			case 512:
				var $long = by.utils.BinaryUtils.Long.fromNumber(_tmp_obj);
				bytesWrite.setInt32(pos,$long.getLowBits(),true);
				bytesWrite.setInt32(pos + 4,$long.getHighBits(),true);
				pos += 8;
				break;
			case 4:
				bytesWrite.setInt16(pos,_tmp_obj,true);
				pos += 2;
				break;
			case 8:
				bytesWrite.setUint16(pos,_tmp_obj,true);
				pos += 2;
				break;
			case 1024:
				var strBuf = by.utils.Utf.str2Buffer(_tmp_obj);
				if(strBuf != null) {
					var strArray = new Uint8Array(strBuf);
					var _g1 = 0;
					while(_g1 < dataLen) {
						var i1 = _g1++;
						if(i1 < strArray.length) bytesWrite.setUint8(pos + i1,strArray[i1]);
					}
				}
				pos += dataLen;
				break;
			case 2048:
				var _bodys = by.utils.BinaryUtils.getCmd(body.cmd);
				if(_bodys != null) by.utils.BinaryUtils.obj2Bytes(_tmp_obj,bytesWrite,_bodys,pos);
				pos += dataLen;
				break;
			default:
				var _type = type - (type & 4096);
				var _count = body.count;
				var _len = body.len;
				var set_arr = body.array;
				var arrSize = set_arr.length;
				var _arr = obj[body.name];
				if(_type > 0 && _arr) {
					var row = set_arr[0];
					var col = 0;
					if(arrSize > 1) {
						col = set_arr[1];
						if(arrSize > 2) {
							var _g11 = 2;
							while(_g11 < arrSize) {
								var s = _g11++;
								col = col * set_arr[s];
							}
						}
					}
					var _arrLen = _arr.length;
					if(arrSize == 1) {
						var _g12 = 0;
						while(_g12 < _count) {
							var j = _g12++;
							if(j < _arrLen) {
								_tmp_obj = _arr[j];
								if(_tmp_obj) switch(_type) {
								case 1:case 2:
									bytesWrite.setUint8(pos,_tmp_obj);
									break;
								case 256:
									bytesWrite.setFloat64(pos,_tmp_obj,true);
									break;
								case 512:
									var long1 = by.utils.BinaryUtils.Long.fromNumber(_tmp_obj);
									bytesWrite.setInt32(pos,long1.getLowBits(),true);
									bytesWrite.setInt32(pos + 4,long1.getHighBits(),true);
									break;
								case 128:
									bytesWrite.setFloat32(pos,_tmp_obj,true);
									break;
								case 32:case 64:
									bytesWrite.setInt32(pos,_tmp_obj,true);
									break;
								case 16:
									bytesWrite.setUint32(pos,_tmp_obj,true);
									break;
								case 4:
									bytesWrite.setInt16(pos,_tmp_obj,true);
									break;
								case 8:
									bytesWrite.setUint16(pos,_tmp_obj,true);
									break;
								case 2048:
									var _bodys1 = by.utils.BinaryUtils.getCmd(body.cmd);
									if(_bodys1 != null) by.utils.BinaryUtils.obj2Bytes(_tmp_obj,bytesWrite,_bodys1,pos);
									break;
								}
							}
							pos += _len;
						}
					} else {
						var colLen = 0;
						var _g13 = 0;
						while(_g13 < row) {
							var _row = _g13++;
							var row_arr = _arr[_row];
							if(!row_arr) {
								pos += _len * col;
								continue;
							}
							colLen = row_arr.length;
							var _g2 = 0;
							while(_g2 < col) {
								var _col = _g2++;
								if(_row < _arrLen && _col < colLen) {
									_tmp_obj = row_arr[_col];
									if(_tmp_obj) switch(_type) {
									case 1:case 2:
										bytesWrite.setUint8(pos,_tmp_obj);
										break;
									case 256:
										bytesWrite.setFloat64(pos,_tmp_obj,true);
										break;
									case 512:
										var long2 = by.utils.BinaryUtils.Long.fromNumber(_tmp_obj);
										bytesWrite.setInt32(pos,long2.getLowBits(),true);
										bytesWrite.setInt32(pos + 4,long2.getHighBits(),true);
										break;
									case 128:
										bytesWrite.setFloat32(pos,_tmp_obj,true);
										break;
									case 32:case 64:
										bytesWrite.setInt32(pos,_tmp_obj,true);
										break;
									case 16:
										bytesWrite.setUint32(pos,_tmp_obj,true);
										break;
									case 4:
										bytesWrite.setInt16(pos,_tmp_obj,true);
										break;
									case 8:
										bytesWrite.setUint16(pos,_tmp_obj,true);
										break;
									case 2048:
										var _bodys2 = by.utils.BinaryUtils.getCmd(body.cmd);
										if(_bodys2 != null) by.utils.BinaryUtils.obj2Bytes(_tmp_obj,bytesWrite,_bodys2,pos);
										break;
									}
								}
								pos += _len;
							}
						}
					}
				} else pos += dataLen;
			}
		}
	}
	return pos - srcPos;
};

by.utils.BinaryUtils.mapBuffer = function(byteArray) {
	var checkCode = 0;
	var len = byteArray.length;
	var $byte;
	var _g = 4;
	while(_g < len) {
		var i = _g++;
		$byte = byteArray[i];
		checkCode = checkCode + $byte & 255;
		byteArray[i] = by.utils.BinaryUtils.sendByteMap[$byte];
	}
	byteArray[0] |= 1;
	byteArray[1] = -checkCode;
};
by.utils.BinaryUtils.unMapBuffer = function(byteArray) {
	var len = byteArray.length;
	if(byteArray[0] & 1) {
		var $byte;
		var _g = 4;
		while(_g < len) {
			var i = _g++;
			$byte = byteArray[i];
			$byte = by.utils.BinaryUtils.recvByteMap[$byte];
			byteArray[i] = $byte;
		}
	}
};
by.utils.BinaryUtils.makeSendPacket = function(mainCmdID,subCmdID,obj,isMap,isCompress,group) {
	if(group == null) group = "login";
	if(isCompress == null) isCompress = true;
	if(isMap == null) isMap = true;
	var structBodys = by.utils.BinaryUtils.getCmd(group + "_" + mainCmdID + "_" + subCmdID);
	var _count = 0;
	if(structBodys != null) _count = structBodys.len;
	_count = _count + 8;
	var buffer = new ArrayBuffer(_count);
	var bytesWrite = new DataView(buffer);
	bytesWrite.setUint8(0,0);
	bytesWrite.setUint8(1,0);
	bytesWrite.setUint16(2,_count,true);
	bytesWrite.setUint16(4,mainCmdID,true);
	bytesWrite.setUint16(6,subCmdID,true);
	if(obj != null && structBodys != null) by.utils.BinaryUtils.obj2Bytes(obj,bytesWrite,structBodys,8);
	var uint8Bytes = new Uint8Array(bytesWrite.buffer);
	if(isMap) by.utils.BinaryUtils.mapBuffer(uint8Bytes);
	if(isCompress) {
		var compress = by.utils.BinaryUtils.CompressBuffer(new Uint8Array(uint8Bytes.buffer, 4));
		if(compress.length < uint8Bytes.length) {
			uint8Bytes[0] |= 4;
			bytesWrite.setUint16(2,compress.length + 4,true);
			var outBytes = new Uint8Array(compress.length + 4);
			outBytes[0] = uint8Bytes[0];
			outBytes[1] = uint8Bytes[1];
			outBytes[2] = bytesWrite.getUint8(2);
			outBytes[3] = bytesWrite.getUint8(3);
			outBytes.set(compress,4);
			return outBytes;
		}
	}
	return uint8Bytes;
};
by.utils.BinaryUtils.CompressBuffer = function(buffer) {
	var deflate = new Zlib.Deflate(buffer);
	return deflate.compress();
};
by.utils.BinaryUtils.UnCompressBuffer = function(byteArray) {
	var len = byteArray.length;
	var _byteArray = byteArray;
	if(byteArray[0] & 4) {
		var inflate = new Zlib.Inflate(byteArray,{index:4,bufferSize:len-4});
		var plain = inflate.decompress();
		_byteArray = new Uint8Array(plain.length + 4);
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			_byteArray[i] = byteArray[i];
		}
		_byteArray.set(plain,4);
	}
	return _byteArray;
};
by.utils.Utf = function() { };
by.utils.Utf.readUtf16String = function(bytes,pos,len) {
	var offset1 = 1;
	var offset2 = 0;
	var str = "";
	len = pos + len;
	if(len > bytes.buffer.byteLength) len = bytes.buffer.byteLength;
	while(pos < len) {
		var byte1 = bytes.getUint8(pos + offset1);
		var byte2 = bytes.getUint8(pos + offset2);
		var word1 = (byte1 << 8) + byte2;
		if (byte1 == 0 && byte2 == 0) {
			break;
		} else if(byte1 < 216 || byte1 >= 224) {
			str += String.fromCharCode(word1);
		}else {
			pos += 2;
			var byte3 = bytes.getUint8(pos + offset1);
			var byte4 = bytes.getUint8(pos + offset2);
			var word2 = (byte3 << 8) + byte4;
			str += String.fromCharCode(word1, word2);
		}
		pos += 2;
	}
	return str;
};
by.utils.Utf.str2Buffer = function(str) {
	if(str == null) return null;
	var strLen = str.length;
	var buf = new ArrayBuffer(strLen*2);
	var bufView = new Uint16Array(buf);
	var _g = 0;
	while(_g < strLen) {
		var i = _g++;
		bufView[i] = str.charCodeAt(i);
	}
	return bufView.buffer;
};
by.utils.BinaryUtils.sendByteMap = new Uint8Array([112,47,64,95,68,142,110,69,126,171,44,31,180,172,157,145,13,54,155,11,212,196,57,116,191,35,22,20,6,235,4,62,18,92,139,188,97,99,246,165,225,101,216,245,90,7,240,19,242,32,107,74,36,89,137,100,215,66,106,94,61,10,119,224,128,39,184,197,140,14,250,138,213,41,86,87,108,83,103,65,232,0,26,206,134,131,176,34,40,77,63,38,70,79,111,43,114,58,241,141,151,149,73,132,229,227,121,143,81,16,168,130,198,221,255,252,228,207,179,9,93,234,156,52,249,23,159,218,135,248,21,5,60,211,164,133,46,251,238,71,59,239,55,127,147,175,105,12,113,49,222,33,117,160,170,186,124,56,2,183,129,1,253,231,29,204,205,189,27,122,42,173,102,190,85,51,3,219,136,178,30,78,185,230,194,247,203,125,201,98,195,166,220,167,80,181,75,148,192,146,76,17,91,120,217,177,237,25,233,161,28,182,50,153,163,118,158,123,109,154,48,214,169,37,199,174,150,53,208,187,210,200,162,8,243,209,115,244,72,45,144,202,226,88,193,24,82,254,223,104,152,84,236,96,67,15]);
by.utils.BinaryUtils.recvByteMap = new Uint8Array([81,161,158,176,30,131,28,45,233,119,61,19,147,16,69,255,109,201,32,47,27,130,26,125,245,207,82,168,210,164,180,11,49,151,87,25,52,223,91,65,88,73,170,95,10,239,136,1,220,149,212,175,123,227,17,142,157,22,97,140,132,60,31,90,2,79,57,254,4,7,92,139,238,102,51,196,200,89,181,93,194,108,246,77,251,174,74,75,243,53,44,202,33,120,59,3,253,36,189,37,55,41,172,78,249,146,58,50,76,218,6,94,0,148,96,236,23,152,215,62,203,106,169,217,156,187,8,143,64,160,111,85,103,135,84,128,178,54,71,34,68,99,5,107,240,15,199,144,197,101,226,100,250,213,219,18,122,14,216,126,153,209,232,214,134,39,191,193,110,222,154,9,13,171,225,145,86,205,179,118,12,195,211,159,66,182,155,229,35,167,173,24,198,244,184,190,21,67,112,224,231,188,241,186,165,166,83,117,228,235,230,133,20,72,221,56,42,204,127,177,192,113,150,248,63,40,242,105,116,104,183,163,80,208,121,29,252,206,138,141,46,98,48,234,237,43,38,185,129,124,70,137,115,162,247,114]);
by.utils.BinaryUtils.structs = { };
by.utils.BinaryUtils.Long = exports.Long;
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
var BinUtils = exports.by.utils.BinaryUtils;