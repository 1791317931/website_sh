package com.cn.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cn.base.BaseController;
import com.cn.ref.ImageUtils;

@Controller
@RequestMapping(value = "/upload")
public class UploadController extends BaseController {

	private static String IMAGE_PATH = "E:/sharedisk/img/";
	private static String FILE_PATH = "E:/sharedisk/file/";
	private static String NOT_RGB = "请上传未被处理过的原图";
	private static String JPG = "ffd8ffe0/ffd8ffe1";
	private static String JPEG = "ffd8ffe0/ffd8ffe1";
	private static String BMP = "ffd8ffe0/ffd8ffe1";
	private static String PNG = "89504e47";
	private static String GIF = "47494638";
	
	private static Map<String, Object> invalidSuffixMap = new HashMap<String, Object>();
	
	private static Map<String, String> imageMap = new HashMap<String, String>();
	private static Map<String, Map<String, Object>> fieldMaps = new HashMap<String, Map<String, Object>>();
	
	static {
		invalidSuffixMap.put("js", null);
		invalidSuffixMap.put("jsp", null);
		invalidSuffixMap.put("exe", null);
		invalidSuffixMap.put("com", null);
		invalidSuffixMap.put("bat", null);
		invalidSuffixMap.put("sh", null);
		invalidSuffixMap.put("vbs", null);
		invalidSuffixMap.put("cmd", null);
		invalidSuffixMap.put("htm", null);
		invalidSuffixMap.put("log", null);
		invalidSuffixMap.put("reg", null);
		invalidSuffixMap.put("lng", null);
		invalidSuffixMap.put("ini", null);
		invalidSuffixMap.put("bmp", null);
		invalidSuffixMap.put("inf", null);
		invalidSuffixMap.put("rtf", null);
		invalidSuffixMap.put("dll", null);
		
		imageMap.put("jpg", JPG);
		imageMap.put("jpeg", JPEG);
		imageMap.put("bmp", BMP);
		imageMap.put("png", PNG);
		imageMap.put("gif", GIF);
		
		Map<String, Object> imgPathMap = new HashMap<String, Object>();
		imgPathMap.put("msg", "图片路径不能为空");
		fieldMaps.put("imgPath", imgPathMap);
		
		Map<String, Object> savePathMap = new HashMap<String, Object>();
		savePathMap.put("msg", "图片保存路径不能为空");
		fieldMaps.put("savePath", savePathMap);
		
		Map<String, Object> fileNameMap = new HashMap<String, Object>();
		fileNameMap.put("msg", "图片名称不能为空");
		fieldMaps.put("fileName", fileNameMap);
	}
	
	public static String getFullPath(HttpServletRequest request, String filePath) {
		return request.getServletContext().getRealPath("/") + filePath;
	}
	
	// 获取文件类型
	public static String getType(MultipartFile file) {
		String fileName = file.getOriginalFilename();
		String[] arr = fileName.split("\\.");
		return arr[arr.length - 1].toLowerCase();
	}
	
	public static String getType(String fileName) {
		String[] arr = fileName.split("\\.");
		return arr[arr.length - 1].toLowerCase();
	}
	
	public static String getFileName(MultipartFile file) {
		String fileName = file.getOriginalFilename();
		return fileName.substring(0, fileName.lastIndexOf("."));
	}
	
	public static String getFileName(String fileName) {
		return fileName.substring(0, fileName.lastIndexOf("."));
	}
	
	public static String[] getAccepts(String accept) {
		accept = accept.toLowerCase().replace(" ", "").replace("image/", "");
		return accept.split(",");
	}
	
	/**
	 * 校验字段是否为空，遇空返回
	 * @param fields
	 * @return
	 */
	public static Map<String, Object> validateFields(Map<String, Object> fieldMap) {
		
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		
		for(Entry<String, Object> entry : fieldMap.entrySet()) {
			String key = entry.getKey();
			if(StringUtils.isEmpty(key)) {
				success = false;
				Map<String, Object> map = fieldMaps.get(key);
				result.put("msg", map.get("msg"));
				break;
			}
		}
		
		result.put("success", success);
		return result;
	}
	
