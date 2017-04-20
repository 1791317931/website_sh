package com.cn.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.codec.binary.Base64;

public class MD5Util {
	public static String EncoderPwdByMd5AndApacheBase64(String password) {
		// 确定计算方法
		MessageDigest md5 = null;
		try {
			md5 = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}

		// 加密后的字符串
		// 说明：MD5加密后的字节数组，再使用base64对其进行编码
		String newstr = "";
		try {
			newstr = Base64.encodeBase64String(md5.digest(password.getBytes("utf-8")));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		return newstr;
	}
}