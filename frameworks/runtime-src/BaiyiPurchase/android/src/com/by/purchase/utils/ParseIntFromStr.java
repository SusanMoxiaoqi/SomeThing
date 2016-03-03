package com.by.purchase.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ParseIntFromStr {
	
	public static int parseIntFromStr(String str){
		 
		String regex = "\\d*";
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(str);
        while(m.find()) {
            if(!"".equals(m.group()))
                System.out.println(m.group());
            return Integer.parseInt(m.group());
        }
        
       return 0;
        
	}
	
	public static float parseFloatFromStr(String str){
		 
		String regex = "\\d*";
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(str);
        while(m.find()) {
            if(!"".equals(m.group()))
                System.out.println(m.group());
            
            return Float.parseFloat(m.group()); 
        }
        
       return 0;
        
	}

}
