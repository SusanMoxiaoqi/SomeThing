var GraySprite = {
		ccPositionTextureColor_noMVP_vert : "attribute vec4 a_position; \n"
			+ "attribute vec2 a_texCoord; \n"
			+ "attribute vec4 a_color;  \n"
			+ "varying lowp vec4 v_fragmentColor; \n"
			+ "varying mediump vec2 v_texCoord; \n"
			+ "void main() \n"
			+ "{ \n"
			//+ "    gl_Position = CC_MVPMatrix * a_position;  \n"
			+ "    gl_Position = CC_PMatrix * a_position;  \n"
			+ "    v_fragmentColor = a_color; \n"
			+ "    v_texCoord = a_texCoord; \n"
			+ "}",
			pszFragSource :
				"#ifdef GL_ES \n \
				precision mediump float; \n \
				#endif \n \
				uniform sampler2D u_texture; \n \
				varying vec2 v_texCoord; \n \
				varying vec4 v_fragmentColor; \n \
				void main(void) \n \
				{ \n \
				// Convert to greyscale using NTSC weightings \n \
				vec4 col = texture2D(u_texture, v_texCoord); \n \
				float grey = dot(col.rgb, vec3(0.299, 0.587, 0.114)); \n \
				gl_FragColor = vec4(grey, grey, grey, col.a); \n \
				}",

				setGray : function(sp)
				{
					do
					{
						var pProgram = new cc.GLProgram();
						pProgram.initWithString(GraySprite.ccPositionTextureColor_noMVP_vert, GraySprite.pszFragSource);
						sp.setShaderProgram(pProgram);
//						// CHECK_GL_ERROR_DEBUG();

						pProgram.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
						pProgram.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
						pProgram.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
//						//CHECK_GL_ERROR_DEBUG();

						pProgram.link();
//						//CHECK_GL_ERROR_DEBUG();

						pProgram.updateUniforms();
//						//CHECK_GL_ERROR_DEBUG();
					} while (0);
				},
				removeGray : function(sp)
				{
					do
					{
						var pProgram = cc.shaderCache.getProgram("ShaderPositionTextureColor");
						sp.setShaderProgram(pProgram);
						pProgram.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
						pProgram.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
						pProgram.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);

						pProgram.link();

						pProgram.updateUniforms();
					} while (0);
				}
}
