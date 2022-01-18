package info.fumbler.royalerumble.util;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

public class ImageUtil {
    public static byte[] makeThumb(byte [] data) throws Exception {
        return makeThumb(data, 200, 200);
    }

    public static byte[] makeThumb(byte [] data, int width, int height) throws Exception {
        try(ByteArrayInputStream in = new ByteArrayInputStream(data);
            ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Thumbnails.of(in)
                    .size(width, height)
                    .crop(Positions.CENTER)
                    .toOutputStream(out);
            return out.toByteArray();
        }
    }
}
