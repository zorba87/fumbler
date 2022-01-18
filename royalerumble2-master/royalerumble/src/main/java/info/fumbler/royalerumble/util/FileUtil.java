package info.fumbler.royalerumble.util;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class FileUtil {
	
	private static FileUtil instance = new FileUtil();

	private FileUtil() {
	}

	public static FileUtil getInstance() {
		return instance;
	}

	public static void copy(String path, HttpServletResponse response) {
		try(InputStream in = new BufferedInputStream(new FileInputStream(path));
			OutputStream out = new BufferedOutputStream(response.getOutputStream())){
			int data;
			while((data = in.read()) != -1) {
				out.write(data);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
