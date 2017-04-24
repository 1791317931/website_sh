package com.cn.ref;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.font.FontRenderContext;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

import org.springframework.web.multipart.MultipartFile;

import com.cn.ref.Scalr.Method;
import com.cn.ref.Scalr.Mode;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGEncodeParam;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

/**
 * 图片压缩工具类 提供的方法中可以设定生成的 缩略图片的大小尺寸、压缩尺寸的比例、图片的质量等
 * 
 * <pre>
 * 	调用示例：
 * resiz(srcImg, tarDir + "car_1_maxLength_11-220px-hui.jpg", 220, 0.7F);
 * </pre>
 */
public class ImageUtils {
	
	static Font FONT = new Font("微软雅黑", Font.BOLD, 18);  
    static final Color COLOR = Color.WHITE;  
    static final Color FONT_COLOR = new Color(255, 255, 255, 150);  
    static final Color FONT_SHADOW_COLOR = new Color(170, 170, 170, 77);
    
    public static final String JPG = "jpg";
    public static final String BMP = "bmp";
    

	/**
	 * * 图片文件读取
	 * 
	 * @param srcImgPath
	 * @return
	 */
	private static BufferedImage InputImage(String srcImgPath)
			throws RuntimeException {

		BufferedImage srcImage = null;
		FileInputStream in = null;
		try {
			// 构造BufferedImage对象
			File file = new File(srcImgPath);
			in = new FileInputStream(file);
			byte[] b = new byte[5];
			in.read(b);
			srcImage = javax.imageio.ImageIO.read(file);
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("读取图片文件出错！", e);
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					throw new RuntimeException("读取图片文件出错！", e);
				}
			}
		}
		return srcImage;
	}

	/**
	 * * 将图片按照指定的图片尺寸、源图片质量压缩(默认质量为1)
	 * 
	 * @param srcImgPath
	 *            :源图片路径
	 * @param outImgPath
	 *            :输出的压缩图片的路径
	 * @param new_w
	 *            :压缩后的图片宽
	 * @param new_h
	 *            :压缩后的图片高
	 * @throws IOException 
	 */
	public static void resize(String srcImgPath, String outImgPath, int maxWidth, int maxHeight) throws IOException {
		// resize(srcImgPath, outImgPath, maxWidth, maxHeight, 1F);
		FileInputStream in = new FileInputStream(new File(srcImgPath)); 
        FileOutputStream out = new FileOutputStream(new File(outImgPath));
		
		if(isPng(srcImgPath)){
			resizePng(in, out, maxWidth, maxHeight, 1F, null, null, null);
		}else{
			resizeJpg(in, out, maxWidth, maxHeight, 1F, null, null, null);
		}		
	}

	/**
	 * 图片剪切工具方法
	 * 
	 * @param srcfile
	 *            源图片
	 * @param outfile
	 *            剪切之后的图片
	 * @param x
	 *            剪切顶点 X 坐标
	 * @param y
	 *            剪切顶点 Y 坐标
	 * @param width
	 *            剪切区域宽度
	 * @param height
	 *            剪切区域高度
	 * 
	 * @throws IOException
	 */
	public static void cut(File srcfile, File outfile, int x, int y, int width,
			int height) throws IOException {
		FileInputStream is = null;
		ImageInputStream iis = null;
		try {
			// 读取图片文件
			is = new FileInputStream(srcfile);
			
			String extName = srcfile.getName();
			extName = extName.substring(extName.lastIndexOf(".")+1);
			/*
			 * 返回包含所有当前已注册 ImageReader 的 Iterator，这些 ImageReader 声称能够解码指定格式。
			 * 参数：formatName - 包含非正式格式名称 .（例如 "jpeg" 或 "tiff"）等 。
			 */
			Iterator<ImageReader> it = ImageIO.getImageReadersByFormatName(extName);
			ImageReader reader = it.next();
			// 获取图片流
			iis = ImageIO.createImageInputStream(is);

			/*
			 * <p>iis:读取源.true:只向前搜索 </p>.将它标记为 ‘只向前搜索’。
			 * 此设置意味着包含在输入源中的图像将只按顺序读取，可能允许 reader 避免缓存包含与以前已经读取的图像关联的数据的那些输入部分。
			 */
			reader.setInput(iis, true);

			/*
			 * <p>描述如何对流进行解码的类<p>.用于指定如何在输入时从 Java Image I/O
			 * 框架的上下文中的流转换一幅图像或一组图像。用于特定图像格式的插件 将从其 ImageReader 实现的
			 * getDefaultReadParam 方法中返回 ImageReadParam 的实例。
			 */
			ImageReadParam param = reader.getDefaultReadParam();

			/*
			 * 图片裁剪区域。Rectangle 指定了坐标空间中的一个区域，通过 Rectangle 对象
			 * 的左上顶点的坐标（x，y）、宽度和高度可以定义这个区域。
			 */
			Rectangle rect = new Rectangle(x, y, width, height);

			// 提供一个 BufferedImage，将其用作解码像素数据的目标。
			param.setSourceRegion(rect);

			/*
			 * 使用所提供的 ImageReadParam 读取通过索引 imageIndex 指定的对象，并将 它作为一个完整的
			 * BufferedImage 返回。
			 */
			BufferedImage bi = reader.read(0, param);

			// 保存新图片
			ImageIO.write(bi, extName, outfile);
		} finally {
			if (is != null) {
				is.close();
			}
			if (iis != null) {
				iis.close();
			}
		}
	}
	
	public static int[] getSize(String path, int newWidth, int newHeight){
		
		int [] a = new int[2];
		
		BufferedImage src = InputImage(path);
		int width = src.getWidth();		 
		int height = src.getHeight();

		if (newWidth >= width) {
			if (newHeight < height) {
				width = (int) (width * newHeight / height);
				height = newHeight;
			}
		} else {
			if (newHeight >= height) {
				height = (int) (height * newWidth / width);
				width = newWidth;
			} else {
				if (height > width) {
					width = (int) (width * newHeight / height);
					height = newHeight;
				} else {
					height = (int) (height * newWidth / width);
					width = newWidth;
				}
				
				if(height > newHeight){
					height = newHeight;
				}
			}
		}
		
		a[0] =  width;
		a[1] =  height;
		return a;
	}
	
	 /**  
     * 压缩图片  
     *   
     * @param in  
     * @param out  
     * @param maxWidth  
     * @param maxHeight  
     * @param type  
     *            1: jpg 2: png 4: gif 3: jpg+png 5: jpg+gif 6: png+gif 7:  
     *            jpg+png+gif  
     * @throws IOException  
     */  
    public static void resize(InputStream in, OutputStream out, int maxWidth, int maxHeight, int type, float quality,  
            String[] watermark, Font font, Color fontColor) throws IOException {  
        if (!(type >= 1 && type <= 7)) {  
            throw new IOException("can not support type: " + type + ", type must be in [1-7] ");  
        }  
        if (type == 1) {  
            if (!isJpg(in)) {  
                throw new IOException("image format is not jpg ");  
            }  
            resizeJpg(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
            return;  
        } else if (type == 2) {  
            if (!isPng(in)) {  
                throw new IOException("image format is not png ");  
            }  
            resizePng(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
            return;  
        } else if (type == 3) {  
            if (isJpg(in)) {  
                resizeJpg(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
                return;  
            } else if (isPng(in)) {  
                resizePng(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
                return;  
            }  
            throw new IOException("image format is not jpg or png ");  
        } else if (type == 4) {  
            if (!isGif(in)) {  
                throw new IOException("image format is not gif ");  
            }  
            resizeGif(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
            return;  
        } else if (type == 5) {  
            if (isJpg(in)) {  
                resizeJpg(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
                return;  
            } else if (isGif(in)) {  
                resizeGif(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
                return;  
            }  
            throw new IOException("image format is not jpg or gif ");  
        } else if (type == 6) {  
            if (isPng(in)) {  
                resizePng(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
                return;  
            } else if (isGif(in)) {  
                resizeGif(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
                return;  
            }  
            throw new IOException("image format is not png or gif ");  
        } else if (type == 7) {  
            if (isJpg(in)) {  
                resizeJpg(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
                return;  
            } else if (isPng(in)) {  
                resizePng(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
                return;  
            } else if (isGif(in)) {  
                resizeGif(in, out, maxWidth, maxHeight, quality, watermark, font, fontColor);  
                return;  
            }  
            throw new IOException("image format is not jpg or png or gif ");  
        }  
  
    }  
  
    public static void resizeJpg(InputStream in, OutputStream out, int maxWidth, int maxHeight, float quality,  
            String[] watermark, Font font, Color fontColor) throws IOException {  
        checkParams(in, out, maxWidth, maxHeight, quality);  
        //  
        BufferedImage image = ImageIO.read(in);  
        image = Scalr.resize(image, Method.AUTOMATIC, Mode.AUTOMATIC, maxWidth, maxHeight);  
        // create new image with right size/format  
        BufferedImage bufferedImage = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_RGB);  
        Graphics2D g = bufferedImage.createGraphics();  
        // 因为有的图片背景是透明色，所以用白色填充 FIXED  
        g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, 1));  
        g.fillRect(0, 0, image.getWidth(), image.getHeight());  
        g.drawImage(image, 0, 0, null);  
        image = bufferedImage;  
        //  
        if (watermark != null && watermark.length > 0) {  
            makeWatermark(watermark, image, font, fontColor);  
        }  
        //  
        JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);  
        JPEGEncodeParam param = encoder.getDefaultJPEGEncodeParam(image);  
        param.setQuality(quality, false);  
        encoder.setJPEGEncodeParam(param);  
        encoder.encode(image);  
    }  
  
    public static void resizePng(InputStream in, OutputStream out, int maxWidth, int maxHeight, float quality,  
            String[] watermark, Font font, Color fontColor) throws IOException {  
        checkParams(in, out, maxWidth, maxHeight, quality);  
        //  
        BufferedImage image = ImageIO.read(in);  
        image = Scalr.resize(image, Method.AUTOMATIC, Mode.AUTOMATIC, maxWidth, maxHeight);  
        if (watermark != null && watermark.length > 0) {  
            makeWatermark(watermark, image, font, fontColor);  
        }  
        ImageIO.write(image, "png", out);  
    }  
  
    public static void resizeGif(InputStream in, OutputStream out, int maxWidth, int maxHeight, float quality,  
            String[] watermark, Font font, Color fontColor) throws IOException {  
        checkParams(in, out, maxWidth, maxHeight, quality);  
        //  
        GifDecoder gd = new GifDecoder();  
        int status = gd.read(in);  
        if (status != GifDecoder.STATUS_OK) {  
            return;  
        }  
        //  
        AnimatedGifEncoder ge = new AnimatedGifEncoder();  
        ge.start(out);  
        ge.setRepeat(0);  
  
        for (int i = 0; i < gd.getFrameCount(); i++) {  
            BufferedImage frame = gd.getFrame(i);  
            BufferedImage rescaled = Scalr.resize(frame, Method.AUTOMATIC, Mode.AUTOMATIC, maxWidth, maxHeight);  
            if (watermark != null && watermark.length > 0) {  
                makeWatermark(watermark, rescaled, font, fontColor);  
            }  
            //  
            int delay = gd.getDelay(i);  
            ge.setDelay(delay);  
            ge.addFrame(rescaled);  
        }  
  
        ge.finish();  
    }  
  
    private static void makeWatermark(String[] text, BufferedImage image, Font font, Color fontColor) {  
        Graphics2D graphics = image.createGraphics();  
        graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);  
        if (font != null) {  
            graphics.setFont(font);  
        } else {  
            graphics.setFont(FONT);  
        }  
        if (fontColor == null) {  
            fontColor = COLOR;  
        }  
        //  
        graphics.setColor(fontColor);  
        for (int i = 0; i < text.length; i++) {  
            if ("".equals(text[i].trim())) {  
                continue;  
            }  
            FontRenderContext context = graphics.getFontRenderContext();  
            Rectangle2D fontRectangle = font.getStringBounds(text[i], context);  
            int sw = (int) fontRectangle.getWidth();  
            int sh = (int) fontRectangle.getHeight();  
            if (text.length - i == 1) {  
                graphics.drawString(text[i], image.getWidth() - sw - 6, image.getHeight() - 8);  
            } else {  
                graphics.drawString(text[i], image.getWidth() - sw - 6, image.getHeight() - sh * (text.length - 1) - 8);  
            }  
        }  
        graphics.dispose();  
    }  
  
    private static void checkParams(InputStream in, OutputStream out, int maxWidth, int maxHeight, float quality)  
            throws IOException {  
        if (in == null) {  
            throw new IOException("InputStream can not be null ");  
        }  
        if (out == null) {  
            throw new IOException("OutputStream can not be null ");  
        }  
        if (maxWidth < 1 || maxHeight < 1) {  
            throw new IOException("maxWidth or maxHeight can not be less than 1 ");  
        }  
        if (quality < 0f || quality > 1f) {  
            throw new IOException("quality must be in [0-1] ");  
        }  
    }  
	
	public static boolean isJpg(String str) {  
        return isEndWid(str, "jpg");  
    }  
  
    public static boolean isPng(String str) {  
        return isEndWid(str, "png");  
    }  
  
    public static boolean isGif(String str) {  
        return isEndWid(str, "gif");  
    }  
  
    private static boolean isEndWid(String str, String ext) {  
        if (str == null || "".equals(str.trim())) {  
            return false;  
        }  
  
        int position = str.lastIndexOf(".");  
        if (position == -1 || (position == str.length() - 1)) {  
            return false;  
        }  
        String suffix = str.substring(position + 1);  
        if (ext.equalsIgnoreCase(suffix)) {  
            return true;  
        } else {  
            return false;  
        }  
    }  
  
    public static boolean isJpg(InputStream in) throws IOException {  
        InputStream iis = in;  
  
        if (!in.markSupported()) {  
            throw new IllegalArgumentException("Input stream must support mark");  
        }  
  
        iis.mark(30);  
        // If the first two bytes are a JPEG SOI marker, it's probably  
        // a JPEG file. If they aren't, it definitely isn't a JPEG file.  
        try {  
            int byte1 = iis.read();  
            int byte2 = iis.read();  
            if ((byte1 == 0xFF) && (byte2 == 0xD8)) {  
                return true;  
            }  
        } finally {  
            iis.reset();  
        }  
  
        return false;  
    }  
  
    public static boolean isPng(InputStream in) throws IOException {  
        if (!in.markSupported()) {  
            throw new IllegalArgumentException("Input stream must support mark");  
        }  
  
        byte[] b = new byte[8];  
        try {  
            in.mark(30);  
            in.read(b);  
        } finally {  
            in.reset();  
        }  
  
        return (b[0] == (byte) 137 && b[1] == (byte) 80 && b[2] == (byte) 78 && b[3] == (byte) 71 && b[4] == (byte) 13  
                && b[5] == (byte) 10 && b[6] == (byte) 26 && b[7] == (byte) 10);  
    }  
  
    public static boolean isGif(InputStream in) throws IOException {  
        if (!in.markSupported()) {  
            throw new IllegalArgumentException("Input stream must support mark");  
        }  
  
        byte[] b = new byte[6];  
  
        try {  
            in.mark(30);  
            in.read(b);  
        } finally {  
            in.reset();  
        }  
  
        return b[0] == 'G' && b[1] == 'I' && b[2] == 'F' && b[3] == '8' && (b[4] == '7' || b[4] == '9') && b[5] == 'a';  
    }  
    
    
	/**
	 * * 将图片文件输出到指定的路径，并可设定压缩质量
	 * 
	 * @param outImgPath
	 * @param newImg
	 * @param per
	 */
	public static void outJpg(String outImgPath, BufferedImage newImg,	float per) {
		// 判断输出的文件夹路径是否存在，不存在则创建
		File file = new File(outImgPath);
		if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}
		// 输出到文件流
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(outImgPath);
			JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(fos);
			JPEGEncodeParam jep = JPEGCodec.getDefaultJPEGEncodeParam(newImg);
			// 压缩质量
			jep.setQuality(per, true);
			encoder.encode(newImg, jep);
			fos.close();
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 获取文件类型
	public static String getType(MultipartFile file) {
		String fileName = file.getOriginalFilename();
		String[] arr = fileName.split("\\.");
		return arr[arr.length - 1].toLowerCase();
	}
	
	// 获取文件头信息，读取前4个字节--8位
	public static String getHeader(MultipartFile file) {
		byte header[] = new byte[4];
		String imgType = "";
		try {
			int read = file.getInputStream().read(header);
			StringBuilder stringBuilder = new StringBuilder(); 
			
			if(read > 0) {
				if(header == null || header.length <= 0) {      
					return null;
				}      
				for(int i = 0; i < header.length; i++) {      
					int v = header[i] & 0xFF;      
					String hv = Integer.toHexString(v);      
					if(hv.length() < 2) {      
						stringBuilder.append(0);      
					}      
					stringBuilder.append(hv);      
				} 
				// 文件头信息
				imgType = stringBuilder.toString();      
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return imgType.toLowerCase();
	}
		
	/**
	 * 检测图片是否是RGB格式，而不是经过处理后生成的图片
	 * @param url
	 * @return
	 */
	public static boolean isRGB(String url) {
		
		FileInputStream in = null;
		boolean valid = true;
		try {
			// 构造BufferedImage对象
			File file = new File(url);
			in = new FileInputStream(file);
			byte[] b = new byte[5];
			in.read(b);
			javax.imageio.ImageIO.read(file);
		} catch (IOException e) {
			e.printStackTrace();
			valid = false;
		} finally {
			if(in != null) {
				try {
					in.close();
				} catch(IOException e) {
					valid = false;
				}
			}
		}
		
		return valid;
	}
	
	/**
	 * 上传文件
	 * @param file
	 * @param savePath
	 * @param basePath
	 * @param fileName
	 * @param fw
	 * @param fh
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> uploadImage(MultipartFile file, 
			String savePath, String basePath, String fileName, int fw, int fh) throws Exception {
		
		String srcPath = savePath + "src/";
		String type = getType(file);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		File directory = new File(srcPath);
		// 如果目录不存在，创建目录
		if(!directory.exists()) {
			directory.mkdirs();
		}
		
		String filePath = srcPath + fileName + "_src." + type;
		File localFile = new File(filePath);
		//比IO流的方式速度要快些
		file.transferTo(localFile);
		
        result.put("type", type);
        result.put("fullPath", filePath);
        result.put("savePath", savePath);
        result.put("fileName", fileName);
        result.put("base", basePath);
		
		return result;
	}
	
	// 缩放图片
	public static void getImgResizePath(Map<String, Object> fileMap, Integer fw, Integer fh) throws Exception {
		
		String savePath = fileMap.get("savePath") + "";
		String fileName = fileMap.get("fileName") + "";
		String type = fileMap.get("type") + "";
		String resizePath = savePath + "src/";
		String resizeName = fileName + "_resize";
		 
		String srcImgPath = fileMap.get("fullPath") + "";
		String outImgPath = resizePath + resizeName + "." + type;
		
		int[] a = getSize(srcImgPath, fw, fh);
		
		resize(srcImgPath, outImgPath, a[0], a[1]);
		
		fileMap.put("fullPath", outImgPath);
	}
	
	/**
	 * 对图片进行剪切
	 * @param fileMap
	 * @param x 剪切位X轴坐标值
	 * @param y 剪切位Y轴坐标值
	 * @param w 剪切的宽度
	 * @param h 剪切的高度
	 */
	public static void getImgCutPath(Map<String, Object> fileMap,
			int x, int y, int w, int h) throws Exception{
		
		String savePath = fileMap.get("savePath") + "";
		String fileName = fileMap.get("fileName") + "";
		String type = fileMap.get("type") + "";
		String resizeImgPath = fileMap.get("fullPath") + "";
		String cutPath = savePath + "src/";
		String cutName = fileName + "_resize";
		
		File f = new File(resizeImgPath);
		
		String outImgPath = cutPath + cutName + "_cut." + type;
		
		ImageUtils.cut(f, new File(outImgPath), x, y, w, h);
		
		fileMap.put("fullPath", outImgPath);
	}
	
	/**
	 * 复制单个文件
	 * @param oldPathFile	准备复制的文件源
	 * @param newPathFile	拷贝到新绝对路径带文件名
	 * @return
	 */
	public static void copyFile(String oldPathFile, String newPathFile) throws Exception {
		int byteread = 0;
		File oldfile = new File(oldPathFile);
		if (oldfile.exists()) { // 文件存在时
			InputStream inStream = new FileInputStream(oldPathFile); // 读入原文件
			FileOutputStream fs = new FileOutputStream(newPathFile);
			byte[] buffer = new byte[1444];
			while ((byteread = inStream.read(buffer)) != -1) {
				fs.write(buffer, 0, byteread);
			}
			fs.close();
			inStream.close();
		}
	}
	
	/**
	 * 上传文件
	 * @param file
	 * @param savePath
	 * @param basePath
	 * @param fileName
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> uploadFile(MultipartFile file, 
			String savePath, String fileName) throws Exception {
		
		String srcPath = savePath;
		String type = getType(file);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		File directory = new File(srcPath);
		// 如果目录不存在，创建目录
		if(!directory.exists()) {
			directory.mkdirs();
		}
		
		String filePath = srcPath + fileName + "." + type;
		File localFile = new File(filePath);
		//比IO流的方式速度要快些
		file.transferTo(localFile);
		
        result.put("type", type);
        result.put("path", fileName + "." + type);
		
		return result;
	}
	
	/**
	 * 分片上传文件，如果已经是最后一片，需要组装文件，并且删除分片
	 * @param file
	 * @param savePath
	 * @param uniqueFlag
	 * @param fileName
	 * @param totalIndex
	 * @param index
	 * @param type
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> uploadFile(MultipartFile file, 
			String savePath, String uniqueFlag, String fileName, Integer totalIndex,
			Integer index, String type) throws Exception {
		
		String srcPath = savePath;
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		File directory = new File(srcPath);
		// 如果目录不存在，创建目录
		if(!directory.exists()) {
			directory.mkdirs();
		}
		
		// D://image/189839489348_倪大豆视频_1.mp4
		String filePath = srcPath + uniqueFlag + "_" + fileName + "_" + index + "." + type;
		File localFile = new File(filePath);
		//比IO流的方式速度要快些
		file.transferTo(localFile);
		
		result.put("type", type);
		result.put("savePath", savePath);
		
		if(index.intValue() == totalIndex.intValue()) {
			result = mergeFile(savePath, uniqueFlag, fileName, type, totalIndex, result);
		} else {
			result.put("fullPath", filePath);
			result.put("fileName", fileName);
			result.put("success", true);
		}
		
		return result;
	}
	
	public static Map<String, Object> mergeFile(String fullPath, String uniqueFlag, String fileName,
			String type, Integer totalIndex, Map<String, Object> result) throws Exception {
		
		boolean success = true;
		
		File directory = new File(fullPath);
		// 如果目录不存在，创建目录
		if(!directory.exists()) {
			directory.mkdirs();
		}
		
		String path = fullPath + uniqueFlag + "_" + fileName;
		File srcFile = null;
		// 最终合并的文件
		File finalFile = new File(path + "." + type);
		OutputStream os = null;
		BufferedOutputStream bos = null;
		InputStream is = null;
		BufferedInputStream bis = null;
		byte[] bytes = new byte[1024 * 1024];

		try {
			os = new FileOutputStream(finalFile);
			bos = new BufferedOutputStream(os);
			
			for(int index = 1; index <= totalIndex; index++) {
				srcFile = new File(path + "_" + index + "." + type);
				// 如果文件不存在，中断循环，返回false
				if(!srcFile.exists()) {
					success = false;
					break;
				} else {
					// 读文件
					is = new FileInputStream(srcFile);
					bis = new BufferedInputStream(is);
					int length = -1;
					while(-1 != (length = bis.read(bytes))) {
						bos.write(bytes, 0, length);
					}
					bis.close();
					is.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(bos != null) {
					bos.close();
				}
				if(os != null) {
					os.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		
		result.put("success", success);
		result.put("end", true);
		if(success) {
			result.put("fullPath", path + "." + type);
			result.put("fileName", fileName);
		}
		
		return result;
	}
	
}