	// 判断文件后缀是否合法
	public static boolean suffixIsValid(String suffix, String accepts[]) {
		for(String type : accepts) {
			if(type.equals(suffix)) {
				return true;
			}
		}
		return false;
	}
	
	// --------------------------------------------image-----------------------------------------------------------
	public static Map<String, Object> fileTypeIsValid(MultipartFile file,
			@RequestParam(defaultValue = "image/jpg,image/jpeg,image/png", required = false) String accept) {
		
		Map<String, Object> result = new HashMap<String, Object>();
		String errorMsg;
		
		// --------------------首先判断accept是否带*，某些pc上chrome会出现弹出框延迟几秒的现象 begin-------------
		if(accept.indexOf("*") != -1) {
			// 这是给程序猿看的，写专业点
			errorMsg = "accept参数不能包含*，chrome和safari会出现上传延迟";
			result.put("success", false);
			result.put("msg", errorMsg);
			return result;
		}
		// --------------------首先判断accept是否带*，某些pc上chrome会出现弹出框延迟几秒的现象 end-------------
		
		accept = accept.replace(" ", "");
		// [jpg, jpeg, png]
		String accepts[] = getAccepts(accept);
		// jpg、png、jpeg
		String imgType = ImageUtils.getType(file);
		errorMsg = "文件格式只能是[" + accept.replace("image/", "") + "]";
		
		// ---------------------------判断文件后缀 begin------------------------------------
		if(!suffixIsValid(imgType, accepts)) {
			result.put("success", false);
			result.put("msg", errorMsg);
			return result;
		}
		// ---------------------------判断文件后缀 end------------------------------------
		
		// ---------------------------判断文件头 begin-----------------------------------
		/**
		 * 校验伪装的图片
		 * 比如a.txt-->a.jpg、a.png、a.jpeg，通过文件头前8位来对比
		 * 但是a.jpg修改为a.jpeg这种是可以通过的
		 */
		String head = ImageUtils.getHeader(file);
		boolean valid = false;
		
		for(String headInfo : accepts) {
			String validHead = imageMap.get(headInfo);
			if(validHead.indexOf(head) != -1) {
				valid = true;
				break;
			}
		}
		
		if(!valid) {
			result.put("success", false);
			result.put("msg", NOT_RGB);
			return result;
		}
		// ---------------------------判断文件头 end-----------------------------------
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value = "/check", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> checkImageType(MultipartFile file, 
			@RequestParam(required = false, defaultValue = "image/jpg,image/png,image/jpeg") String accept) {
		
		return fileTypeIsValid(file, accept);
	}
	
	/**
	 * 上传文件，可能会裁剪压缩
	 * @param file
	 * @param resize		是否缩放	默认true,此时不能上传bmp图片或者被P过的图片
	 * @param cut			是否裁剪	默认true,此时不能上传bmp图片或者被P过的图片
	 * @param accept		input框可接受文件类型
	 * @param fw			图片缩放后宽度
	 * @param fh			图片缩放后高度
	 * @param x				裁剪起始x
	 * @param y				裁剪起始y
	 * @param w				裁剪宽度
	 * @param h				裁剪高度
	 * @return
	 */
	@RequestMapping(value = "/save_cut", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> upload(HttpServletRequest request, MultipartFile file,
			@RequestParam(required = true, defaultValue = "true") boolean resize,
			@RequestParam(required = true, defaultValue = "true") boolean cut,
			@RequestParam(required = false, defaultValue = "image/jpg,image/png,image/jpeg") String accept,
			int fw, int fh, int x, int y, int w, int h) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		// 保存路径
		String savePath = IMAGE_PATH;
		// 文件名
		String fileName = UUID.randomUUID() + "";
		
		Map<String, Object> map = new HashMap<String, Object>();
		String msg = "";
		
		// ----------------------校验字段-----------------------------
		Map<String, Object> fieldMap = new HashMap<String, Object>();
		fieldMap.put("savePath", savePath);
		fieldMap.put("fileName", fileName);
		Map<String, Object> resultMap = validateFields(fieldMap);
		boolean success = (boolean) resultMap.get("success");
		// ----------------------校验字段-----------------------------
		
		if(!success) {
			map.put("success", success);
			msg = (String) resultMap.get("msg");
			map.put("msg", msg);
			return map;
		}
		
		result = fileTypeIsValid(file, accept);
		boolean valid = (boolean) result.get("success");
		
		// 校验文件类型是否合法
		if (valid) {
			// 1、首先上传图片
			Map<String, Object> fileMap = ImageUtils.uploadImage(file, savePath, IMAGE_PATH, fileName, fw, fh);
			
			// 2、校验已经上传图片是否合法：P过的图片保存为jpg格式时，默认的模式是CMYK模式（注意，这是给印刷机用的）。在图像-->模式中改为RGB模式才是显示器用的
			boolean isRGB = ImageUtils.isRGB((String) fileMap.get("fullPath"));
			
			if(!isRGB) {
				map.put("success", false);
				map.put("msg", NOT_RGB);
			} else {
				// 3、缩放
				if(resize) {
					ImageUtils.getImgResizePath(fileMap, fw, fh);
				}
				
				// 4、裁剪
				if(cut) {
					ImageUtils.getImgCutPath(fileMap, x, y, w, h);
				}
				
				String finalPath = savePath + fileName + "." + fileMap.get("type");
				ImageUtils.copyFile(fileMap.get("fullPath") + "", finalPath);
				// delFolder(system_physical_path + savePath + fileName);
				
				map.put("success", success);
				map.put("imgPath", fileName + "." + fileMap.get("type"));
			}
		} else {
			map.put("success", false);
			map.put("msg", result.get("msg"));
		}
		
		return map;
	}
	
	/**
	 * 从服务器获取图片并处理
	 * @param imgPath		图片在服务器的物理路径
	 * @param resizable		是否裁剪
 	 * @param cutable		是否裁剪
	 * @param accept		input框可接受文件类型
	 * @param fw			文件最终宽度
	 * @param fh			文件最终高度
	 * @param x				文件截取x
	 * @param y				文件截取y
	 * @param w				文件截取宽度
	 * @param h				文件截取高度
	 * @return
	 */
	@RequestMapping(value = "/save_cut_from_server", method = RequestMethod.POST)	
	@ResponseBody
	public Map<String, Object> cutAndSaveFromServer(HttpServletRequest request, String imgPath,
			int fw, int fh, int x, int y, int w, int h,
			@RequestParam(required = true, defaultValue = "true") boolean resizable,
			@RequestParam(required = true, defaultValue = "true") boolean cutable,
			@RequestParam(defaultValue = "image/jpg,image/jpeg,image/png", required = false) String accept) throws Exception {
		
		String basePath = IMAGE_PATH;
		String realPath = request.getServletContext().getRealPath("/");
		// 保存路径
		String savePath = realPath + basePath;
		// 文件名
		String fileName = UUID.randomUUID() + "";
		
		Map<String, Object> map = new HashMap<String, Object>();
		String msg = "";
		String imgUrl = realPath + imgPath;
		
		// ----------------------校验字段-----------------------------
		Map<String, Object> fieldMap = new HashMap<String, Object>();
		fieldMap.put("imgPath", imgPath);
		fieldMap.put("savePath", savePath);
		fieldMap.put("fileName", fileName);
		Map<String, Object> resultMap = validateFields(fieldMap);
		boolean success = (boolean) resultMap.get("success");
		if(!success) {
			msg = (String) resultMap.get("msg");
		}
		// ----------------------校验字段-----------------------------
		
		// 判断图片是否存在，比如数据迁移时可能数据存在，但图片不存在
		try {
			if(!new File(imgUrl).exists()) {
				success = false;
				msg = "服务器不存在该图片";
			}
		} catch (Exception e) {
			success = false;
			msg = "服务器不存在该图片";
		}
		
		if(!success) {
			map.put("success", success);
			map.put("msg", msg);
			return map;
		}
		
		try {
			File directory = new File(savePath);
			// 如果没有文件目录，创建目录
			if(!directory.exists()) {
				directory.mkdirs();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Map<String, Object> fileMap = new HashMap<String, Object>();
		fileMap.put("savePath", savePath);
		fileMap.put("fileName", fileName);
		fileMap.put("fullPath", realPath + imgPath);
		fileMap.put("type", getType(imgPath));
		
		// 缩放
		if(resizable) {
			ImageUtils.getImgResizePath(fileMap, fw, fh);
		}
		
		// 裁剪
		if(cutable) {
			ImageUtils.getImgCutPath(fileMap, x, y, w, h);
		}
		
		String finalPath = savePath + fileName + "." + fileMap.get("type");
		ImageUtils.copyFile(fileMap.get("fullPath") + "", finalPath);
		// delFolder(system_physical_path + savePath + fileName);
		
		map.put("success", success);
		map.put("imgPath", fileName + "." + fileMap.get("type"));
		
		return map;
	}
	// --------------------------------------------image-----------------------------------------------------------
	
	// --------------------------------------------file------------------------------------------------------------
	/**
	 * 校验附件是否合法
	 * @return
	 */
	public Map<String, Object> checkAttachmentType(MultipartFile file) {
		return attachmentIsValid(file);
	}
	
	/**
	 * 防止可执行文件上传，只需要判断后缀即可
	 * @param file
	 * @return
	 */
	public static Map<String, Object> attachmentIsValid(MultipartFile file) {
		
		String type = getType(file);
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		
		if(invalidSuffixMap.containsKey(type)) {
			result.put("msg", "文件类型不能是[ " + type + " ]格式");
			success = false;
		}
		
		result.put("success", success);
		return result;
	}
	
	/**
	 * 上传纯粹的文件
	 * @return
	 */
	@RequestMapping(value="/attachment/upload", method = RequestMethod.POST)	
	@ResponseBody
	public Map<String, Object> uploadFile(MultipartFile file, HttpServletRequest request) {

		// --------------------------校验字段--------------------------
		Map<String, Object> fieldMap = new HashMap<String, Object>();
		String savePath = FILE_PATH;
		fieldMap.put("savePath", savePath);
		Map<String, Object> resultMap = validateFields(fieldMap);
		
		boolean success = (boolean) resultMap.get("success");
		if(!success) {
			return resultMap;
		}
		// --------------------------校验字段--------------------------
		
		// --------------------------校验文件格式，不能是可执行文件-----------------------
		resultMap = attachmentIsValid(file);
		if(!success) {
			return resultMap;
		}
		// --------------------------校验文件格式，不能是可执行文件-----------------------
		
		String fullPath = getFullPath(request, savePath);
		// _xxx   保存真实文件名称，为了后续回显
		String fileName = UUID.randomUUID() + "_" + getFileName(file);
		
		// 上传文件
		try {
			resultMap = ImageUtils.uploadFile(file, fullPath, fileName);
			resultMap.put("success", true);
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("success", false);
			resultMap.put("msg", "服务器异常");
		}
		
		return resultMap;
	}
	
	/**
	 * 上传纯粹的文件，分割文件上传
	 * @param fileName	因为是分割文件上传，formData上传的Blob没有真实的文件名，所以需要单独上传文件名
	 * @param index			当前上传的文件序号，方便组装文件
	 * @param totalIndex	文件分割片数
	 * @param uniqueFlag	唯一标识符
	 * @return
	 */
	@RequestMapping(value="/attachment/upload/split", method = RequestMethod.POST)	
	@ResponseBody
	public Map<String, Object> uploadFileSplit(MultipartFile file, HttpServletRequest request,
			@RequestParam(defaultValue = "upload/") String savePath,
			String fileName, Integer index, Integer totalIndex, String uniqueFlag) {

		// --------------------------校验字段--------------------------
		Map<String, Object> fieldMap = new HashMap<String, Object>();
		fieldMap.put("savePath", savePath);
		Map<String, Object> resultMap = validateFields(fieldMap);
		
		boolean success = (boolean) resultMap.get("success");
		if(!success) {
			return resultMap;
		}
		// --------------------------校验字段--------------------------
		
		// --------------------------校验文件格式，不能是可执行文件-----------------------
		resultMap = attachmentIsValid(file);
		if(!success) {
			return resultMap;
		}
		// --------------------------校验文件格式，不能是可执行文件-----------------------
		
		String fullPath = getFullPath(request, savePath);
		String type = getType(fileName);
		// {uniqueFlag}_{真实文件名}_{index}   保存真实文件名称，为了后续回显
		fileName = getFileName(fileName);
		
		// 上传文件
		try {
			resultMap = ImageUtils.uploadFile(file, fullPath, uniqueFlag, fileName, totalIndex, index, type);
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("success", false);
			resultMap.put("msg", "服务器异常");
		}
		
		return resultMap;
	}
	
	@RequestMapping(value="/attachment/exist", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> fileIsExists(HttpServletRequest request, String filePath) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		
		try {
			File file = new File(getFullPath(request, filePath));
			
			// 校验文件是否存在
			if(!file.exists()) {
				success = false;
				msg = "抱歉，文件不存在";
			}
		} catch (Exception e) {
			success = false;
			msg = "服务器异常";
		}
		
		resultMap.put("success", success);
		
		if(!success) {
			resultMap.put("msg", msg);
		}
		
		return resultMap;
	}
	
	/**
	 * 下载文件，这里不用校验，理论上下载图片之前都会校验图片是否存在
	 * @param response
	 * @param filePath
	 * @param getRealName
	 */
	@RequestMapping(value="/attachment/download")
	public void downloadFile(HttpServletResponse response, HttpServletRequest request, String filePath,
			@RequestParam(defaultValue = "false") boolean getRealName) {
		
		try {
			filePath = URLDecoder.decode(filePath, "utf-8");
			File file = new File(getFullPath(request, filePath));
			writeStream(response, request, file, getRealName);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// 写文件流
	public static void writeStream(HttpServletResponse response, HttpServletRequest request,
			File file, boolean getRealName) throws Exception {
		
		String fullPath = file.getPath();
		String fileName = file.getName();
		
		// 是否返回文件真实名称		如uuid_倪大豆头像.jpg，返回倪大豆头像.jpg
		if(getRealName) {
			fileName = fileName.substring(fileName.indexOf("_") + 1);
		}
		
		InputStream is = new BufferedInputStream(new FileInputStream(fullPath));
		byte[] buffer = new byte[is.available()];
		is.read(buffer);
		is.close();
		response.reset();
		
		String header = request.getHeader("User-Agent").toUpperCase();
		if(isIE(header)) {
			//IE下载文件名空格变+号问题
			fileName = URLEncoder.encode(fileName, "utf-8").replace("+", "%20");
		} else {
			fileName = new String(fileName.replaceAll(" ", "").getBytes("utf-8"), "iso8859-1");
		}
		
		// 先去掉文件名中的空格，转换为utf-8，保证不出现乱码
		response.addHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");
		response.addHeader("Content-Length", "" + file.length());
		OutputStream os = new BufferedOutputStream(response.getOutputStream());
	    response.setContentType("application/octet-stream");
	    
	    os.write(buffer);// 输出文件
	    os.flush();
	    os.close();
	}
	
	public static boolean isIE(String header) {
		return header.contains("MSIE") || header.contains("TRIDENT") || header.contains("EDGE");
	}
	// --------------------------------------------file------------------------------------------------------------
	
}